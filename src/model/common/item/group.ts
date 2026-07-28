import {
  Model,
  useAction,
  useChild,
  useFrameProducer,
  useMemo,
  useModel,
  useState,
} from 'set-piece';
import { ItemsChangedFrame } from './frame';
import type { ItemModel } from './index';

export type ItemGroupProps = {
  items?: ItemModel[];
  size?: number;
};

/**
 * Owns an ordered, capacity-limited collection of items.
 */
@useModel('item-group')
export class ItemGroupModel extends Model {
  @useState()
  private readonly _size: number;
  @useMemo()
  public get size() { return this._size; }

  @useFrameProducer(() => ItemsChangedFrame)
  @useChild()
  private _items: ItemModel[];
  @useMemo()
  public get items() { return [...this._items]; }

  /**
   * Create an item group with normalized capacity and optional contents.
   *
   * @param props - Initial items and capacity.
   */
  constructor(props: ItemGroupProps = {}) {
    super();
    const size = props.size ?? Infinity;
    this._size = Math.max(Math.floor(size), 0);
    this._items = props.items ?? [];
  }

  /**
   * Insert or move an item into the requested position.
   *
   * Transfers from another group are rejected when this group is full.
   *
   * @param item - Item to insert.
   * @param index - Optional insertion index; invalid values append.
   * @returns Nothing.
   */
  @useAction()
  public add(item: ItemModel, index?: number) {
    const container = item.container;
    const exchange = container !== this;
    const oversize = this._items.length >= this.size;
    if (exchange && oversize) return;

    if (container) container.del(item);
    if (item.parent) return;

    const length = this.items.length;
    if (index === undefined) index = length;
    if (index > length) index = length;
    if (index < 0) index = length;
    this._items.splice(index, 0, item);
  }

  /**
   * Remove an item from this group.
   *
   * @param item - Item to remove.
   * @returns Nothing.
   */
  @useAction()
  public del(item: ItemModel) {
    const index = this._items.indexOf(item);
    if (index < 0) return;
    this._items.splice(index, 1);
  }
}
