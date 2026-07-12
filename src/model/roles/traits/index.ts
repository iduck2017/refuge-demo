import {
  Model,
  useAction,
  useChild,
  useMemo,
  useModel,
  useState,
} from 'set-piece';
import { GameModel, useGame } from '../../game';
import { RoleModel, useRole } from '../index';

export type RoleTraitProps = {
  actived?: boolean;
  traits?: RoleTraitModel[];
};

@useModel('role-trait')
export class RoleTraitModel extends Model {
  @useGame()
  private _game?: GameModel;
  @useMemo()
  public get game() { return this._game; }

  @useRole()
  private _role?: RoleModel;
  @useMemo()
  public get role() { return this._role; }

  @useState()
  private _actived: boolean;
  @useMemo()
  public get actived() { return this._actived; }

  @useChild()
  private _traits: RoleTraitModel[];
  @useMemo()
  public get traits() { return [...this._traits]; }

  constructor(props: RoleTraitProps = {}) {
    super();
    this._actived = props.actived ?? true;
    this._traits = props.traits ?? [];
  }

  @useAction()
  public add(trait: RoleTraitModel) {
    const exists = this._traits.includes(trait);
    const owned = trait.parent === this;
    if (exists && owned) return;
    if (exists || trait.parent) return;
    this._traits.push(trait);
  }

  @useAction()
  public remove(trait: RoleTraitModel) {
    const index = this._traits.indexOf(trait);
    if (index < 0) return;
    if (trait.parent !== this) return;
    this._traits.splice(index, 1);
  }
}
