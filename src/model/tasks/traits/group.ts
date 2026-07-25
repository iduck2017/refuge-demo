import {
  Model,
  useAction,
  useChild,
  useMemo,
  useModel,
} from 'set-piece';
import type { TaskTraitModel } from './index';

export type TaskTraitsProps = {
  traits?: TaskTraitModel[];
};

@useModel('task-traits')
export class TaskTraitsModel extends Model {
  @useChild()
  private _traits: TaskTraitModel[];
  @useMemo()
  public get traits() { return [...this._traits]; }

  constructor(props: TaskTraitsProps = {}) {
    super();
    this._traits = props.traits ?? [];
  }

  @useAction()
  public add(trait: TaskTraitModel) {
    const exists = this._traits.includes(trait);
    const owned = trait.parent === this;
    if (exists && owned) return;
    if (exists || trait.parent) return;
    this._traits.push(trait);
  }

  @useAction()
  public del(trait: TaskTraitModel) {
    const index = this._traits.indexOf(trait);
    if (index < 0) return;
    if (trait.parent !== this) return;
    this._traits.splice(index, 1);
  }
}
