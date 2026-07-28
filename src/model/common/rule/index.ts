import {
  Model,
  useMemo,
} from 'set-piece';
import type { EventModel } from '../event/index';
import { GameModel, useGame } from '../game';

/**
 * Base class for game-routed rules that derive zero or more events.
 */
export abstract class RuleModel extends Model {
  @useGame()
  private _game?: GameModel;
  @useMemo()
  public get game() { return this._game; }

  /**
   * Evaluate this rule against current game state.
   *
   * @returns Produced events, or `undefined` when the rule does not match.
   */
  public abstract check(): EventModel[] | undefined;
}
