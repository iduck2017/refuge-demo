import { Model, useChild, useMemo } from 'set-piece';
import { ItemEdibleModel } from './edible/index';

export type ItemProps = {
  edible?: ItemEdibleModel;
};

export abstract class ItemModel extends Model {
  @useChild()
  private _edible?: ItemEdibleModel;
  @useMemo()
  public get edible() { return this._edible; }

  constructor(props: ItemProps = {}) {
    super();
    this._edible = props.edible;
  }
}
