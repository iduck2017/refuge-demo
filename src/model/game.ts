import {
  Model,
  routeRegistry,
  TypedPropertyDecorator,
  useChild,
  useMemo,
  useModel,
} from 'set-piece';
import { InventoryModel } from './inventory';
import { RegionsModel } from './regions/group';
import { TasksModel } from './tasks/group';
import { TeamModel } from './team';
import { CalendarModel } from './calendar/index';

export type GameProps = {
  calendar?: CalendarModel;
  inventory?: InventoryModel;
  regions?: RegionsModel;
  tasks?: TasksModel;
  team?: TeamModel;
};

@useModel('game')
export class GameModel extends Model {
  @useChild()
  private _calendar: CalendarModel;
  @useMemo()
  public get calendar() { return this._calendar; }

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
  private _tasks: TasksModel;
  @useMemo()
  public get tasks() { return this._tasks; }

  constructor(props: GameProps = {}) {
    super();
    this._calendar = props.calendar ?? new CalendarModel();
    this._team = props.team ?? new TeamModel();
    this._inventory = props.inventory ?? new InventoryModel();
    this._regions = props.regions ?? new RegionsModel();
    this._tasks = props.tasks ?? new TasksModel();
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
