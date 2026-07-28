import { Model, useMemo, useModel, useState } from 'set-piece';

export type StrengthProps = {
  current?: number;
  origin?: number;
};

/**
 * Stores a role's baseline and current strength values.
 */
@useModel('strength')
export class StrengthModel extends Model {
  @useState()
  private readonly _origin: number;
  @useMemo()
  public get origin() { return this._origin; }

  @useState()
  private _current: number;
  @useMemo()
  public get current() { return this._current; }

  /**
   * Create strength state from optional baseline and current values.
   *
   * @param props - Strength configuration.
   */
  constructor(props: StrengthProps = {}) {
    super();
    const origin = props.origin ?? 0;
    this._origin = origin;
    this._current = props.current ?? origin;
  }
}
