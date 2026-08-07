import {
  useAction,
  useDecorConsumer,
  useMemo,
  useModel,
} from 'set-piece';
import {
  AttributeModel,
  AttributeOffsetDecor,
} from '../attribute';
import { RoleModel, useRole } from './index';
import { FlockModel, useFlock } from './flock';
import type { RoleTraitModel } from './trait/index';

/**
 * Represents decorated vitality and removes roles that fail its death check.
 */
@useModel('vitality')
export class VitalityModel extends AttributeModel {
  @useRole()
  private _role?: RoleModel;
  @useMemo()
  public get role() { return this._role; }

  @useFlock()
  private _flock?: FlockModel;
  @useMemo()
  public get flock() { return this._flock; }

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

/**
 * Create a method decorator that adjusts active-role vitality offset.
 *
 * @returns Decorator for an `AttributeOffsetDecor` handler routed to vitality.
 */
export function useVitalityOffset<I extends RoleTraitModel>() {
  return function(
    prototype: I,
    key: string,
    descriptor: TypedPropertyDescriptor<(decor: AttributeOffsetDecor) => void>,
  ) {
    useDecorConsumer((that: I) => {
      if (!that.actived) return;
      const vitality = that.role?.vitality;
      return [vitality, AttributeOffsetDecor];
    })(prototype, key, descriptor);
  };
}
