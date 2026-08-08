import {
  DiffFrame,
  Model,
  useAction,
  useChild,
  useFrameProducer,
  useMemo,
  useModel,
  useState,
} from 'set-piece';
import type { AssetModel } from './index';

/**
 * Carries the previous and next ordered contents of an asset collection.
 */
export class AssetsChangedFrame extends DiffFrame<AssetModel[]> {}

export type AssetsProps = {
  items?: AssetModel[];
  size?: number;
};

/**
 * Owns an ordered, capacity-limited collection of assets.
 */
@useModel('assets')
export class AssetsModel extends Model {
  @useState()
  private readonly _size: number;
  @useMemo()
  public get size() { return this._size; }

  @useFrameProducer(() => AssetsChangedFrame)
  @useChild()
  private _items: AssetModel[];
  @useMemo()
  public get items() { return [...this._items]; }

  /**
   * Create an asset collection with normalized capacity and optional contents.
   *
   * @param props - Initial assets and capacity.
   */
  constructor(props: AssetsProps = {}) {
    super();
    const size = props.size ?? Infinity;
    this._size = Math.max(Math.floor(size), 0);
    this._items = props.items ?? [];
  }

  /**
   * Insert or move an asset into the requested position.
   *
   * Transfers from another group are rejected when this group is full.
   *
   * @param asset - Asset to insert.
   * @param index - Optional insertion index; invalid values append.
   * @returns Nothing.
   */
  @useAction()
  public add(asset: AssetModel, index?: number) {
    const container = asset.container;
    const exchange = container !== this;
    const oversize = this._items.length >= this.size;
    if (exchange && oversize) return;

    if (container) container.del(asset);
    if (asset.parent) return;

    const length = this.items.length;
    if (index === undefined) index = length;
    if (index > length) index = length;
    if (index < 0) index = length;
    this._items.splice(index, 0, asset);
  }

  /**
   * Remove an asset from this collection.
   *
   * @param asset - Asset to remove.
   * @returns Nothing.
   */
  @useAction()
  public del(asset: AssetModel) {
    const index = this._items.indexOf(asset);
    if (index < 0) return;
    this._items.splice(index, 1);
  }
}
