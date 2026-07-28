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
  traits?: RoleTraitModel[];
};

/**
 * Owns a role's traits and guarantees a starvation trait is present.
 */
@useModel('role-traits')
export class RoleTraitsModel extends Model {
  @useChild()
  private _traits: RoleTraitModel[];
  @useMemo()
  public get traits() { return [...this._traits]; }

  /**
   * Create a role trait collection and add default starvation behavior when
   * missing.
   *
   * @param props - Initial role traits.
   */
  constructor(props: RoleTraitsProps = {}) {
    super();
    const traits = props.traits ?? [];
    const starvation = traits.some((trait) => {
      return trait instanceof StarvationModel;
    });
    this._traits = traits;
    if (!starvation) this._traits.push(new StarvationModel())
  }

  /**
   * Add an unowned trait if it is not already in the collection.
   *
   * @param trait - Role trait to add.
   * @returns Nothing.
   */
  @useAction()
  public add(trait: RoleTraitModel) {
    const exists = this._traits.includes(trait);
    const owned = trait.parent === this;
    if (exists && owned) return;
    if (exists || trait.parent) return;
    this._traits.push(trait);
  }

  /**
   * Remove a trait owned by this collection.
   *
   * @param trait - Role trait to remove.
   * @returns Nothing.
   */
  @useAction()
  public del(trait: RoleTraitModel) {
    const index = this._traits.indexOf(trait);
    if (index < 0) return;
    if (trait.parent !== this) return;
    this._traits.splice(index, 1);
  }
}
