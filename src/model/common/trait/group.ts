import {
  Model,
  useAction,
  useChild,
  useMemo,
  useModel,
} from 'set-piece';
import type { TraitModel } from '../trait';

export type TraitsProps = {
  items?: TraitModel[];
};

/**
 * Owns a collection of traits supplied by its parent entity.
 */
@useModel('traits')
export class TraitsModel extends Model {
  @useChild()
  private _items: TraitModel[];
  @useMemo()
  public get items() { return [...this._items]; }

  /**
   * Create a trait collection with optional initial items.
   *
   * @param props - Initial traits.
   */
  constructor(props: TraitsProps = {}) {
    super();
    this._items = props.items ?? [];
  }

  /**
   * Add an unowned trait if it is not already in the collection.
   *
   * @param trait - Trait to add.
   * @returns Nothing.
   */
  @useAction()
  public add(trait: TraitModel) {
    const exists = this._items.includes(trait);
    const owned = trait.parent === this;
    if (exists && owned) return;
    if (exists || trait.parent) return;
    this._items.push(trait);
  }

  /**
   * Remove a trait owned by this collection.
   *
   * @param trait - Trait to remove.
   * @returns Nothing.
   */
  @useAction()
  public del(trait: TraitModel) {
    const index = this._items.indexOf(trait);
    if (index < 0) return;
    if (trait.parent !== this) return;
    this._items.splice(index, 1);
  }
}
