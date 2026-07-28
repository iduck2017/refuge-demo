import Phaser from 'phaser';
import { useView } from 'set-piece';
import { INK_COLOR, INK_WIDTH, View } from './index';
import type { ViewProps } from './index';

export type WorkbenchViewProps = ViewProps & {
  height: number;
  width: number;
  x: number;
  y: number;
};

/**
 * Displays the bordered workbench panel.
 */
@useView()
export class WorkbenchView extends View {
  private readonly _panel: Phaser.GameObjects.Rectangle;

  /**
   * Create a workbench panel at the supplied local bounds.
   *
   * @param props - Panel position and dimensions.
   */
  constructor(props: WorkbenchViewProps) {
    super(props);
    this._panel = this.add(
      this.container.scene.add
        .rectangle(0, 0, props.width, props.height)
        .setOrigin(0, 0)
        .setStrokeStyle(INK_WIDTH, INK_COLOR),
    );
  }
}
