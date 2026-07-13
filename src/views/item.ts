import Phaser from 'phaser';
import { useView } from 'set-piece';
import { useGraph, View } from './index';
import type { ViewProps } from './index';

export type ItemViewProps = ViewProps & {
  parent: Phaser.GameObjects.Container;
  size: number;
  x: number;
  y: number;
};

@useView()
export class ItemView extends View {
  @useGraph()
  private readonly _item: Phaser.GameObjects.Rectangle;

  constructor(props: ItemViewProps) {
    super(props);
    this._item = this._scene.add
      .rectangle(props.x, props.y, props.size, props.size)
      .setOrigin(0, 0)
      .setStrokeStyle(1, 0xeeeeee);
    props.parent.add(this._item);
  }
}
