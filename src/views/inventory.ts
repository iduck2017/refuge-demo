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

/**
 * Calculate the largest square item size that fits the inventory grid.
 *
 * @param width - Available grid width.
 * @param height - Available grid height.
 * @returns Rounded square item size.
 */
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

/**
 * Renders and synchronizes the shared item group as a six-column slot grid.
 */
@useView()
export class InventoryView extends View {
  @useRef()
  private _model?: ItemGroupModel;

  @useChild()
  private _items: ItemView[];

  /**
   * Create a bottom-aligned item grid and render its initial model contents.
   *
   * @param props - Inventory model, bounds, and local position.
   */
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
      (props.width - itemsWidth) / 2,
    );
    const startY = Math.round(
      props.height - itemsHeight,
    );
    const items: ItemView[] = [];

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < ITEM_COUNT; column += 1) {
        const x = startX + column * (size + ITEM_GAP);
        const y = startY + row * (size + ITEM_GAP);
        const item = this.createView(ItemView, {
          drop: this.drop.bind(this),
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

  /**
   * Rerender item slots after the item group changes.
   *
   * @param frame - Diff frame containing the next ordered item list.
   * @returns Promise resolved after the synchronous render update.
   */
  @useFrameConsumer(self => [self._model, ItemsChangedFrame])
  protected async handleItems(frame: ItemsChangedFrame) {
    this.render(frame.detail.next);
  }

  /**
   * Move a dropped item to the slot containing the pointer.
   *
   * @param item - Item being dropped.
   * @param x - Pointer world x-coordinate.
   * @param y - Pointer world y-coordinate.
   * @returns Nothing.
   */
  private drop(item: ItemModel, x: number, y: number) {
    const index = this._items.findIndex((view) => {
      return view.contains(x, y);
    });
    if (index < 0) return;
    this._model?.add(item, index);
  }

  /**
   * Render an ordered item list into the available slot views.
   *
   * @param items - Items to display by slot index.
   * @returns Nothing.
   */
  private render(items: ItemModel[]) {
    this._items.forEach((view, index) => {
      view.render(items[index]);
    });
  }
}
