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

@useModel('starvation')
export class StarvationModel extends RoleTraitModel {
  @useState()
  private _level: number;
  @useMemo()
  public get level() { return this._level; }

  constructor(props: StarvationProps = {}) {
    super(props);
    const level = props.level ?? 0;
    const minimum = Math.max(level, 0);
    this._level = Math.min(minimum, 3);
  }

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

  @useVitalityOffset()
  protected handleOffset(decor: VitalityOffsetDecor) {
    const level = this.level;
    const penalty = level === 3 ? 5 : level;
    decor.add(penalty);
  }
}
