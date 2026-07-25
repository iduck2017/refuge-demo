import { useEventConsumer } from 'set-piece';
import { TimeProceedEvent } from '../calendar/use-time-proceed';
import type { TaskTraitModel } from './traits/index';

export function useTaskTimeProceed<I extends TaskTraitModel>() {
  return function(
    prototype: I,
    key: string,
    descriptor: TypedPropertyDescriptor<(event: TimeProceedEvent) => void>,
  ) {
    useEventConsumer<TimeProceedEvent, I>((that: I) => {
      const calendar = that.game?.calendar;
      if (!calendar) return;
      return [calendar, TimeProceedEvent];
    })(prototype, key, descriptor);
  };
}
