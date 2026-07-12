import { Model, useChild, useMemo, useModel } from 'set-piece';
import { NutritionModel } from './nutrition';
import { VitalityModel } from './vitality/index';

export type RoleStateProps = {
  nutrition?: NutritionModel;
  vitality?: VitalityModel;
};

@useModel('role-state')
export class RoleStateModel extends Model {
  @useChild()
  private _nutrition: NutritionModel;
  @useMemo()
  public get nutrition() { return this._nutrition; }

  @useChild()
  private _vitality: VitalityModel;
  @useMemo()
  public get vitality() { return this._vitality; }

  constructor(props: RoleStateProps = {}) {
    super();
    this._nutrition = props.nutrition ?? new NutritionModel();
    this._vitality = props.vitality ?? new VitalityModel();
  }
}
