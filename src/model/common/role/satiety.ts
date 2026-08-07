import { useModel } from 'set-piece';
import { StateModel } from '../state';

/**
 * Represents a role's consumable satiety state.
 */
@useModel('satiety')
export class SatietyModel extends StateModel {}
