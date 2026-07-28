import {
  Model,
  useAction,
  useChild,
  useMemo,
  useModel,
} from 'set-piece';
import { TaskModel } from './index';

export type TasksProps = {
  items?: TaskModel[];
};

/**
 * Owns and advances the game's active tasks.
 */
@useModel('tasks')
export class TasksModel extends Model {
  @useChild()
  private _items: TaskModel[];
  @useMemo()
  public get items() { return [...this._items]; }

  /**
   * Create a task collection with optional initial tasks.
   *
   * @param props - Initial task collection.
   */
  constructor(props: TasksProps = {}) {
    super();
    this._items = props.items ?? [];
  }

  /**
   * Advance every active task by one turn.
   *
   * @returns Nothing.
   */
  @useAction()
  public proceed() {
    this.items.forEach((task) => {
      task.proceed();
    });
  }

  /**
   * Add an unowned task if it is not already active.
   *
   * @param task - Task to add.
   * @returns Nothing.
   */
  @useAction()
  public add(task: TaskModel) {
    const exists = this._items.includes(task);
    const owned = task.parent === this;
    if (exists && owned) return;
    if (exists || task.parent) return;
    this._items.push(task);
  }

  /**
   * Remove a task owned by this collection.
   *
   * @param task - Task to remove.
   * @returns Nothing.
   */
  @useAction()
  public del(task: TaskModel) {
    const index = this._items.indexOf(task);
    if (index < 0) return;
    if (task.parent !== this) return;
    this._items.splice(index, 1);
  }
}
