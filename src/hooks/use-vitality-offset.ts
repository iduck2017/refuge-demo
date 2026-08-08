import { useDecorConsumer } from 'set-piece';
import { AttrOffsetDecor } from '../model/common/attr';
import type { RoleTraitModel } from '../model/common/role/trait/index';

/**
 * Create a method decorator that adjusts active-role vitality offset.
 *
 * @returns Decorator for an `AttrOffsetDecor` handler routed to vitality.
 */
export function useVitalityOffset<I extends RoleTraitModel>() {
  return function(
    prototype: I,
    key: string,
    descriptor: TypedPropertyDescriptor<(decor: AttrOffsetDecor) => void>,
  ) {
    useDecorConsumer((that: I) => {
      if (!that.actived) return;
      const vitality = that.role?.state.vitality;
      return [vitality, AttrOffsetDecor];
    })(prototype, key, descriptor);
  };
}
