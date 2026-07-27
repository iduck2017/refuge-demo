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

@useModel('role-traits')
export class RoleTraitsModel extends Model {
  @useChild()
  private _traits: RoleTraitModel[];
  @useMemo()
  public get traits() { return [...this._traits]; }

  constructor(props: RoleTraitsProps = {}) {
    super();
    const traits = props.traits ?? [];
    const starvation = traits.some((trait) => {
      return trait instanceof StarvationModel;
    });
    this._traits = traits;
    if (!starvation) this._traits.push(new StarvationModel())
  }

  @useAction()
  public add(trait: RoleTraitModel) {
    const exists = this._traits.includes(trait);
    const owned = trait.parent === this;
    if (exists && owned) return;
    if (exists || trait.parent) return;
    this._traits.push(trait);
  }

  @useAction()
  public del(trait: RoleTraitModel) {
    const index = this._traits.indexOf(trait);
    if (index < 0) return;
    if (trait.parent !== this) return;
    this._traits.splice(index, 1);
  }
}
