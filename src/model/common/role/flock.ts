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

/**
 * Owns the active roles and advances their survival state each turn.
 */
@useModel('flock')
export class FlockModel extends Model {
  @useChild()
  private _roles: RoleModel[];
  @useMemo()
  public get roles() { return [...this._roles]; }

  /**
   * Create a flock with optional initial roles.
   *
   * @param props - Initial role collection.
   */
  constructor(props: FlockProps = {}) {
    super();
    this._roles = props.roles ?? [];
  }

  /**
   * Add an unowned role if it is not already in the flock.
   *
   * @param role - Role to add.
   * @returns Nothing.
   */
  @useAction()
  public add(role: RoleModel) {
    const exists = this._roles.includes(role);
    const owned = role.parent === this;
    if (exists && owned) return;
    if (exists || role.parent) return;
    this._roles.push(role);
  }

  /**
   * Remove a role owned by this flock.
   *
   * @param role - Role to remove.
   * @returns Nothing.
   */
  @useAction()
  public del(role: RoleModel) {
    const index = this._roles.indexOf(role);
    if (index < 0) return;
    if (role.parent !== this) return;
    this._roles.splice(index, 1);
  }

  /**
   * Advance vitality, starvation, and dining behavior for all roles.
   *
   * @returns Nothing.
   */
  @useAction()
  public proceed() {
    this.dispose();
    this.starve();
    this.dining()
  }

  /**
   * Check each role for vitality-based removal.
   *
   * @returns Nothing.
   */
  @useAction()
  protected dispose() {
    this.roles.forEach((role) => {
      role.vitality.check();
    });
  }

  /**
   * Consume one satiety unit for each active role.
   *
   * @returns Nothing.
   */
  @useAction()
  protected starve() {
    this.roles.forEach((role) => {
      role.satiety.consume();
    });
  }

  /**
   * Resolve role dining behavior for the current turn.
   *
   * @returns Nothing.
   */
  protected dining() {}
}

/**
 * Create a property decorator that routes to the nearest flock ancestor.
 *
 * @returns Typed decorator for an optional `FlockModel` property.
 */
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
