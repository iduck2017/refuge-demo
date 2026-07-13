import Phaser from 'phaser';
import { useView } from 'set-piece';
import { useGraph, View } from './index';
import type { ViewProps } from './index';

export type IllustrationViewProps = ViewProps & {
  height: number;
  parent: Phaser.GameObjects.Container;
  width: number;
  x: number;
  y: number;
};

@useView()
export class IllustrationView extends View {
  @useGraph()
  private readonly _panel: Phaser.GameObjects.Rectangle;

  constructor(props: IllustrationViewProps) {
    super(props);
    this._panel = this._scene.add
      .rectangle(props.x, props.y, props.width, props.height)
      .setOrigin(0, 0)
      .setStrokeStyle(1, 0xeeeeee);
    props.parent.add(this._panel);
  }
}
