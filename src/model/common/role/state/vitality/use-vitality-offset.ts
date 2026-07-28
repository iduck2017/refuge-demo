import { NumDecor, useDecorConsumer } from 'set-piece';
import type { RoleTraitModel } from '../../trait/index';

/**
 * Numeric decoration applied to a role's maximum vitality.
 */
export class VitalityMaximumDecor extends NumDecor {}

/**
 * Numeric decoration applied to a role's vitality depletion.
 */
export class VitalityOffsetDecor extends NumDecor {}

/**
 * Create a method decorator that adjusts active-role vitality offset.
 *
 * @returns Decorator for a `VitalityOffsetDecor` handler.
 */
export function useVitalityOffset<I extends RoleTraitModel>() {
  return function(
    prototype: I,
    key: string,
    descriptor: TypedPropertyDescriptor<(decor: VitalityOffsetDecor) => void>,
  ) {
    useDecorConsumer((that: I) => {
      if (!that.actived) return;
      const vitality = that.role?.state.vitality;
      return [vitality, VitalityOffsetDecor];
    })(prototype, key, descriptor);
  };
}
