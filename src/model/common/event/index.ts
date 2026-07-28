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

/**
 * Base class for descriptive game events routed to their owning game.
 */
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

  /**
   * Create an event with optional display metadata.
   *
   * @param props - Event name and description.
   */
  constructor(props: EventProps = {}) {
    super();
    this._name = props.name ?? '';
    this._desc = props.desc ?? '';
  }
}
