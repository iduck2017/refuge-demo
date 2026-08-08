import {
  Model,
  routeRegistry,
} from 'set-piece';
import { RolesModel } from '../index';

/**
 * Create a property decorator that routes to the nearest roles ancestor.
 *
 * @returns Typed decorator for an optional `RolesModel` property.
 */
export function useRolesRoute() {
  return function(prototype: Model, key: string) {
    routeRegistry.register(prototype, key, () => RolesModel);
  };
}
