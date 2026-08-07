import { useModel } from 'set-piece';
import { AttributeModel } from '../attribute';

/**
 * Represents a role's non-consumable strength attribute.
 */
@useModel('strength')
export class StrengthModel extends AttributeModel {}
