import { useModel } from 'set-piece';
import { StateModel } from '../state';

/**
 * Represents an asset's consumable freshness state.
 */
@useModel('asset-freshness')
export class AssetFreshnessModel extends StateModel {}
