import {
  Model,
  useAction,
  useMemo,
  useModel,
  useState,
  useStory,
} from 'set-piece';
import { GameModel, useGame } from '../game';
import { DayEndEvent } from './use-day-end';

export type TimerProps = {
  current?: number;
};

@useModel('timer')
export class TimerModel extends Model {
  @useGame()
  private _game?: GameModel;
  @useMemo()
  public get game() { return this._game; }

  @useState()
  private _current: number;
  @useMemo()
  public get current() { return this._current; }

  constructor(props: TimerProps = {}) {
    super();
    this._current = props.current ?? 0;
  }

  public proceed() {
    this.end()
    this.start();
  }

  @useAction()
  @useStory()
  protected start() {
    this.game?.team.roles.forEach(role => {
      role.state.nutrition.consume(1);
    });
  }

  @useAction()
  @useStory()
  protected end() {
    this._current += 1;
    const event = new DayEndEvent();
    this.emit(event);
  }
}
