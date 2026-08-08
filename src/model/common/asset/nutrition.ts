import { useModel } from 'set-piece';
import { AttrModel } from '../attr';

/**
 * Represents the nutrition supplied when an asset is consumed.
 */
@useModel('asset-nutrition')
export class AssetNutritionModel extends AttrModel {}
