import { useModel } from 'set-piece';
import { AttributeModel } from '../attribute';

/**
 * Represents a role's non-consumable gathering attribute.
 */
@useModel('gathering')
export class GatheringModel extends AttributeModel {}
