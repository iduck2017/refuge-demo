import { useModel } from 'set-piece';
import { AssetNutritionModel } from '../../common/asset/nutrition';
import { AssetModel } from '../../common/asset/index';
import { AssetFreshnessModel } from '../../common/asset/freshness';

/**
 * Raspberry asset that restores three nutrition points.
 */
@useModel('raspberry')
export class RaspberryModel extends AssetModel {
  /**
   * Create the default raspberry asset.
   */
  constructor() {
    super({
      freshness: new AssetFreshnessModel({ origin: 5 }),
      name: 'Raspberry',
      nutrition: new AssetNutritionModel({ origin: 3 }),
    });
  }
}
