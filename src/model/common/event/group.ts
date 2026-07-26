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

  constructor(props: EventsProps = {}) {
    super();
    this._items = props.items ?? [];
  }

  @useAction()
  public proceed() {
    const items = this.game?.rules.check() ?? [];
    this._items = [...items];
  }

  @useAction()
  public add(event: EventModel) {
    const exists = this._items.includes(event);
    const owned = event.parent === this;
    if (exists && owned) return;
    if (exists || event.parent) return;
    this._items.push(event);
  }

  @useAction()
  public del(event: EventModel) {
    const index = this._items.indexOf(event);
    if (index < 0) return;
    if (event.parent !== this) return;
    this._items.splice(index, 1);
  }
}
