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

/**
 * Owns and evaluates the rules that produce game events.
 */
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

  /**
   * Create a rule collection with optional initial rules.
   *
   * @param props - Initial rule collection.
   */
  constructor(props: RulesProps = {}) {
    super();
    this._items = props.items ?? [];
  }

  /**
   * Evaluate all rules and flatten the events they produce.
   *
   * @returns Events produced by matching rules.
   */
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

  /**
   * Add an unowned rule if it is not already registered.
   *
   * @param rule - Rule to add.
   * @returns Nothing.
   */
  @useAction()
  public add(rule: RuleModel) {
    const exists = this._items.includes(rule);
    const owned = rule.parent === this;
    if (exists && owned) return;
    if (exists || rule.parent) return;
    this._items.push(rule);
  }

  /**
   * Remove a rule owned by this collection.
   *
   * @param rule - Rule to remove.
   * @returns Nothing.
   */
  @useAction()
  public del(rule: RuleModel) {
    const index = this._items.indexOf(rule);
    if (index < 0) return;
    if (rule.parent !== this) return;
    this._items.splice(index, 1);
  }
}
