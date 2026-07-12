import { Model, useAction, useMemo, useModel, useState } from 'set-piece';

export type NutritionProps = {
  offset?: number;
  maximum?: number;
};

@useModel('nutrition')
export class NutritionModel extends Model {
  @useState()
  private readonly _maximum: number;
  @useMemo()
  public get maximum() { return this._maximum; }

  @useState()
  private _offset: number;
  @useMemo()
  public get current() { return this.maximum - this._offset; }

  constructor(props: NutritionProps = {}) {
    super();
    const maximum = props.maximum ?? 5;
    this._maximum = maximum;
    this._offset = props.offset ?? 0;
  }

  @useAction()
  public consume(value: number) {
    this._offset += value;
  }

  @useAction()
  public restore(value: number) {
    const next = this._offset - value;
    this._offset = Math.max(next, 0);
  }
}
