import {
  Model,
  useAction,
  useChild,
  useMemo,
  useModel,
} from 'set-piece';
import type { RoleTraitModel } from './index';
import { StarvationModel } from './starvation/index';

export type RoleTraitsProps = {
  items?: RoleTraitModel[];
  starvation?: StarvationModel;
};

/**
 * Owns a role's ordinary traits and its dedicated starvation trait.
 */
@useModel('role-traits')
export class RoleTraitsModel extends Model {
  @useChild()
  private _items: RoleTraitModel[];
  @useMemo()
  public get items() { return [...this._items]; }

  @useChild()
  private _starvation: StarvationModel;
  @useMemo()
  public get starvation() { return this._starvation; }

  /**
   * Create a role trait collection with dedicated starvation behavior.
   *
   * @param props - Initial role traits.
   */
  constructor(props: RoleTraitsProps = {}) {
    super();
    this._items = props.items ?? [];
    this._starvation = props.starvation ?? new StarvationModel();
  }

  /**
   * Add an unowned ordinary trait if it is not already in the collection.
   *
   * @param trait - Role trait to add.
   * @returns Nothing.
   */
  @useAction()
  public add(trait: RoleTraitModel) {
    const exists = this._items.includes(trait);
    const owned = trait.parent === this;
    if (exists && owned) return;
    if (exists || trait.parent) return;
    this._items.push(trait);
  }

  /**
   * Remove an ordinary trait owned by this collection.
   *
   * @param trait - Role trait to remove.
   * @returns Nothing.
   */
  @useAction()
  public del(trait: RoleTraitModel) {
    const index = this._items.indexOf(trait);
    if (index < 0) return;
    if (trait.parent !== this) return;
    this._items.splice(index, 1);
  }
}
