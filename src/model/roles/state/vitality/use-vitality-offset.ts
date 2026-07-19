import { NumDecor, useDecorConsumer } from 'set-piece';
import type { RoleTraitModel } from '../../../traits/role/index';

export class VitalityMaximumDecor extends NumDecor {}
export class VitalityOffsetDecor extends NumDecor {}

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
