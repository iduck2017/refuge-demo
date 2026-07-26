import { Model, useChild, useMemo, useModel } from 'set-piece';
import { StrengthModel } from './strength';
import { NutritionModel } from './nutrition';
import { VitalityModel } from './vitality/index';

export type RoleStateProps = {
  strength?: StrengthModel;
  nutrition?: NutritionModel;
  vitality?: VitalityModel;
};

@useModel('role-state')
export class RoleStateModel extends Model {
  @useChild()
  private _strength: StrengthModel;
  @useMemo()
  public get strength() { return this._strength; }

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
    this._strength = props.strength ?? new StrengthModel();
    this._nutrition = props.nutrition ?? new NutritionModel();
    this._vitality = props.vitality ?? new VitalityModel();
  }
}
