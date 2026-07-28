import { Model, useAction, useMemo, useModel, useState } from 'set-piece';

export type NutritionProps = {
  offset?: number;
  maximum?: number;
};

/**
 * Tracks a role's available nutrition as maximum value minus depletion.
 */
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

  /**
   * Create nutrition state with optional capacity and depletion.
   *
   * @param props - Nutrition configuration.
   */
  constructor(props: NutritionProps = {}) {
    super();
    const maximum = props.maximum ?? 10;
    this._maximum = maximum;
    this._offset = props.offset ?? 0;
  }

  /**
   * Consume one unit of nutrition.
   *
   * @returns Nothing.
   */
  @useAction()
  public consume() {
    this._offset += 1;
  }

  /**
   * Restore nutrition without allowing depletion to fall below zero.
   *
   * @param value - Amount of nutrition to restore.
   * @returns Nothing.
   */
  @useAction()
  public restore(value: number) {
    const next = this._offset - value;
    this._offset = Math.max(next, 0);
  }
}
