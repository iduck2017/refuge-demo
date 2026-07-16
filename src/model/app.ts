import { Model, useChild, useMemo, useModel } from 'set-piece';
import { GameModel } from './game';

export type AppProps = {
  game?: GameModel;
};

@useModel('app')
export class AppModel extends Model {
  @useChild()
  private _game: GameModel;
  @useMemo()
  public get game() { return this._game; }

  constructor(props: AppProps = {}) {
    super();
    this._game = props.game ?? new GameModel();
  }
}
