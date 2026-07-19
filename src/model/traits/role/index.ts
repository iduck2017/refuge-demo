import {
  Model,
  useMemo,
} from 'set-piece';
import { RoleModel, useRole } from '../../roles/index';
import { TraitModel, TraitProps } from '../index';

export type RoleTraitProps = TraitProps;

export abstract class RoleTraitModel extends TraitModel {
  @useRole()
  private _role?: RoleModel;
  @useMemo()
  public get role() { return this._role; }

  constructor(props: RoleTraitProps = {}) {
    super(props);
  }
}
