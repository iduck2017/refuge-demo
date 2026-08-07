import { useModel } from 'set-piece';
import { AttributeModel } from '../attribute';

/**
 * Represents the nutrition supplied when an asset is consumed.
 */
@useModel('asset-nutrition')
export class AssetNutritionModel extends AttributeModel {}
