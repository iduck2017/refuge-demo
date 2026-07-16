import {
  Model,
  routeRegistry,
  TypedPropertyDecorator,
  useChild,
  useMemo,
  useModel,
} from 'set-piece';
import { InventoryModel } from './inventory';
import { RegionsModel } from './regions';
import { SignsModel } from './signs';
import { TasksModel } from './tasks';
import { TeamModel } from './team';
import { TimerModel } from './timer';

export type GameProps = {
  inventory?: InventoryModel;
  regions?: RegionsModel;
  signs?: SignsModel;
  tasks?: TasksModel;
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
  private _regions: RegionsModel;
  @useMemo()
  public get regions() { return this._regions; }

  @useChild()
  private _signs: SignsModel;
  @useMemo()
  public get signs() { return this._signs; }

  @useChild()
  private _tasks: TasksModel;
  @useMemo()
  public get tasks() { return this._tasks; }

  @useChild()
  private _timer: TimerModel;
  @useMemo()
  public get timer() { return this._timer; }

  constructor(props: GameProps = {}) {
    super();
    this._team = props.team ?? new TeamModel();
    this._inventory = props.inventory ?? new InventoryModel();
    this._regions = props.regions ?? new RegionsModel();
    this._signs = props.signs ?? new SignsModel();
    this._tasks = props.tasks ?? new TasksModel();
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
