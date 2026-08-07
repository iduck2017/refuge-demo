import {
  Model,
  useAction,
  useChild,
  useMemo,
  useModel,
} from 'set-piece';
import type { TaskTraitModel } from './index';

export type TaskTraitsProps = {
  items?: TaskTraitModel[];
};

/**
 * Owns the traits that modify a task.
 */
@useModel('task-traits')
export class TaskTraitsModel extends Model {
  @useChild()
  private _items: TaskTraitModel[];
  @useMemo()
  public get items() { return [...this._items]; }

  /**
   * Create a task trait collection with optional initial traits.
   *
   * @param props - Initial task traits.
   */
  constructor(props: TaskTraitsProps = {}) {
    super();
    this._items = props.items ?? [];
  }

  /**
   * Add an unowned trait if it is not already in the collection.
   *
   * @param trait - Task trait to add.
   * @returns Nothing.
   */
  @useAction()
  public add(trait: TaskTraitModel) {
    const exists = this._items.includes(trait);
    const owned = trait.parent === this;
    if (exists && owned) return;
    if (exists || trait.parent) return;
    this._items.push(trait);
  }

  /**
   * Remove a trait owned by this collection.
   *
   * @param trait - Task trait to remove.
   * @returns Nothing.
   */
  @useAction()
  public del(trait: TaskTraitModel) {
    const index = this._items.indexOf(trait);
    if (index < 0) return;
    if (trait.parent !== this) return;
    this._items.splice(index, 1);
  }
}
