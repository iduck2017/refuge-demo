import { useModel } from 'set-piece';
import {
  TimeProceedEvent,
  useTimeProceed,
} from '../../../hooks/use-time-proceed';
import { CalendarSeason } from '../../common/game/calendar';
import { TraitModel } from '../../common/trait';
import { WildFruitSeasonEventModel } from './index';

/**
 * Adds a wild fruit event when the forest is harvestable.
 */
@useModel('wild-fruit-season-trait')
export class WildFruitSeasonTraitModel extends TraitModel {
  /**
   * Add a wild fruit event during spring days 15 through 25.
   *
   * @param _event - Time-proceed event that triggered the check.
   * @returns Nothing.
   */
  @useTimeProceed()
  protected handleTimeProceed(_event: TimeProceedEvent) {
    const game = this.game;
    if (!game) return;
    const calendar = game.calendar;
    const spring = calendar.season === CalendarSeason.Spring;
    const started = calendar.date >= 15;
    const ended = calendar.date > 25;
    if (!spring || !started || ended) return;
    game.events.add(new WildFruitSeasonEventModel());
  }
}
