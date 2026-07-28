import {
  Model,
  useAction,
  useChild,
  useMemo,
  useModel,
} from 'set-piece';
import { GameModel, useGame } from '../game';
import { EventModel } from './index';

export type EventsProps = {
  items?: EventModel[];
};

/**
 * Owns the game events currently produced by active rules.
 */
@useModel('events')
export class EventsModel extends Model {
  @useGame()
  private _game?: GameModel;
  @useMemo()
  public get game() { return this._game; }

  @useChild()
  private _items: EventModel[];
  @useMemo()
  public get items() { return [...this._items]; }

  /**
   * Create an event collection with optional initial events.
   *
   * @param props - Initial event collection.
   */
  constructor(props: EventsProps = {}) {
    super();
    this._items = props.items ?? [];
  }

  /**
   * Replace current events with the results of checking all game rules.
   *
   * @returns Nothing.
   */
  @useAction()
  public proceed() {
    const items = this.game?.rules.check() ?? [];
    this._items = [...items];
  }

  /**
   * Add an unowned event if it is not already in the collection.
   *
   * @param event - Event to add.
   * @returns Nothing.
   */
  @useAction()
  public add(event: EventModel) {
    const exists = this._items.includes(event);
    const owned = event.parent === this;
    if (exists && owned) return;
    if (exists || event.parent) return;
    this._items.push(event);
  }

  /**
   * Remove an event owned by this collection.
   *
   * @param event - Event to remove.
   * @returns Nothing.
   */
  @useAction()
  public del(event: EventModel) {
    const index = this._items.indexOf(event);
    if (index < 0) return;
    if (event.parent !== this) return;
    this._items.splice(index, 1);
  }
}
