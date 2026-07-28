import { BoolDecor, useDecorConsumer } from 'set-piece';
import type { TraitModel } from './index';

/**
 * Boolean decoration used to override a trait's activation state.
 */
export class TraitActivedDecor extends BoolDecor {}

/**
 * Create a method decorator that adjusts trait activation.
 *
 * @returns Decorator for a `TraitActivedDecor` handler.
 */
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
