import { useModel } from 'set-piece';
import { AttrModel } from '../../attr';

/**
 * Represents a role's non-consumable strength attr.
 */
@useModel('role-strength')
export class RoleStrengthModel extends AttrModel {}
