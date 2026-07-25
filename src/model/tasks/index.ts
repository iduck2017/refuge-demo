import {
  Model,
  routeRegistry,
  TypedPropertyDecorator,
  useChild,
  useMemo,
  useRef,
  useState,
} from 'set-piece';
import { GameModel, useGame } from '../game';
import type { RoleModel } from '../roles/index';
import { TaskTraitsModel } from './traits/group';
import { TaskPriorModel } from './task-prior/index';

export type TaskProps = {
  actived?: boolean;
  desc?: string;
  name?: string;
  prior?: TaskPriorModel;
  roles?: RoleModel[];
  traits?: TaskTraitsModel;
};

export abstract class TaskModel extends Model {
  @useGame()
  private _game?: GameModel;
  @useMemo()
  public get game() { return this._game; }

  @useRef()
  private _roles?: RoleModel[];
  @useMemo()
  public get roles() { return [...this._roles ?? []]; }

  @useChild()
  private _traits: TaskTraitsModel;
  @useMemo()
  public get traits() { return this._traits; }

  @useState()
  private _name: string;
  @useMemo()
  public get name() { return this._name; }

  @useState()
  private _desc: string;
  @useMemo()
  public get desc() { return this._desc; }

  @useState()
  protected _actived: boolean;
  @useMemo()
  public get actived() {
    const traits = this.traits.traits;
    return this._actived && traits.every(
      (trait) => trait.actived,
    );
  }

  @useChild()
  private _prior: TaskPriorModel;
  @useMemo()
  public get prior() { return this._prior; }

  constructor(props: TaskProps = {}) {
    super();
    this._roles = props.roles ?? [];
    this._traits = props.traits ?? new TaskTraitsModel();
    this._name = props.name ?? '';
    this._desc = props.desc ?? '';
    this._actived = props.actived ?? true;
    this._prior = props.prior ?? new TaskPriorModel();
  }
}

export function useTask<
  I extends Model & Record<string, any>,
  K extends string,
>(): I[K] extends TaskModel | undefined ?
  TypedPropertyDecorator<I, K> :
  TypedPropertyDecorator<never, never>
{
  return function(prototype: I, key: K) {
    routeRegistry.register(prototype, key, () => TaskModel);
  };
}
