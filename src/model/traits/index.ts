import {
  Model,
  useAction,
  useChild,
  useMemo,
  useState,
} from 'set-piece';
import { GameModel, useGame } from '../game';

export type TraitProps = {
  actived?: boolean;
  traits?: TraitModel[];
};

export abstract class TraitModel extends Model {
  @useGame()
  private _game?: GameModel;
  @useMemo()
  public get game() { return this._game; }

  @useState()
  private _actived: boolean;
  @useMemo()
  public get actived() { return this._actived; }

  @useChild()
  private _traits: TraitModel[];
  @useMemo()
  public get traits() { return [...this._traits]; }

  constructor(props: TraitProps = {}) {
    super();
    this._actived = props.actived ?? true;
    this._traits = props.traits ?? [];
  }

  @useAction()
  public add(trait: TraitModel) {
    const exists = this._traits.includes(trait);
    const owned = trait.parent === this;
    if (exists && owned) return;
    if (exists || trait.parent) return;
    this._traits.push(trait);
  }

  @useAction()
  public remove(trait: TraitModel) {
    const index = this._traits.indexOf(trait);
    if (index < 0) return;
    if (trait.parent !== this) return;
    this._traits.splice(index, 1);
  }
}
