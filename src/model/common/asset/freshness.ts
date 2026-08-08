import {
  Model,
  useAction,
  useMemo,
  useModel,
  useState,
} from 'set-piece';

export type AssetFreshnessProps = {
  loss?: number;
  offset?: number;
  origin?: number;
};

/**
 * Represents an asset's consumable freshness state.
 */
@useModel('asset-freshness')
export class AssetFreshnessModel extends Model {
  @useState()
  private readonly _origin: number;
  @useMemo()
  public get origin() { return this._origin; }

  @useState()
  private readonly _offset: number;
  @useMemo()
  public get offset() { return this._offset; }

  @useState()
  private _loss: number;
  @useMemo()
  public get loss() { return this._loss; }

  @useMemo()
  public get current() {
    return this.origin + this.offset - this.loss;
  }

  /**
   * Create freshness from optional origin, offset, and loss values.
   *
   * @param props - Freshness configuration.
   */
  constructor(props: AssetFreshnessProps = {}) {
    super();
    this._origin = props.origin ?? 0;
    this._offset = props.offset ?? 0;
    this._loss = props.loss ?? 0;
  }

  /**
   * Consume the supplied amount by increasing loss.
   *
   * @param value - Amount to consume.
   * @returns Nothing.
   */
  @useAction()
  public consume(value = 1) {
    this._loss += value;
  }

  /**
   * Restore the supplied amount without allowing loss below zero.
   *
   * @param value - Amount to restore.
   * @returns Nothing.
   */
  @useAction()
  public restore(value: number) {
    this._loss = Math.max(this._loss - value, 0);
  }
}
