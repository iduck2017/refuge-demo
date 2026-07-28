import {
  Model,
  routeRegistry,
  TypedPropertyDecorator,
  useAction,
  useChild,
  useMemo,
  useRef,
} from 'set-piece';
import { ItemGroupModel } from '../item/group';
import { RoleStateModel } from './state/index';
import { RoleTraitsModel } from './trait/group';
import type { TaskModel } from '../task/index';

export type RoleProps = {
  items?: ItemGroupModel;
  state?: RoleStateModel;
  task?: TaskModel;
  traits?: RoleTraitsModel;
};

/**
 * Base class for a playable role with inventory, traits, state, and task
 * assignment.
 */
export abstract class RoleModel extends Model {
  @useChild()
  private _items: ItemGroupModel;
  @useMemo()
  public get items() { return this._items; }

  @useChild()
  private _traits: RoleTraitsModel;
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

  @useChild()
  private _state: RoleStateModel;
  @useMemo()
  public get state() { return this._state; }

  /**
   * Create a role with optional custom inventory, traits, task, and state.
   *
   * @param props - Role configuration.
   */
  constructor(props: RoleProps = {}) {
    super();
    this._items = props.items ?? new ItemGroupModel();
    this._traits = props.traits ?? new RoleTraitsModel();
    this._task = props.task;
    this._state = props.state ?? new RoleStateModel();
  }

}

/**
 * Create a property decorator that routes to the nearest role ancestor.
 *
 * @returns Typed decorator for an optional `RoleModel` property.
 */
export function useRole<
  I extends Model & Record<string, any>,
  K extends string,
>(): I[K] extends RoleModel | undefined ?
  TypedPropertyDecorator<I, K> :
  TypedPropertyDecorator<never, never>
{
  return function(prototype: I, key: K) {
    routeRegistry.register(prototype, key, () => RoleModel);
  };
}
