import { Event, useEventConsumer } from 'set-piece';
import { TraitModel } from '../model/common/trait';

/**
 * Signals that the calendar advanced by one half-day.
 */
export class TimeProceedEvent extends Event<void> {}

/**
 * Create a method decorator that consumes active-trait time events.
 *
 * The decorated handler binds to the calendar owned by the trait's game and
 * remains inactive while the trait is disabled.
 *
 * @returns Decorator for a `TimeProceedEvent` handler.
 */
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
