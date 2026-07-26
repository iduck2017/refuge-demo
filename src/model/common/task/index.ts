import {
  Model,
  routeRegistry,
  TypedPropertyDecorator,
  useAction,
  useChild,
  useMemo,
  useRef,
} from 'set-piece';
import { GameModel, useGame } from '../game';
import type { RoleModel } from '../role/index';
import { TaskTraitsModel } from './traits/group';
import { TaskPriorModel } from './prior/index';

export type TaskProps = {
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

  @useChild()
  private _prior: TaskPriorModel;
  @useMemo()
  public get prior() { return this._prior; }

  constructor(props: TaskProps = {}) {
    super();
    this._roles = props.roles ?? [];
    this._traits = props.traits ?? new TaskTraitsModel();
    this._prior = props.prior ?? new TaskPriorModel();
  }

  public abstract proceed(): void;

  @useAction()
  public bind(roles: RoleModel[]) {
    if (!this._roles) this._roles = [];
    roles.forEach((role) => {
      if (role.task) return;
      const exists = this._roles?.includes(role);
      if (!exists) this._roles?.push(role);
      role.task = this;
    });
  }

  @useAction()
  public unbind(roles: RoleModel[]) {
    if (!this._roles) this._roles = [];
    roles.forEach((role) => {
      if (role.task !== this) return;
      const index = this._roles?.indexOf(role) ?? -1;
      if (index >= 0) this._roles?.splice(index, 1);
      role.task = undefined;
    });
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
