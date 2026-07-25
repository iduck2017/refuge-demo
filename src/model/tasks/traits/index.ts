import {
  Model,
  useMemo,
} from 'set-piece';
import { TaskModel, useTask } from '../index';
import { TraitModel, TraitProps } from '../../traits/index';

export type TaskTraitProps = TraitProps;

export abstract class TaskTraitModel extends TraitModel {
  @useTask()
  private _task?: TaskModel;
  @useMemo()
  public get task() { return this._task; }

  constructor(props: TaskTraitProps = {}) {
    super(props);
  }
}
