import { useAction, useModel } from 'set-piece';
import { CalendarSeason } from '../../calendar/index';
import type { TimeProceedEvent } from '../../calendar/use-time-proceed';
import { TaskTraitModel } from '../traits/index';
import { useTaskTimeProceed } from '../use-time-proceed';

@useModel('wild-fruit-season-trait')
export class WildFruitSeasonTraitModel extends TaskTraitModel {
  constructor() {
    super({ actived: false });
  }

  @useTaskTimeProceed()
  @useAction()
  protected handleTimeProceed(_event: TimeProceedEvent) {
    const calendar = this.game?.calendar;
    const season = calendar?.season;
    const date = calendar?.date ?? 0;
    const spring = season === CalendarSeason.Spring;
    const started = date >= 15;
    const ended = date > 25;
    this._actived = spring && started && !ended;
  }
}
