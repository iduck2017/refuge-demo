import {
  Model,
  routeRegistry,
} from 'set-piece';
import { RoleModel } from '../index';

/**
 * Create a property decorator that routes to the nearest role ancestor.
 *
 * @returns Typed decorator for an optional `RoleModel` property.
 */
export function useRoleRoute() {
  return function(prototype: Model, key: string) {
    routeRegistry.register(prototype, key, () => RoleModel);
  };
}
