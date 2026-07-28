import {
  Model,
  useMemo,
} from 'set-piece';
import { TaskModel, useTask } from '../index';
import { TraitModel, TraitProps } from '../../trait/index';

export type TaskTraitProps = TraitProps;

/**
 * Base class for traits routed to their owning task.
 */
export abstract class TaskTraitModel extends TraitModel {
  @useTask()
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
