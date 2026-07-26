import {
  Model,
  useMemo,
} from 'set-piece';
import type { EventModel } from '../event/index';
import { GameModel, useGame } from '../game';

export abstract class RuleModel extends Model {
  @useGame()
  private _game?: GameModel;
  @useMemo()
  public get game() { return this._game; }

  public abstract check(): EventModel[] | undefined;
}
