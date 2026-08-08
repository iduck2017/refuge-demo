import {
  Model,
  useChild,
  useMemo,
  useModel,
} from 'set-piece';
import { AssetsModel } from '../asset/group';
import { BreadModel } from '../../assets/bread/index';
import { RegionsModel } from '../../regions/group';
import { TasksModel } from '../task/group';
import { RolesModel } from '../role/group';
import { CalendarModel } from './calendar';
import { EventsModel } from '../event/group';
import { MeatModel } from '../../assets/meat';

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
  private _roles: RolesModel;
  @useMemo()
  public get roles() { return this._roles; }

  @useChild()
  private _assets: AssetsModel;
  @useMemo()
  public get assets() { return this._assets; }

  @useChild()
  private _regions: RegionsModel;
  @useMemo()
  public get regions() { return this._regions; }

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
    this._roles = new RolesModel();
    this._assets = new AssetsModel({
      items: [
        new BreadModel(),
        new MeatModel(),
      ],
    });
    this._regions = new RegionsModel();
    this._tasks = new TasksModel();
  }

}
