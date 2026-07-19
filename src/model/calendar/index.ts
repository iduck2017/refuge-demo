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

export type CalendarProps = {
  date?: number;
  time?: CalendarTime;
  year?: number;
};

export enum CalendarTime {
  Morning = 'morning',
  Evening = 'evening',
}

export enum CalendarSeason {
  Spring = 'spring',
  Winter = 'winter',
}

@useModel('calendar')
export class CalendarModel extends Model {
  @useGame()
  private _game?: GameModel;
  @useMemo()
  public get game() { return this._game; }

  @useState()
  private _date: number;
  @useMemo()
  public get date() { return this._date; }

  @useState()
  private _time: CalendarTime;
  @useMemo()
  public get time() { return this._time; }

  @useState()
  private _year: number;
  @useMemo()
  public get year() { return this._year; }

  @useMemo()
  public get season() {
    if (this.date <= 40) return CalendarSeason.Spring;
    return CalendarSeason.Winter;
  }

  constructor(props: CalendarProps = {}) {
    super();
    this._date = props.date ?? 1;
    this._time = props.time ?? CalendarTime.Morning;
    this._year = props.year ?? 1;
  }

  @useStory()
  @useAction()
  public proceed() {
    const morning = this.time === CalendarTime.Morning;
    if (!morning) this._time = CalendarTime.Morning;
    if (morning) this._time = CalendarTime.Evening;
    if (!morning) {
      const ended = this._date === 60;
      if (!ended) this._date += 1;
      if (ended) this._date = 1;
      if (ended) this._year += 1;
    }
    const event = new TimeProceedEvent();
    this.emit(event);
  }
}
