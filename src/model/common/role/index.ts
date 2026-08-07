import {
  Model,
  routeRegistry,
  TypedPropertyDecorator,
  useAction,
  useChild,
  useMemo,
  useRef,
} from 'set-piece';
import { AssetsModel } from '../asset/group';
import { GatheringModel } from './gathering';
import { SatietyModel } from './satiety';
import { StrengthModel } from './strength';
import { RoleTraitsModel } from './trait/group';
import { VitalityModel } from './vitality';
import type { TaskModel } from '../task/index';

export type RoleProps = {
  assets?: AssetsModel;
  gathering?: GatheringModel;
  satiety?: SatietyModel;
  strength?: StrengthModel;
  task?: TaskModel;
  traits?: RoleTraitsModel;
  vitality?: VitalityModel;
};

/**
 * Base class for a playable role with assets, attributes, states, traits, and
 * task assignment.
 */
export abstract class RoleModel extends Model {
  @useChild()
  private _assets: AssetsModel;
  @useMemo()
  public get assets() { return this._assets; }

  @useChild()
  private _gathering: GatheringModel;
  @useMemo()
  public get gathering() { return this._gathering; }

  @useChild()
  private _satiety: SatietyModel;
  @useMemo()
  public get satiety() { return this._satiety; }

  @useChild()
  private _strength: StrengthModel;
  @useMemo()
  public get strength() { return this._strength; }

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
  private _vitality: VitalityModel;
  @useMemo()
  public get vitality() { return this._vitality; }

  /**
   * Create a role with optional assets, attributes, states, traits, and task.
   *
   * @param props - Role configuration.
   */
  constructor(props: RoleProps = {}) {
    super();
    this._assets = props.assets ?? new AssetsModel();
    this._gathering = props.gathering ?? new GatheringModel();
    this._satiety = props.satiety ?? new SatietyModel({ origin: 10 });
    this._strength = props.strength ?? new StrengthModel();
    this._traits = props.traits ?? new RoleTraitsModel();
    this._task = props.task;
    this._vitality = props.vitality ?? new VitalityModel({ origin: 5 });
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
