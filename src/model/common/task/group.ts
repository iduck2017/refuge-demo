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

@useModel('tasks')
export class TasksModel extends Model {
  @useChild()
  private _items: TaskModel[];
  @useMemo()
  public get items() { return [...this._items]; }

  constructor(props: TasksProps = {}) {
    super();
    this._items = props.items ?? [];
  }

  @useAction()
  public proceed() {
    this.items.forEach((task) => {
      task.proceed();
    });
  }

  @useAction()
  public add(task: TaskModel) {
    const exists = this._items.includes(task);
    const owned = task.parent === this;
    if (exists && owned) return;
    if (exists || task.parent) return;
    this._items.push(task);
  }

  @useAction()
  public del(task: TaskModel) {
    const index = this._items.indexOf(task);
    if (index < 0) return;
    if (task.parent !== this) return;
    this._items.splice(index, 1);
  }
}
