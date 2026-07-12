import {
  Model,
  useDecorProducer,
  useMemo,
  useModel,
  useState,
} from 'set-piece';
import {
  VitalityMaximumDecor,
  VitalityOffsetDecor,
} from './use-vitality-offset';

export type VitalityProps = {
  maximum?: number;
  offset?: number;
};

@useModel('vitality')
export class VitalityModel extends Model {
  @useDecorProducer(() => VitalityMaximumDecor)
  @useState()
  private readonly _maximum: number;
  @useMemo()
  public get maximum() { return this._maximum; }

  @useDecorProducer(() => VitalityOffsetDecor)
  @useState()
  private _offset: number;
  @useMemo()
  public get offset() { return this._offset; }

  @useMemo()
  public get current() { return this.maximum - this.offset; }

  constructor(props: VitalityProps = {}) {
    super();
    const maximum = props.maximum ?? 5;
    this._maximum = maximum;
    this._offset = props.offset ?? maximum;
  }
}
