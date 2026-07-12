import { Model, useChild, useMemo, useModel } from 'set-piece';
import { StrengthModel } from './strength';

export type RoleAttrsProps = {
  strength?: StrengthModel;
};

@useModel('role-attrs')
export class RoleAttrsModel extends Model {
  @useChild()
  private _strength: StrengthModel;
  @useMemo()
  public get strength() { return this._strength; }

  constructor(props: RoleAttrsProps = {}) {
    super();
    this._strength = props.strength ?? new StrengthModel();
  }
}
