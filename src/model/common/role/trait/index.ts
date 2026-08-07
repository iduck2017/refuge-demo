import {
  Model,
  useMemo,
} from 'set-piece';
import { RoleModel, useRole } from '../index';
import { FlockModel, useFlock } from '../flock';
import { TraitModel, TraitProps } from '../../trait/index';

export type RoleTraitProps = TraitProps;

/**
 * Base class for traits routed to their owning role and flock.
 */
export abstract class RoleTraitModel extends TraitModel {
  @useRole()
  private _role?: RoleModel;
  @useMemo()
  public get role() { return this._role; }

  @useFlock()
  private _flock?: FlockModel;
  @useMemo()
  public get flock() { return this._flock; }

  /**
   * Create a role trait with optional activation state.
   *
   * @param props - Role trait configuration.
   */
  constructor(props: RoleTraitProps = {}) {
    super(props);
  }
}
