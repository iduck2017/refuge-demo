import { Model, useChild, useMemo, useModel } from 'set-piece';
import { GameModel } from './model/common/game';
import { AppView } from './views/app';

export type AppProps = {
  game?: GameModel;
  view?: AppView;
};

@useModel('app')
export class AppModel extends Model {
  @useChild()
  private _game: GameModel;
  @useMemo()
  public get game() { return this._game; }

  @useChild()
  private _view?: AppView;
  @useMemo()
  public get view() { return this._view; }

  constructor(props: AppProps = {}) {
    super();
    this._game = props.game ?? new GameModel();
    this._view = props.view;
  }
}
