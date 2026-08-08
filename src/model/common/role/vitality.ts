import {
  useAction,
  useMemo,
  useModel,
} from 'set-piece';
import { useRoleRoute } from '../../../hooks/use-role-route';
import { useRolesRoute } from '../../../hooks/use-roles-route';
import { AttrModel } from '../attr';
import type { RoleModel } from './index';
import type { RolesModel } from './group';

/**
 * Represents decorated vitality and removes roles that fail its death check.
 */
@useModel('role-vitality')
export class RoleVitalityModel extends AttrModel {
  @useRoleRoute()
  private _role?: RoleModel;
  @useMemo()
  public get role() { return this._role; }

  @useRolesRoute()
  private _roles?: RolesModel;
  @useMemo()
  public get roles() { return this._roles; }

  /**
   * Remove the owning role when negative vitality fails a chance check.
   *
   * The removal chance increases by ten percentage points for each point below
   * zero, capped at certainty.
   *
   * @returns Nothing.
   */
  @useAction()
  public check() {
    const role = this.role;
    const roles = this.roles;
    if (!role || !roles) return;
    const current = this.current;
    if (current >= 0) return;
    const chance = Math.min(-current * 0.1, 1);
    if (Math.random() >= chance) return;
    roles.del(role);
  }
}
