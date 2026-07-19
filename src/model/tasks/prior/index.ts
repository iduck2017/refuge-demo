import { Model, useMemo, useModel, useState } from 'set-piece';

export type PriorProps = {
  current?: number;
  origin?: number;
};

@useModel('prior')
export class PriorModel extends Model {
  @useState()
  private readonly _origin: number;
  @useMemo()
  public get origin() { return this._origin; }

  @useState()
  private _current: number;
  @useMemo()
  public get current() { return this._current; }

  constructor(props: PriorProps = {}) {
    super();
    const origin = props.origin ?? 0;
    this._origin = origin;
    this._current = props.current ?? origin;
  }
}
