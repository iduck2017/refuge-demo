import {
  Model,
  routeRegistry,
  TypedPropertyDecorator,
  useChild,
  useMemo,
  useModel,
} from 'set-piece';
import { InventoryModel } from './inventory';
import { TeamModel } from './team';
import { TimerModel } from './timer';

export type GameProps = {
  inventory?: InventoryModel;
  team?: TeamModel;
  timer?: TimerModel;
};

@useModel('game')
export class GameModel extends Model {
  @useChild()
  private _team: TeamModel;
  @useMemo()
  public get team() { return this._team; }

  @useChild()
  private _inventory: InventoryModel;
  @useMemo()
  public get inventory() { return this._inventory; }

  @useChild()
  private _timer: TimerModel;
  @useMemo()
  public get timer() { return this._timer; }

  constructor(props: GameProps = {}) {
    super();
    this._team = props.team ?? new TeamModel();
    this._inventory = props.inventory ?? new InventoryModel();
    this._timer = props.timer ?? new TimerModel();
  }
}

export function useGame<
  I extends Model & Record<string, any>,
  K extends string,
>(): I[K] extends GameModel | undefined ?
  TypedPropertyDecorator<I, K> :
  TypedPropertyDecorator<never, never>
{
  return function(prototype: I, key: K) {
    routeRegistry.register(prototype, key, () => GameModel);
  };
}
