import {
  useMemo,
} from 'set-piece';
import { useTaskRoute } from '../../../../hooks/use-task-route';
import { TaskModel } from '../index';
import { TraitModel, TraitProps } from '../../trait';

export type TaskTraitProps = TraitProps;

/**
 * Base class for traits routed to their owning task.
 */
export abstract class TaskTraitModel extends TraitModel {
  @useTaskRoute()
  private _task?: TaskModel;
  @useMemo()
  public get task() { return this._task; }

  /**
   * Create a task trait with optional activation state.
   *
   * @param props - Task trait configuration.
   */
  constructor(props: TaskTraitProps = {}) {
    super(props);
  }
}
