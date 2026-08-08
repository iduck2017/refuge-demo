import { useModel } from 'set-piece';
import { AttrModel } from '../../attr';

/**
 * Represents a role's non-consumable gathering attr.
 */
@useModel('role-gathering')
export class RoleGatheringModel extends AttrModel {}
