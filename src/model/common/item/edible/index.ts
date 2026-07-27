import { Model, useAction, useMemo, useModel, useState } from 'set-piece';
import { RoleModel } from '../../role/index';

export type ItemEdibleProps = {
  nutrition?: number;
};

@useModel('item-edible')
export class ItemEdibleModel extends Model {
  @useState()
  private readonly _nutrition: number;
  @useMemo()
  public get nutrition() { return this._nutrition; }

  constructor(props: ItemEdibleProps = {}) {
    super();
    this._nutrition = props.nutrition ?? 0;
  }

  @useAction()
  public consume(role: RoleModel) {
    const nutrition = role.state.nutrition;
    nutrition.restore(this.nutrition);
  }
}
