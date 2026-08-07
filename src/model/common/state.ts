import {
  Model,
  NumDecor,
  useAction,
  useDecorProducer,
  useMemo,
  useState,
} from 'set-piece';

export type StateProps = {
  loss?: number;
  offset?: number;
  origin?: number;
};

/**
 * Numeric decoration applied to a state offset.
 */
export class StateOffsetDecor extends NumDecor {}

/**
 * Base class for numeric states consumed by accumulating loss.
 */
export abstract class StateModel extends Model {
  @useState()
  protected readonly _origin: number;
  @useMemo()
  public get origin() { return this._origin; }

  @useDecorProducer(() => StateOffsetDecor)
  @useState()
  protected readonly _offset: number;
  @useMemo()
  public get offset() { return this._offset; }

  @useState()
  protected _loss: number;
  @useMemo()
  public get loss() { return this._loss; }

  @useMemo()
  public get current() {
    return this.origin + this.offset - this.loss;
  }

  /**
   * Create a consumable state from optional origin, offset, and loss values.
   *
   * @param props - State configuration.
   */
  constructor(props: StateProps = {}) {
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
