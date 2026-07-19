import { useAction, useModel } from 'set-piece';
import { CalendarSeason } from '../../calendar/index';
import { useTimeProceed } from '../../calendar/use-time-proceed';
import type { TimeProceedEvent } from '../../calendar/use-time-proceed';
import { TaskModel, TaskProps } from '../index';
import { PriorModel } from '../prior';

export type WildFruitSeasonTaskProps = TaskProps;

@useModel('wild-fruit-season-task')
export class WildFruitSeasonTaskModel extends TaskModel {
  constructor(props: WildFruitSeasonTaskProps = {}) {
    super({
      ...props,
      actived: props.actived ?? false,
      desc: props.desc ?? 'In the heart of spring, sloe branches darken with fruit for careful hands.',
      name: props.name ?? 'Sloe harvest',
      prior: new PriorModel({ origin: 1 }),
    });
  }

  @useTimeProceed()
  @useAction()
  protected handleTimeProceed(_event: TimeProceedEvent) {
    const game = this.game;
    const calendar = game?.calendar;
    const season = calendar?.season;
    const date = calendar?.date ?? 0;
    const spring = season === CalendarSeason.Spring;
    const started = date >= 15;
    const ended = date > 25;
    this._actived = spring && started && !ended;
  }
}
