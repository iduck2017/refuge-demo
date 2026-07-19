import {
  Model,
  useAction,
  useChild,
  useMemo,
  useModel,
} from 'set-piece';
import type { RoleTraitModel } from './index';
import { StarvationModel } from '../starvation/index';

export type RoleTraitsProps = {
  starvation?: StarvationModel;
  traits?: RoleTraitModel[];
};

@useModel('role-traits')
export class RoleTraitsModel extends Model {
  @useChild()
  private _starvation: StarvationModel;
  @useMemo()
  public get starvation() { return this._starvation; }

  @useChild()
  private _traits: RoleTraitModel[];
  @useMemo()
  public get traits() { return [...this._traits]; }

  constructor(props: RoleTraitsProps = {}) {
    super();
    this._starvation = props.starvation ?? new StarvationModel();
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
