import {
  Model,
  useAction,
  useMemo,
  useModel,
  useState,
  useStory,
} from 'set-piece';
import { GameModel, useGame } from '../game';
import { TimeProceedEvent } from './use-time-proceed';

export enum CalendarTime {
  Morning = 'morning',
  Evening = 'evening',
}

export enum CalendarSeason {
  Spring = 'spring',
  Winter = 'winter',
}

/**
 * Tracks the current half-day and derives calendar date, time, year, and
 * season values.
 */
@useModel('calendar')
export class CalendarModel extends Model {
  @useGame()
  private _game?: GameModel;
  @useMemo()
  public get game() { return this._game; }

  @useState()
  private _current: number;
  @useMemo()
  public get current() { return this._current; }

  @useMemo()
  public get date() {
    const index = Math.floor((this.current - 1) / 2);
    return index % 60 + 1;
  }

  @useMemo()
  public get time() {
    const morning = this.current % 2 === 1;
    if (morning) return CalendarTime.Morning;
    return CalendarTime.Evening;
  }

  @useMemo()
  public get year() {
    const index = Math.floor((this.current - 1) / 120);
    return index + 1;
  }

  @useMemo()
  public get season() {
    if (this.date <= 40) return CalendarSeason.Spring;
    return CalendarSeason.Winter;
  }

  /**
   * Create a calendar at the first morning of the first year.
   */
  constructor() {
    super();
    this._current = 1;
  }

  /**
   * Advance all time-sensitive systems through one half-day.
   *
   * @returns Nothing.
   */
  public proceed() {
    const game = this.game;
    game?.flock.proceed();
    game?.tasks.proceed();
    this._proceed();
    game?.events.proceed();
  }

  /**
   * Increment calendar state and emit the time-proceeded event.
   *
   * @returns Nothing.
   */
  @useStory()
  @useAction()
  protected _proceed() {
    this._current += 1;
    const event = new TimeProceedEvent();
    this.emit(event);
  }

}
