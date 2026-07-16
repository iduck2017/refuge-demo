param(
    [Parameter(Mandatory = $true)]
    [string] $InputPath,

    [string] $OutputPath,

    [ValidateRange(1, 255)]
    [int] $Tolerance = 96
)

$ErrorActionPreference = 'Stop'

$source = (Resolve-Path -LiteralPath $InputPath).Path

if ([string]::IsNullOrWhiteSpace($OutputPath)) {
    $directory = [System.IO.Path]::GetDirectoryName($source)
    $name = [System.IO.Path]::GetFileNameWithoutExtension($source)
    $OutputPath = [System.IO.Path]::Combine($directory, "$name.transparent.png")
}

$target = [System.IO.Path]::GetFullPath($OutputPath)

if ($source -eq $target) {
    throw 'InputPath and OutputPath must be different.'
}

Add-Type -AssemblyName System.Drawing

if (-not ([System.Management.Automation.PSTypeName]'OuterBackgroundRemover').Type) {
    Add-Type -ReferencedAssemblies 'System.Drawing' -TypeDefinition @'
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Runtime.InteropServices;

public static class OuterBackgroundRemover
{
    public static void Process(string source, string target, int tolerance)
    {
        using (Image image = Image.FromFile(source))
        using (Bitmap bitmap = new Bitmap(image.Width, image.Height, PixelFormat.Format32bppArgb))
        {
            using (Graphics graphics = Graphics.FromImage(bitmap))
            {
                graphics.DrawImageUnscaled(image, 0, 0);
            }

            Remove(bitmap, tolerance);
            using (Bitmap output = Crop(bitmap))
            {
                string directory = Path.GetDirectoryName(target);
                if (!string.IsNullOrEmpty(directory)) Directory.CreateDirectory(directory);

                string temporary = target + ".tmp";
                output.Save(temporary, ImageFormat.Png);
                if (File.Exists(target)) File.Delete(target);
                File.Move(temporary, target);
            }
        }
    }

    private static void Remove(Bitmap bitmap, int tolerance)
    {
        int width = bitmap.Width;
        int height = bitmap.Height;
        Rectangle bounds = new Rectangle(0, 0, width, height);
        BitmapData data = bitmap.LockBits(bounds, ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);

        try
        {
            int stride = data.Stride;
            int length = Math.Abs(stride) * height;
            byte[] pixels = new byte[length];
            Marshal.Copy(data.Scan0, pixels, 0, length);

            Color background = AverageCorners(pixels, width, height, stride);
            int limit = tolerance * tolerance;
            bool[] visited = new bool[width * height];
            int[] queue = new int[width * height];
            int head = 0;
            int tail = 0;

            for (int x = 0; x < width; x++)
            {
                Enqueue(x, 0, width, height, stride, pixels, background, limit, visited, queue, ref tail);
                Enqueue(x, height - 1, width, height, stride, pixels, background, limit, visited, queue, ref tail);
            }

            for (int y = 1; y < height - 1; y++)
            {
                Enqueue(0, y, width, height, stride, pixels, background, limit, visited, queue, ref tail);
                Enqueue(width - 1, y, width, height, stride, pixels, background, limit, visited, queue, ref tail);
            }

            while (head < tail)
            {
                int index = queue[head++];
                int x = index % width;
                int y = index / width;
                int offset = y * stride + x * 4;
                int distance = Distance(pixels, offset, background);
                double coverage = Math.Min(1, Math.Sqrt(distance) / tolerance);
                int alpha = (int)Math.Round(coverage * 255);

                pixels[offset] = Unmatte(pixels[offset], background.B, coverage);
                pixels[offset + 1] = Unmatte(pixels[offset + 1], background.G, coverage);
                pixels[offset + 2] = Unmatte(pixels[offset + 2], background.R, coverage);
                pixels[offset + 3] = (byte)(pixels[offset + 3] * alpha / 255);

                Enqueue(x - 1, y, width, height, stride, pixels, background, limit, visited, queue, ref tail);
                Enqueue(x + 1, y, width, height, stride, pixels, background, limit, visited, queue, ref tail);
                Enqueue(x, y - 1, width, height, stride, pixels, background, limit, visited, queue, ref tail);
                Enqueue(x, y + 1, width, height, stride, pixels, background, limit, visited, queue, ref tail);
            }

            Marshal.Copy(pixels, 0, data.Scan0, length);
        }
        finally
        {
            bitmap.UnlockBits(data);
        }
    }

    private static byte Unmatte(byte value, byte background, double coverage)
    {
        if (coverage < 0.01) return 0;

        double foreground = (value - (1 - coverage) * background) / coverage;
        return (byte)Math.Max(0, Math.Min(255, Math.Round(foreground)));
    }

    private static Bitmap Crop(Bitmap bitmap)
    {
        Rectangle content = FindContentBounds(bitmap);
        Bitmap output = new Bitmap(content.Width, content.Height, PixelFormat.Format32bppArgb);

        using (Graphics graphics = Graphics.FromImage(output))
        {
            Rectangle target = new Rectangle(0, 0, content.Width, content.Height);
            graphics.DrawImage(bitmap, target, content, GraphicsUnit.Pixel);
        }

        return output;
    }

    private static Rectangle FindContentBounds(Bitmap bitmap)
    {
        int width = bitmap.Width;
        int height = bitmap.Height;
        Rectangle bounds = new Rectangle(0, 0, width, height);
        BitmapData data = bitmap.LockBits(bounds, ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);

        try
        {
            int stride = data.Stride;
            int length = Math.Abs(stride) * height;
            byte[] pixels = new byte[length];
            Marshal.Copy(data.Scan0, pixels, 0, length);
            int left = width;
            int top = height;
            int right = -1;
            int bottom = -1;

            for (int y = 0; y < height; y++)
            {
                int row = y * stride;
                for (int x = 0; x < width; x++)
                {
                    int alpha = pixels[row + x * 4 + 3];
                    if (alpha == 0) continue;

                    if (x < left) left = x;
                    if (x > right) right = x;
                    if (y < top) top = y;
                    if (y > bottom) bottom = y;
                }
            }

            if (right < left || bottom < top) return new Rectangle(0, 0, 1, 1);
            return Rectangle.FromLTRB(left, top, right + 1, bottom + 1);
        }
        finally
        {
            bitmap.UnlockBits(data);
        }
    }

    private static void Enqueue(
        int x,
        int y,
        int width,
        int height,
        int stride,
        byte[] pixels,
        Color background,
        int limit,
        bool[] visited,
        int[] queue,
        ref int tail)
    {
        if (x < 0 || x >= width || y < 0 || y >= height) return;

        int index = y * width + x;
        if (visited[index]) return;

        int offset = y * stride + x * 4;
        if (Distance(pixels, offset, background) > limit) return;

        visited[index] = true;
        queue[tail++] = index;
    }

    private static Color AverageCorners(byte[] pixels, int width, int height, int stride)
    {
        int[] offsets =
        {
            0,
            (width - 1) * 4,
            (height - 1) * stride,
            (height - 1) * stride + (width - 1) * 4
        };
        int red = 0;
        int green = 0;
        int blue = 0;

        foreach (int offset in offsets)
        {
            blue += pixels[offset];
            green += pixels[offset + 1];
            red += pixels[offset + 2];
        }

        return Color.FromArgb(red / 4, green / 4, blue / 4);
    }

    private static int Distance(byte[] pixels, int offset, Color background)
    {
        int blue = pixels[offset] - background.B;
        int green = pixels[offset + 1] - background.G;
        int red = pixels[offset + 2] - background.R;
        return red * red + green * green + blue * blue;
    }
}
'@
}

[OuterBackgroundRemover]::Process($source, $target, $Tolerance)
Write-Output "Created $target"
