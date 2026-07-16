import {
  Model,
  routeRegistry,
  TypedPropertyDecorator,
  useChild,
  useMemo,
} from 'set-piece';
import { RoleAttrsModel } from './roles/attrs/index';
import { RoleStateModel } from './roles/state/index';
import { TraitsModel } from './traits';

export type RoleProps = {
  attrs?: RoleAttrsModel;
  state?: RoleStateModel;
  traits?: TraitsModel;
};

export abstract class RoleModel extends Model {
  @useChild()
  private _traits?: TraitsModel;
  @useMemo()
  public get traits() { return this._traits; }

  @useChild()
  private _attrs: RoleAttrsModel;
  @useMemo()
  public get attrs() { return this._attrs; }

  @useChild()
  private _state: RoleStateModel;
  @useMemo()
  public get state() { return this._state; }

  constructor(props: RoleProps = {}) {
    super();
    this._traits = props.traits;
    this._attrs = props.attrs ?? new RoleAttrsModel();
    this._state = props.state ?? new RoleStateModel();
  }

}

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
