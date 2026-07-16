import Phaser from 'phaser';
import { useView } from 'set-piece';
import { INK_COLOR, INK_WIDTH, useGraph, View } from './index';
import type { ViewProps } from './index';

export type WorkbenchViewProps = ViewProps & {
  height: number;
  parent: Phaser.GameObjects.Container;
  width: number;
  x: number;
  y: number;
};

@useView()
export class WorkbenchView extends View {
  @useGraph()
  private readonly _panel: Phaser.GameObjects.Rectangle;

  constructor(props: WorkbenchViewProps) {
    super(props);
    this._panel = this._scene.add
      .rectangle(props.x, props.y, props.width, props.height)
      .setOrigin(0, 0)
      .setStrokeStyle(INK_WIDTH, INK_COLOR);
    props.parent.add(this._panel);
  }
}
