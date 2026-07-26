import { useModel } from 'set-piece';
import { CalendarSeason } from '../../common/calendar/index';
import { RuleModel } from '../../common/rule/index';
import { WildFruitSeasonEventModel } from './event';

@useModel('wild-fruit-season-rule')
export class WildFruitSeasonRuleModel extends RuleModel {
  public check() {
    const calendar = this.game?.calendar;
    const season = calendar?.season;
    const date = calendar?.date ?? 0;
    const spring = season === CalendarSeason.Spring;
    const started = date >= 15;
    const ended = date > 25;
    if (!spring || !started || ended) return;
    return [new WildFruitSeasonEventModel()];
  }
}
