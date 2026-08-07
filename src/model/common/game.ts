import {
  Model,
  routeRegistry,
  TypedPropertyDecorator,
  useAction,
  useChild,
  useMemo,
  useModel,
} from 'set-piece';
import { AssetsModel } from './asset/group';
import { BreadModel } from '../assets/bread/index';
import { RegionsModel } from '../regions/group';
import { TasksModel } from './task/group';
import { FlockModel } from './role/flock';
import { CalendarModel } from './calendar/index';
import { EventsModel } from './event/group';
import { RulesModel } from './rule/group';
import { MeatModel } from '../assets/meat';

/**
 * Aggregates all top-level domain collections and services for one game.
 */
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
  private _assets: AssetsModel;
  @useMemo()
  public get assets() { return this._assets; }

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

  /**
   * Create a game with its default calendar, collections, regions, and assets.
   */
  constructor() {
    super();
    this._calendar = new CalendarModel();
    this._events = new EventsModel();
    this._flock = new FlockModel();
    this._assets = new AssetsModel({
      items: [
        new BreadModel(),
        new MeatModel(),
      ],
    });
    this._regions = new RegionsModel();
    this._rules = new RulesModel();
    this._tasks = new TasksModel();
  }

}

/**
 * Create a property decorator that routes to the nearest game ancestor.
 *
 * @returns Typed decorator for an optional `GameModel` property.
 */
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
