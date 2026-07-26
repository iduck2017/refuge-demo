import {
  Model,
  useMemo,
  useState,
} from 'set-piece';
import { GameModel, useGame } from '../game';

export type EventProps = {
  desc?: string;
  name?: string;
};

export abstract class EventModel extends Model {
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

  constructor(props: EventProps = {}) {
    super();
    this._name = props.name ?? '';
    this._desc = props.desc ?? '';
  }
}
