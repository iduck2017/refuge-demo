import {
  Model,
  NumDecor,
  useDecorProducer,
  useMemo,
  useState,
} from 'set-piece';

export type AttrProps = {
  offset?: number;
  origin?: number;
};

/**
 * Numeric decoration applied to an attr offset.
 */
export class AttrOffsetDecor extends NumDecor {}

/**
 * Base class for numeric attrs that are modified but not consumed.
 */
export abstract class AttrModel extends Model {
  @useState()
  protected readonly _origin: number;
  @useMemo()
  public get origin() { return this._origin; }

  @useDecorProducer(() => AttrOffsetDecor)
  @useState()
  protected readonly _offset: number;
  @useMemo()
  public get offset() { return this._offset; }

  @useMemo()
  public get current() {
    return this.origin + this.offset;
  }

  /**
   * Create an attr from optional origin and offset values.
   *
   * @param props - Attr configuration.
   */
  constructor(props: AttrProps = {}) {
    super();
    this._origin = props.origin ?? 0;
    this._offset = props.offset ?? 0;
  }
}
