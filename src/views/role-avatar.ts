import Phaser from 'phaser';
import { useView } from 'set-piece';
import { useGraph, View } from './index';
import type { ViewProps } from './index';

export type RoleAvatarViewProps = ViewProps & {
  height: number;
  parent: Phaser.GameObjects.Container;
  width: number;
  x: number;
  y: number;
};

@useView()
export class RoleAvatarView extends View {
  @useGraph()
  private readonly _avatar: Phaser.GameObjects.Rectangle;

  constructor(props: RoleAvatarViewProps) {
    super(props);
    this._avatar = this._scene.add
      .rectangle(props.x, props.y, props.width, props.height)
      .setOrigin(0, 0)
      .setStrokeStyle(1, 0xeeeeee);
    props.parent.add(this._avatar);
  }
}
