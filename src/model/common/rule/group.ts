import {
  Model,
  useAction,
  useChild,
  useMemo,
  useModel,
} from 'set-piece';
import type { EventModel } from '../event/index';
import { GameModel, useGame } from '../game';
import { RuleModel } from './index';

export type RulesProps = {
  items?: RuleModel[];
};

@useModel('rules')
export class RulesModel extends Model {
  @useGame()
  private _game?: GameModel;
  @useMemo()
  public get game() { return this._game; }

  @useChild()
  private _items: RuleModel[];
  @useMemo()
  public get items() { return [...this._items]; }

  constructor(props: RulesProps = {}) {
    super();
    this._items = props.items ?? [];
  }

  @useAction()
  public check() {
    const events: EventModel[] = [];
    this.items.forEach((rule) => {
      const found = rule.check();
      if (!found) return;
      events.push(...found);
    });
    return events;
  }

  @useAction()
  public add(rule: RuleModel) {
    const exists = this._items.includes(rule);
    const owned = rule.parent === this;
    if (exists && owned) return;
    if (exists || rule.parent) return;
    this._items.push(rule);
  }

  @useAction()
  public del(rule: RuleModel) {
    const index = this._items.indexOf(rule);
    if (index < 0) return;
    if (rule.parent !== this) return;
    this._items.splice(index, 1);
  }
}
