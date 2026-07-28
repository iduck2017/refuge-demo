import { useMemo, useModel, useState } from 'set-piece';
import {
  TimeProceedEvent,
  useTimeProceed,
} from '../../../calendar/use-time-proceed';
import {
  useVitalityOffset,
  VitalityOffsetDecor,
} from '../../state/vitality/use-vitality-offset';
import { RoleTraitModel } from '../index';
import type { RoleTraitProps } from '../index';

export type StarvationProps = RoleTraitProps & {
  level?: number;
};

/**
 * Tracks consecutive starvation and converts it into vitality depletion.
 */
@useModel('starvation')
export class StarvationModel extends RoleTraitModel {
  @useState()
  private _level: number;
  @useMemo()
  public get level() { return this._level; }

  /**
   * Create starvation state with a level clamped between zero and three.
   *
   * @param props - Starvation and activation configuration.
   */
  constructor(props: StarvationProps = {}) {
    super(props);
    const level = props.level ?? 0;
    const minimum = Math.max(level, 0);
    this._level = Math.min(minimum, 3);
  }

  /**
   * Update starvation after each calendar advance.
   *
   * Nourished roles reset to zero; depleted roles gain one clamped level.
   *
   * @param _event - Time event that triggered the update.
   * @returns Nothing.
   */
  @useTimeProceed()
  protected starve(_event: TimeProceedEvent) {
    const role = this.role;
    const nutrition = role?.state.nutrition;
    if (!nutrition) return;
    const current = nutrition.current;
    if (current > 0) this._level = 0;
    if (current > 0) return;
    const next = this._level + 1;
    this._level = Math.min(next, 3);
  }

  /**
   * Add starvation's penalty to decorated vitality depletion.
   *
   * @param decor - Mutable vitality offset decoration.
   * @returns Nothing.
   */
  @useVitalityOffset()
  protected handleOffset(decor: VitalityOffsetDecor) {
    const level = this.level;
    const penalty = level === 3 ? 5 : level;
    decor.add(penalty);
  }
}
