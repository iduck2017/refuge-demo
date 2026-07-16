import { Model, useAction, useChild, useMemo, useModel } from 'set-piece';
import { TaskModel } from './task';

export type TasksProps = {
  tasks?: TaskModel[];
};

@useModel('tasks')
export class TasksModel extends Model {
  @useChild()
  private _tasks: TaskModel[];
  @useMemo()
  public get tasks() { return [...this._tasks]; }

  constructor(props: TasksProps = {}) {
    super();
    this._tasks = props.tasks ?? [];
  }

  @useAction()
  public add(task: TaskModel) {
    const exists = this._tasks.includes(task);
    const owned = task.parent === this;
    if (exists && owned) return;
    if (exists || task.parent) return;
    this._tasks.push(task);
  }

  @useAction()
  public remove(task: TaskModel) {
    const index = this._tasks.indexOf(task);
    if (index < 0) return;
    if (task.parent !== this) return;
    this._tasks.splice(index, 1);
  }
}
