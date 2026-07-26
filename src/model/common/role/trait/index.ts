import {
  Model,
  useMemo,
} from 'set-piece';
import { RoleModel, useRole } from '../index';
import { FlockModel, useFlock } from '../flock';
import { TraitModel, TraitProps } from '../../trait/index';
import {
  TraitActivedDecor,
  useTraitActived,
} from '../../trait/use-trait-actived';

export type RoleTraitProps = TraitProps;

export abstract class RoleTraitModel extends TraitModel {
  @useRole()
  private _role?: RoleModel;
  @useMemo()
  public get role() { return this._role; }

  @useFlock()
  private _flock?: FlockModel;
  @useMemo()
  public get flock() { return this._flock; }

  constructor(props: RoleTraitProps = {}) {
    super(props);
  }
}
