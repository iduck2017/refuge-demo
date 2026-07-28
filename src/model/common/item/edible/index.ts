import { Model, useAction, useMemo, useModel, useState } from 'set-piece';
import { RoleModel } from '../../role/index';

export type ItemEdibleProps = {
  nutrition?: number;
};

/**
 * Restores role nutrition when its owning item is consumed.
 */
@useModel('item-edible')
export class ItemEdibleModel extends Model {
  @useState()
  private readonly _nutrition: number;
  @useMemo()
  public get nutrition() { return this._nutrition; }

  /**
   * Create edible behavior with an optional nutrition value.
   *
   * @param props - Edible configuration.
   */
  constructor(props: ItemEdibleProps = {}) {
    super();
    this._nutrition = props.nutrition ?? 0;
  }

  /**
   * Apply this edible item's nutrition to a role.
   *
   * @param role - Role consuming the item.
   * @returns Nothing.
   */
  @useAction()
  public consume(role: RoleModel) {
    const nutrition = role.state.nutrition;
    nutrition.restore(this.nutrition);
  }
}
