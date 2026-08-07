import Phaser from 'phaser';
import { useRef, useView } from 'set-piece';
import type { AssetModel } from '../model/common/asset/index';
import { INK_COLOR, INK_WIDTH, View } from './index';
import type { ViewProps } from './index';

export type AssetViewProps = ViewProps & {
  drop: (asset: AssetModel, x: number, y: number) => void;
  size: number;
  x: number;
  y: number;
};

/**
 * Displays one draggable asset slot and its optional label.
 */
@useView()
export class AssetView extends View {
  private readonly _drop: AssetViewProps['drop'];

  @useRef()
  private _model?: AssetModel;

  private readonly _slot: Phaser.GameObjects.Rectangle;
  private readonly _content: Phaser.GameObjects.Rectangle;
  private readonly _name: Phaser.GameObjects.Text;

  /**
   * Create the slot outline, drag target, and centered label.
   *
   * @param props - Slot position, size, and drop callback.
   */
  constructor(props: AssetViewProps) {
    super(props);
    this._drop = props.drop;
    this._slot = this.add(
      this.container.scene.add
        .rectangle(0, 0, props.size, props.size)
        .setOrigin(0, 0)
        .setStrokeStyle(INK_WIDTH, INK_COLOR),
    );
    this._content = this.add(
      this.container.scene.add
        .rectangle(
          0,
          0,
          props.size,
          props.size,
          0xffffff,
          0,
        )
        .setOrigin(0, 0)
        .setInteractive({ useHandCursor: true }),
    );
    this._name = this.add(
      this.container.scene.add
        .text(
          props.size / 2,
          props.size / 2,
          '',
          {
            align: 'center',
            color: '#5a3d22',
            fontSize: `${Math.max(Math.floor(props.size * 0.14), 12)}px`,
            wordWrap: { width: props.size - 12 },
          },
        )
        .setOrigin(0.5),
    );
    this.container.scene.input.setDraggable(this._content);
    this._content.on(
      Phaser.Input.Events.GAMEOBJECT_DRAG_START,
      this.start,
      this,
    );
    this._content.on(
      Phaser.Input.Events.GAMEOBJECT_DRAG,
      this.drag,
      this,
    );
    this._content.on(
      Phaser.Input.Events.GAMEOBJECT_DRAG_END,
      this.drop,
      this,
    );
  }

  /**
   * Check whether a world-space point lies inside this slot.
   *
   * @param x - World x-coordinate.
   * @param y - World y-coordinate.
   * @returns Whether the point intersects the transformed slot bounds.
   */
  public contains(x: number, y: number) {
    return this._slot.getBounds().contains(x, y);
  }

  /**
   * Display an asset and enable dragging, or clear and disable the slot.
   *
   * @param asset - Asset to display, if any.
   * @returns Nothing.
   */
  public render(asset?: AssetModel) {
    this._model = asset;
    this.reset();
    this._name.setText(asset?.name ?? '');
    if (asset) this._content.setInteractive();
    if (!asset) this._content.disableInteractive();
  }

  /**
   * Raise the dragged asset and its label above neighboring slots.
   *
   * @returns Nothing.
   */
  private start() {
    this.container.parentContainer?.bringToTop(this.container);
    this.container.bringToTop(this._content);
    this.container.bringToTop(this._name);
  }

  /**
   * Move asset content and label with the pointer in local coordinates.
   *
   * @param _pointer - Pointer driving the drag.
   * @param x - Local drag x-coordinate.
   * @param y - Local drag y-coordinate.
   * @returns Nothing.
   */
  private drag(
    _pointer: Phaser.Input.Pointer,
    x: number,
    y: number,
  ) {
    const centerX = x + this._content.width / 2;
    const centerY = y + this._content.height / 2;
    this._content.setPosition(x, y);
    this._name.setPosition(centerX, centerY);
  }

  /**
   * Reset visual position and report a completed asset drop.
   *
   * @param pointer - Pointer at the drag-end location.
   * @returns Nothing.
   */
  private drop(pointer: Phaser.Input.Pointer) {
    const asset = this._model;
    this.reset();
    if (!asset) return;
    this._drop(asset, pointer.worldX, pointer.worldY);
  }

  /**
   * Restore content and label to their default local positions.
   *
   * @returns Nothing.
   */
  private reset() {
    const centerX = this._content.width / 2;
    const centerY = this._content.height / 2;
    this._content.setPosition(0, 0);
    this._name.setPosition(centerX, centerY);
  }
}
