import {
  Model,
  useAction,
  useDecorProducer,
  useMemo,
  useModel,
  useState,
} from 'set-piece';
import {
  VitalityMaximumDecor,
  VitalityOffsetDecor,
} from './use-vitality-offset';
import { RoleModel, useRole } from '../../index';
import { FlockModel, useFlock } from '../../flock';

export type VitalityProps = {
  maximum?: number;
  offset?: number;
};

/**
 * Tracks decorated vitality and removes roles that fail an exhaustion check.
 */
@useModel('vitality')
export class VitalityModel extends Model {
  @useRole()
  private _role?: RoleModel;
  @useMemo()
  public get role() { return this._role; }

  @useFlock()
  private _flock?: FlockModel;
  @useMemo()
  public get flock() { return this._flock; }

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

  /**
   * Create vitality state with optional maximum and depletion.
   *
   * @param props - Vitality configuration.
   */
  constructor(props: VitalityProps = {}) {
    super();
    const maximum = props.maximum ?? 5;
    this._maximum = maximum;
    this._offset = props.offset ?? maximum;
  }

  /**
   * Remove the owning role when negative vitality fails a chance check.
   *
   * The removal chance increases by ten percentage points for each point below
   * zero, capped at certainty.
   *
   * @returns Nothing.
   */
  @useAction()
  public check() {
    const role = this.role;
    const flock = this.flock;
    if (!role || !flock) return;
    const current = this.current;
    if (current >= 0) return;
    const chance = Math.min(-current * 0.1, 1);
    if (Math.random() >= chance) return;
    flock.del(role);
  }
}
