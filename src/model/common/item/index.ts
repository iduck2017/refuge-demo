import {
  Model,
  useChild,
  useMemo,
  useRoute,
  useState,
} from 'set-piece';
import { ItemEdibleModel } from './edible/index';
import { ItemGroupModel } from './group';

export type ItemProps = {
  edible?: ItemEdibleModel;
  name?: string;
};

export abstract class ItemModel extends Model {
  @useRoute(() => ItemGroupModel)
  private _container?: ItemGroupModel;
  @useMemo()
  public get container() { return this._container; }

  @useState()
  private readonly _name: string;
  @useMemo()
  public get name() { return this._name; }

  @useChild()
  private _edible?: ItemEdibleModel;
  @useMemo()
  public get edible() { return this._edible; }

  constructor(props: ItemProps = {}) {
    super();
    this._name = props.name ?? '';
    this._edible = props.edible;
  }
}
