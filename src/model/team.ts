import { Model, useAction, useChild, useMemo, useModel } from 'set-piece';
import { RoleModel } from './roles/index';

export type TeamProps = {
  roles?: RoleModel[];
};

@useModel('team')
export class TeamModel extends Model {
  @useChild()
  private _roles: RoleModel[];
  @useMemo()
  public get roles() { return [...this._roles]; }

  constructor(props: TeamProps = {}) {
    super();
    this._roles = props.roles ?? [];
  }

  @useAction()
  public add(role: RoleModel) {
    const exists = this._roles.includes(role);
    const owned = role.parent === this;
    if (exists && owned) return;
    if (exists || role.parent) return;
    this._roles.push(role);
  }

  @useAction()
  public remove(role: RoleModel) {
    const index = this._roles.indexOf(role);
    if (index < 0) return;
    if (role.parent !== this) return;
    this._roles.splice(index, 1);
  }
}
