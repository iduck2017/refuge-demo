import {
  useMemo,
} from 'set-piece';
import { useRoleRoute } from '../../../../hooks/use-role-route';
import { useRolesRoute } from '../../../../hooks/use-roles-route';
import { RoleModel } from '../index';
import { RolesModel } from '../group';
import { TraitModel, TraitProps } from '../../trait';

export type RoleTraitProps = TraitProps;

/**
 * Base class for traits routed to their owning role and roles collection.
 */
export abstract class RoleTraitModel extends TraitModel {
  @useRoleRoute()
  private _role?: RoleModel;
  @useMemo()
  public get role() { return this._role; }

  @useRolesRoute()
  private _roles?: RolesModel;
  @useMemo()
  public get roles() { return this._roles; }

  /**
   * Create a role trait with optional activation state.
   *
   * @param props - Role trait configuration.
   */
  constructor(props: RoleTraitProps = {}) {
    super(props);
  }
}
