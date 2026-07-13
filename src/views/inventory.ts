import Phaser from 'phaser';
import { useChild, useView } from 'set-piece';
import { View } from './index';
import type { ViewProps } from './index';
import { ItemView } from './item';

export const ITEM_GAP = 12;
const ITEM_COUNT = 6;

export function inventoryItemSize(width: number, height: number) {
  const columnGaps = ITEM_GAP * (ITEM_COUNT - 1);
  const widthSize = (width - columnGaps) / ITEM_COUNT;
  const estimate = (height + ITEM_GAP) / (widthSize + ITEM_GAP);
  const rows = Math.max(Math.round(estimate), 1);
  const rowGaps = ITEM_GAP * (rows - 1);
  const heightSize = (height - rowGaps) / rows;
  return Math.min(widthSize, heightSize);
}

export type InventoryViewProps = ViewProps & {
  height: number;
  parent: Phaser.GameObjects.Container;
  width: number;
  x: number;
  y: number;
};

@useView()
export class InventoryView extends View {
  @useChild()
  private _items: ItemView[];

  constructor(props: InventoryViewProps) {
    super(props);
    const columnGaps = ITEM_GAP * (ITEM_COUNT - 1);
    const widthSize = (props.width - columnGaps) / ITEM_COUNT;
    const estimate = (props.height + ITEM_GAP) / (widthSize + ITEM_GAP);
    const rows = Math.max(Math.round(estimate), 1);
    const rowGaps = ITEM_GAP * (rows - 1);
    const size = inventoryItemSize(props.width, props.height);
    const itemsWidth = size * ITEM_COUNT + columnGaps;
    const itemsHeight = size * rows + rowGaps;
    const startX = props.x + (props.width - itemsWidth) / 2;
    const startY = props.y + (props.height - itemsHeight) / 2;
    const items: ItemView[] = [];

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < ITEM_COUNT; column += 1) {
        const x = startX + column * (size + ITEM_GAP);
        const y = startY + row * (size + ITEM_GAP);
        const item = new ItemView({
          scene: this._scene,
          parent: props.parent,
          size,
          x,
          y,
        });
        items.push(item);
      }
    }
    this._items = items;
  }
}
