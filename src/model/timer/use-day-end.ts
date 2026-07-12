import { Event, useEventConsumer } from 'set-piece';
import { RoleTraitModel } from '../roles/traits/index';

export class DayEndEvent extends Event<void> {}

export function useDayEnd<I extends RoleTraitModel>() {
  return function(
    prototype: I,
    key: string,
    descriptor: TypedPropertyDescriptor<(event: DayEndEvent) => void>,
  ) {
    useEventConsumer((that: I) => {
      if (!that.actived) return;
      return [that.game?.timer, DayEndEvent];
    })(prototype, key, descriptor);
  };
}
