import {
  Model,
  routeRegistry,
  TypedPropertyDecorator,
  useChild,
  useMemo,
  useModel,
} from 'set-piece';
import { RoleAttrsModel } from './attrs/index';
import { RoleStateModel } from './state/index';
import { RoleTraitModel } from './traits/index';
import { StarvationModel } from './traits/starvation';

export type RoleProps = {
  attrs?: RoleAttrsModel;
  state?: RoleStateModel;
  trait?: RoleTraitModel;
};

@useModel('role')
export class RoleModel extends Model {
  @useChild()
  private _trait: RoleTraitModel;
  @useMemo()
  public get trait() { return this._trait; }

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
    if (props.trait) this._trait = props.trait;
    else {
      const starvation = new StarvationModel();
      this._trait = new RoleTraitModel({ traits: [starvation] });
    }
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
