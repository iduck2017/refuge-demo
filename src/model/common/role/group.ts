import {
  Model,
  useAction,
  useChild,
  useMemo,
  useModel,
} from 'set-piece';
import { RoleModel } from './index';

export type RolesProps = {
  items?: RoleModel[];
};

/**
 * Owns the active roles and advances their survival state each turn.
 */
@useModel('roles')
export class RolesModel extends Model {
  @useChild()
  private _items: RoleModel[];
  @useMemo()
  public get items() { return [...this._items]; }

  /**
   * Create a role collection with optional initial items.
   *
   * @param props - Initial role collection.
   */
  constructor(props: RolesProps = {}) {
    super();
    this._items = props.items ?? [];
  }

  /**
   * Add an unowned role if it is not already in the collection.
   *
   * @param role - Role to add.
   * @returns Nothing.
   */
  @useAction()
  public add(role: RoleModel) {
    const exists = this._items.includes(role);
    const owned = role.parent === this;
    if (exists && owned) return;
    if (exists || role.parent) return;
    this._items.push(role);
  }

  /**
   * Remove a role owned by this collection.
   *
   * @param role - Role to remove.
   * @returns Nothing.
   */
  @useAction()
  public del(role: RoleModel) {
    const index = this._items.indexOf(role);
    if (index < 0) return;
    if (role.parent !== this) return;
    this._items.splice(index, 1);
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
    this.items.forEach((role) => {
      role.state.vitality.check();
    });
  }

  /**
   * Consume one satiety unit for each active role.
   *
   * @returns Nothing.
   */
  @useAction()
  protected starve() {
    this.items.forEach((role) => {
      role.state.satiety.consume();
    });
  }

  /**
   * Resolve role dining behavior for the current turn.
   *
   * @returns Nothing.
   */
  protected dining() {}
}
