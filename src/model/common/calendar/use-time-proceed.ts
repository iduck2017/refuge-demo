import { Event, useEventConsumer } from 'set-piece';
import { TraitModel } from '../trait/index';

export class TimeProceedEvent extends Event<void> {}

export function useTimeProceed<I extends TraitModel>() {
  return function(
    prototype: I,
    key: string,
    descriptor: TypedPropertyDescriptor<(event: TimeProceedEvent) => void>,
  ) {
    useEventConsumer<TimeProceedEvent, I>((that: I) => {
      if (!that.actived) return;
      const calendar = that.game?.calendar;
      if (!calendar) return;
      return [calendar, TimeProceedEvent];
    })(prototype, key, descriptor);
  };
}
