import {
  Model,
  useDecorProducer,
  useMemo,
  useState,
} from 'set-piece';
import { GameModel, useGame } from '../game';
import { TraitActivedDecor } from './use-trait-actived';

export type TraitProps = {
  actived?: boolean;
};

/**
 * Base class for game-routed behaviors that can be activated or disabled.
 */
export abstract class TraitModel extends Model {
  @useGame()
  private _game?: GameModel;
  @useMemo()
  public get game() { return this._game; }

  @useDecorProducer(() => TraitActivedDecor)
  @useState()
  protected _actived: boolean;
  @useMemo()
  public get actived() { return this._actived; }

  /**
   * Create a trait with optional activation state.
   *
   * @param props - Trait configuration.
   */
  constructor(props: TraitProps = {}) {
    super();
    this._actived = props.actived ?? true;
  }
}
