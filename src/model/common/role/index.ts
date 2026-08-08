import {
  Model,
  useChild,
  useMemo,
  useRef,
  useState,
} from 'set-piece';
import { AssetsModel } from '../asset/group';
import { TraitsModel } from '../trait/group';
import { RoleAttrsModel } from './attrs/index';
import { RoleStateModel } from './state/index';
import type { RoleTraitModel } from './trait/index';
import { RoleStarvationModel } from './trait/starvation';
import type { TaskModel } from '../task/index';

export type RoleProps = {
  assets?: AssetsModel;
  attrs?: RoleAttrsModel;
  desc?: string;
  name?: string;
  state?: RoleStateModel;
  task?: TaskModel;
  traits?: RoleTraitModel[];
};

/**
 * Base class for a playable role with assets, attrs, states, traits, and
 * task assignment.
 */
export abstract class RoleModel extends Model {
  @useState()
  private _name: string;
  @useMemo()
  public get name() { return this._name; }

  @useState()
  private _desc: string;
  @useMemo()
  public get desc() { return this._desc; }

  @useChild()
  private _assets: AssetsModel;
  @useMemo()
  public get assets() { return this._assets; }

  @useChild()
  private _attrs: RoleAttrsModel;
  @useMemo()
  public get attrs() { return this._attrs; }

  @useChild()
  private _state: RoleStateModel;
  @useMemo()
  public get state() { return this._state; }

  @useChild()
  private _traits: TraitsModel;
  @useMemo()
  public get traits() { return this._traits; }

  @useRef()
  private _task?: TaskModel;
  @useMemo()
  public get task() { return this._task; }

  public set task(task: TaskModel | undefined) {
    const current = this._task;
    if (current === task) return;
    this._task = task;
  }

  /**
   * Create a role with optional display metadata, assets, attrs, states,
   * traits, and task.
   *
   * @param props - Role configuration.
   */
  constructor(props: RoleProps = {}) {
    super();
    this._name = props.name ?? '';
    this._desc = props.desc ?? '';
    this._assets = props.assets ?? new AssetsModel();
    this._attrs = props.attrs ?? new RoleAttrsModel();
    this._state = props.state ?? new RoleStateModel();
    this._traits = new TraitsModel({
      items: [
        new RoleStarvationModel(),
        ...(props.traits ?? []),
      ],
    });
    this._task = props.task;
  }

}
