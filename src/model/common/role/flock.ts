import {
  Model,
  routeRegistry,
  TypedPropertyDecorator,
  useAction,
  useChild,
  useMemo,
  useModel,
} from 'set-piece';
import { RoleModel } from './index';

export type FlockProps = {
  roles?: RoleModel[];
};

@useModel('flock')
export class FlockModel extends Model {
  @useChild()
  private _roles: RoleModel[];
  @useMemo()
  public get roles() { return [...this._roles]; }

  constructor(props: FlockProps = {}) {
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
  public del(role: RoleModel) {
    const index = this._roles.indexOf(role);
    if (index < 0) return;
    if (role.parent !== this) return;
    this._roles.splice(index, 1);
  }

  @useAction()
  public proceed() {
    this.dispose();
    this.starve();
    this.dining()
  }

  @useAction()
  protected dispose() {
    this.roles.forEach((role) => {
      role.state.vitality.check();
    });
  }

  @useAction()
  protected starve() {
    this.roles.forEach((role) => {
      role.state.nutrition.consume();
    });
  }
  
  protected dining() {}
}

export function useFlock<
  I extends Model & Record<string, any>,
  K extends string,
>(): I[K] extends FlockModel | undefined ?
  TypedPropertyDecorator<I, K> :
  TypedPropertyDecorator<never, never>
{
  return function(prototype: I, key: K) {
    routeRegistry.register(prototype, key, () => FlockModel);
  };
}
