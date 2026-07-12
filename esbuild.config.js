const esbuild = require('esbuild');

const isBuild = process.argv.includes('--build');

const options = {
  entryPoints: ['src/main.ts'],
  bundle: true,
  outfile: 'public/index.bundle.js',
  platform: 'browser',
  target: ['es2018'],
  sourcemap: !isBuild,
  minify: isBuild,
  logLevel: 'info',
};

async function main() {
  if (isBuild) {
    await esbuild.build(options);
    return;
  }

  const ctx = await esbuild.context(options);
  await ctx.watch();
  const server = await ctx.serve({
    servedir: 'public',
    port: 8080,
  });
  const host = server.host === '0.0.0.0' ? 'localhost' : server.host;
  const url = `http://${host}:${server.port}`;

  console.log(`\n  Dev server ready at ${url}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
