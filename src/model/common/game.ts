import {
  Model,
  routeRegistry,
  TypedPropertyDecorator,
  useAction,
  useChild,
  useMemo,
  useModel,
} from 'set-piece';
import { InventoryModel } from './item/inventory';
import { RegionsModel } from '../regions/group';
import { TasksModel } from './task/group';
import { FlockModel } from './role/flock';
import { CalendarModel } from './calendar/index';
import { EventsModel } from './event/group';
import { RulesModel } from './rule/group';

@useModel('game')
export class GameModel extends Model {
  @useChild()
  private _calendar: CalendarModel;
  @useMemo()
  public get calendar() { return this._calendar; }

  @useChild()
  private _events: EventsModel;
  @useMemo()
  public get events() { return this._events; }

  @useChild()
  private _flock: FlockModel;
  @useMemo()
  public get flock() { return this._flock; }

  @useChild()
  private _inventory: InventoryModel;
  @useMemo()
  public get inventory() { return this._inventory; }

  @useChild()
  private _regions: RegionsModel;
  @useMemo()
  public get regions() { return this._regions; }

  @useChild()
  private _rules: RulesModel;
  @useMemo()
  public get rules() { return this._rules; }

  @useChild()
  private _tasks: TasksModel;
  @useMemo()
  public get tasks() { return this._tasks; }

  constructor() {
    super();
    this._calendar = new CalendarModel();
    this._events = new EventsModel();
    this._flock = new FlockModel();
    this._inventory = new InventoryModel();
    this._regions = new RegionsModel();
    this._rules = new RulesModel();
    this._tasks = new TasksModel();
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
