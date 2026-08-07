import {
  Model,
  NumDecor,
  useDecorProducer,
  useMemo,
  useState,
} from 'set-piece';

export type AttributeProps = {
  offset?: number;
  origin?: number;
};

/**
 * Numeric decoration applied to an attribute offset.
 */
export class AttributeOffsetDecor extends NumDecor {}

/**
 * Base class for numeric attributes that are modified but not consumed.
 */
export abstract class AttributeModel extends Model {
  @useState()
  protected readonly _origin: number;
  @useMemo()
  public get origin() { return this._origin; }

  @useDecorProducer(() => AttributeOffsetDecor)
  @useState()
  protected readonly _offset: number;
  @useMemo()
  public get offset() { return this._offset; }

  @useMemo()
  public get current() {
    return this.origin + this.offset;
  }

  /**
   * Create an attribute from optional origin and offset values.
   *
   * @param props - Attribute configuration.
   */
  constructor(props: AttributeProps = {}) {
    super();
    this._origin = props.origin ?? 0;
    this._offset = props.offset ?? 0;
  }
}
