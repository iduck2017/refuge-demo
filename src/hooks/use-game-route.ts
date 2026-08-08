import {
  Model,
  routeRegistry,
} from 'set-piece';
import { GameModel } from '../index';

/**
 * Create a property decorator that routes to the nearest game ancestor.
 *
 * @returns Typed decorator for an optional `GameModel` property.
 */
export function useGameRoute() {
  return function(prototype: Model, key: string) {
    routeRegistry.register(prototype, key, () => GameModel);
  };
}
