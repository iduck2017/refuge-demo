import { Model, useAction, useChild, useMemo, useModel } from 'set-piece';
import { ItemModel } from './item';

export type InventoryProps = {
  items?: ItemModel[];
};

@useModel('inventory')
export class InventoryModel extends Model {
  @useChild()
  private _items: ItemModel[];
  @useMemo()
  public get items() { return [...this._items]; }

  constructor(props: InventoryProps = {}) {
    super();
    this._items = props.items ?? [];
  }

  @useAction()
  public add(item: ItemModel) {
    const exists = this._items.includes(item);
    const owned = item.parent === this;
    if (exists && owned) return;
    if (exists || item.parent) return;
    this._items.push(item);
  }

  @useAction()
  public remove(item: ItemModel) {
    const index = this._items.indexOf(item);
    if (index < 0) return;
    if (item.parent !== this) return;
    this._items.splice(index, 1);
  }
}
