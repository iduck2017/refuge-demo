import Phaser from 'phaser';
import { useRef, useView } from 'set-piece';
import type { ItemModel } from '../model/common/item/index';
import { INK_COLOR, INK_WIDTH, useGraph, View } from './index';
import type { ViewProps } from './index';

export type ItemViewProps = ViewProps & {
  drop: (item: ItemModel, x: number, y: number) => void;
  size: number;
  x: number;
  y: number;
};

@useView()
export class ItemView extends View {
  private readonly _drop: ItemViewProps['drop'];
  private readonly _x: number;
  private readonly _y: number;

  @useRef()
  private _model?: ItemModel;

  @useGraph()
  private readonly _slot: Phaser.GameObjects.Rectangle;
  @useGraph()
  private readonly _content: Phaser.GameObjects.Rectangle;
  @useGraph()
  private readonly _name: Phaser.GameObjects.Text;

  constructor(props: ItemViewProps) {
    super(props);
    this._drop = props.drop;
    this._x = props.x;
    this._y = props.y;
    this._slot = this._scene.add
      .rectangle(props.x, props.y, props.size, props.size)
      .setOrigin(0, 0)
      .setStrokeStyle(INK_WIDTH, INK_COLOR);
    this._content = this._scene.add
      .rectangle(
        props.x,
        props.y,
        props.size,
        props.size,
        0xffffff,
        0,
      )
      .setOrigin(0, 0)
      .setInteractive({ useHandCursor: true });
    this._name = this._scene.add
      .text(
        props.x + props.size / 2,
        props.y + props.size / 2,
        '',
        {
          align: 'center',
          color: '#5a3d22',
          fontSize: `${Math.max(Math.floor(props.size * 0.14), 12)}px`,
          wordWrap: { width: props.size - 12 },
        },
      )
      .setOrigin(0.5);
    this._scene.input.setDraggable(this._content);
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

  public contains(x: number, y: number) {
    return this._slot.getBounds().contains(x, y);
  }

  public render(item?: ItemModel) {
    this._model = item;
    this.reset();
    this._name.setText(item?.name ?? '');
    if (item) this._content.setInteractive();
    if (!item) this._content.disableInteractive();
  }

  private start() {
    this._scene.children.bringToTop(this._content);
    this._scene.children.bringToTop(this._name);
  }

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

  private drop(pointer: Phaser.Input.Pointer) {
    const item = this._model;
    this.reset();
    if (!item) return;
    this._drop(item, pointer.worldX, pointer.worldY);
  }

  private reset() {
    const centerX = this._x + this._content.width / 2;
    const centerY = this._y + this._content.height / 2;
    this._content.setPosition(this._x, this._y);
    this._name.setPosition(centerX, centerY);
  }
}
