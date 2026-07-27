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

  constructor(props: ItemGroupProps = {}) {
    super();
    const size = props.size ?? Infinity;
    this._size = Math.max(Math.floor(size), 0);
    this._items = props.items ?? [];
  }

  
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

  @useAction()
  public del(item: ItemModel) {
    const index = this._items.indexOf(item);
    if (index < 0) return;
    this._items.splice(index, 1);
  }
}
