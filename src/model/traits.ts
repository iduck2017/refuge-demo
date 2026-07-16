import {
  Model,
  useAction,
  useChild,
  useMemo,
  useModel,
} from 'set-piece';
import type { RoleTraitModel } from './trait';

export type TraitsProps = {
  traits?: RoleTraitModel[];
};

@useModel('traits')
export class TraitsModel extends Model {
  @useChild()
  private _traits: RoleTraitModel[];
  @useMemo()
  public get traits() { return [...this._traits]; }

  constructor(props: TraitsProps = {}) {
    super();
    this._traits = props.traits ?? [];
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
  public remove(trait: RoleTraitModel) {
    const index = this._traits.indexOf(trait);
    if (index < 0) return;
    if (trait.parent !== this) return;
    this._traits.splice(index, 1);
  }
}
