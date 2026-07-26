import { BoolDecor, useDecorConsumer } from 'set-piece';
import type { TraitModel } from './index';

export class TraitActivedDecor extends BoolDecor {}

export function useTraitActived<I extends TraitModel>() {
  return function(
    prototype: I,
    key: string,
    descriptor: TypedPropertyDescriptor<(decor: TraitActivedDecor) => void>,
  ) {
    useDecorConsumer((that: I) => {
      return [that, TraitActivedDecor];
    })(prototype, key, descriptor);
  };
}
