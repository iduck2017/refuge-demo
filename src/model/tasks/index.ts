import { Model, useChild, useMemo, useState } from 'set-piece';
import { GameModel, useGame } from '../game';
import { PriorModel } from './prior/index';

export type TaskProps = {
  actived?: boolean;
  desc?: string;
  name?: string;
  prior?: PriorModel;
};

export abstract class TaskModel extends Model {
  @useGame()
  private _game?: GameModel;
  @useMemo()
  public get game() { return this._game; }

  @useState()
  private _name: string;
  @useMemo()
  public get name() { return this._name; }

  @useState()
  private _desc: string;
  @useMemo()
  public get desc() { return this._desc; }

  @useState()
  protected _actived: boolean;
  @useMemo()
  public get actived() { return this._actived; }

  @useChild()
  private _prior: PriorModel;
  @useMemo()
  public get prior() { return this._prior; }

  constructor(props: TaskProps = {}) {
    super();
    this._name = props.name ?? '';
    this._desc = props.desc ?? '';
    this._actived = props.actived ?? true;
    this._prior = props.prior ?? new PriorModel();
  }
}
