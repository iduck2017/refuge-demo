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

/**
 * Owns the traits that modify a task.
 */
@useModel('task-traits')
export class TaskTraitsModel extends Model {
  @useChild()
  private _traits: TaskTraitModel[];
  @useMemo()
  public get traits() { return [...this._traits]; }

  /**
   * Create a task trait collection with optional initial traits.
   *
   * @param props - Initial task traits.
   */
  constructor(props: TaskTraitsProps = {}) {
    super();
    this._traits = props.traits ?? [];
  }

  /**
   * Add an unowned trait if it is not already in the collection.
   *
   * @param trait - Task trait to add.
   * @returns Nothing.
   */
  @useAction()
  public add(trait: TaskTraitModel) {
    const exists = this._traits.includes(trait);
    const owned = trait.parent === this;
    if (exists && owned) return;
    if (exists || trait.parent) return;
    this._traits.push(trait);
  }

  /**
   * Remove a trait owned by this collection.
   *
   * @param trait - Task trait to remove.
   * @returns Nothing.
   */
  @useAction()
  public del(trait: TaskTraitModel) {
    const index = this._traits.indexOf(trait);
    if (index < 0) return;
    if (trait.parent !== this) return;
    this._traits.splice(index, 1);
  }
}
