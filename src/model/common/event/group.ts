import {
  Model,
  useAction,
  useChild,
  useMemo,
  useModel,
  useStory,
} from 'set-piece';
import { EventModel } from './index';

export type EventsProps = {
  items?: EventModel[];
};

/**
 * Owns the current gameplay events.
 */
@useModel('events')
export class EventsModel extends Model {
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
   * Remove all events from the previous time slice.
   *
   * @returns Nothing.
   */
  @useStory()
  @useAction()
  public proceed() {
    this._items = [];
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
