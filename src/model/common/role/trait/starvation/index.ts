import { useMemo, useModel, useState } from 'set-piece';
import {
  TimeProceedEvent,
  useTimeProceed,
} from '../../../calendar/use-time-proceed';
import {
  useVitalityOffset,
} from '../../vitality';
import { AttributeOffsetDecor } from '../../../attribute';
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
   * Create starvation state with a non-negative, unbounded level.
   *
   * @param props - Starvation and activation configuration.
   */
  constructor(props: StarvationProps = {}) {
    super(props);
    const level = props.level ?? 0;
    this._level = Math.max(level, 0);
  }

  /**
   * Update starvation after each calendar advance.
   *
   * Nourished roles reset to zero; depleted roles gain one level.
   *
   * @param _event - Time event that triggered the update.
   * @returns Nothing.
   */
  @useTimeProceed()
  protected starve(_event: TimeProceedEvent) {
    const role = this.role;
    const satiety = role?.satiety;
    if (!satiety) return;
    const current = satiety.current;
    if (current > 0) this._level = 0;
    if (current > 0) return;
    this._level += 1;
  }

  /**
   * Subtract the triangular starvation value from decorated vitality.
   *
   * @param decor - Mutable vitality offset decoration.
   * @returns Nothing.
   */
  @useVitalityOffset()
  protected handleOffset(decor: AttributeOffsetDecor) {
    const level = this.level;
    const offset = -level * (level + 1) / 2;
    decor.add(offset);
  }
}
