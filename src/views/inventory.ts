import {
  useChild,
  useFrameConsumer,
  useRef,
  useView,
} from 'set-piece';
import { ItemsChangedFrame } from '../model/common/item/frame';
import type { ItemGroupModel } from '../model/common/item/group';
import type { ItemModel } from '../model/common/item/index';
import { View } from './index';
import type { ViewProps } from './index';
import { ItemView } from './item';

export const ITEM_GAP = 8;
const ITEM_COUNT = 6;

export function inventoryItemSize(width: number, height: number) {
  const columnGaps = ITEM_GAP * (ITEM_COUNT - 1);
  const widthSize = (width - columnGaps) / ITEM_COUNT;
  const estimate = (height + ITEM_GAP) / (widthSize + ITEM_GAP);
  const rows = Math.max(Math.round(estimate), 1);
  const rowGaps = ITEM_GAP * (rows - 1);
  const heightSize = (height - rowGaps) / rows;
  return Math.round(Math.min(widthSize, heightSize));
}

export type InventoryViewProps = ViewProps & {
  height: number;
  items: ItemGroupModel;
  width: number;
  x: number;
  y: number;
};

@useView()
export class InventoryView extends View {
  @useRef()
  private _model?: ItemGroupModel;

  @useChild()
  private _items: ItemView[];

  constructor(props: InventoryViewProps) {
    super(props);
    this._model = props.items;
    const columnGaps = ITEM_GAP * (ITEM_COUNT - 1);
    const widthSize = (props.width - columnGaps) / ITEM_COUNT;
    const estimate = (props.height + ITEM_GAP) / (widthSize + ITEM_GAP);
    const rows = Math.max(Math.round(estimate), 1);
    const rowGaps = ITEM_GAP * (rows - 1);
    const size = inventoryItemSize(props.width, props.height);
    const itemsWidth = size * ITEM_COUNT + columnGaps;
    const itemsHeight = size * rows + rowGaps;
    const startX = Math.round(
      props.x + (props.width - itemsWidth) / 2,
    );
    const startY = Math.round(
      props.y + props.height - itemsHeight,
    );
    const items: ItemView[] = [];

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < ITEM_COUNT; column += 1) {
        const x = startX + column * (size + ITEM_GAP);
        const y = startY + row * (size + ITEM_GAP);
        const item = new ItemView({
          drop: this.drop.bind(this),
          scene: this._scene,
          size,
          x,
          y,
        });
        items.push(item);
      }
    }
    this._items = items;
    this.render(props.items.items);
  }

  @useFrameConsumer(self => [self._model, ItemsChangedFrame])
  protected async handleItems(frame: ItemsChangedFrame) {
    this.render(frame.detail.next);
  }

  private drop(item: ItemModel, x: number, y: number) {
    const index = this._items.findIndex((view) => {
      return view.contains(x, y);
    });
    if (index < 0) return;
    this._model?.add(item, index);
  }

  private render(items: ItemModel[]) {
    this._items.forEach((view, index) => {
      view.render(items[index]);
    });
  }
}
