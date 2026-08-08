import {
  Model,
  routeRegistry,
} from 'set-piece';
import { TaskModel } from '../index';

/**
 * Create a property decorator that routes to the nearest task ancestor.
 *
 * @returns Typed decorator for an optional `TaskModel` property.
 */
export function useTaskRoute() {
  return function(prototype: Model, key: string) {
    routeRegistry.register(prototype, key, () => TaskModel);
  };
}
