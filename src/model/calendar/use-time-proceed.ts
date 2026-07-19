import { Event, Model, useEventConsumer } from 'set-piece';
import { GameModel } from '../game';
import { TraitModel } from '../traits/index';

export class TimeProceedEvent extends Event<void> {}

export type GameDescendant = Model & {
  game?: GameModel;
};

export function useTimeProceed<I extends GameDescendant>() {
  return function(
    prototype: I,
    key: string,
    descriptor: TypedPropertyDescriptor<(event: TimeProceedEvent) => void>,
  ) {
    useEventConsumer<TimeProceedEvent, I>((that: I) => {
      if (that instanceof TraitModel && !that.actived) return;
      const calendar = that.game?.calendar;
      if (!calendar) return;
      return [calendar, TimeProceedEvent];
    })(prototype, key, descriptor);
  };
}
