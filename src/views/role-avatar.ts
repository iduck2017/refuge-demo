import Phaser from 'phaser';
import { useView } from 'set-piece';
import { INK_COLOR, INK_WIDTH, View } from './index';
import type { ViewProps } from './index';

export type RoleAvatarViewProps = ViewProps & {
  height: number;
  width: number;
  x: number;
  y: number;
};

/**
 * Displays one bordered role avatar placeholder.
 */
@useView()
export class RoleAvatarView extends View {
  private readonly _avatar: Phaser.GameObjects.Rectangle;

  /**
   * Create a role avatar placeholder at the supplied local bounds.
   *
   * @param props - Avatar position and dimensions.
   */
  constructor(props: RoleAvatarViewProps) {
    super(props);
    this._avatar = this.add(
      this.container.scene.add
        .rectangle(0, 0, props.width, props.height)
        .setOrigin(0, 0)
        .setStrokeStyle(INK_WIDTH, INK_COLOR),
    );
  }
}
