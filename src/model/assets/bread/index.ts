import { useModel } from 'set-piece';
import { AssetNutritionModel } from '../../common/asset/nutrition';
import { AssetModel } from '../../common/asset/index';
import { AssetFreshnessModel } from '../../common/asset/freshness';

/**
 * Bread asset that restores five nutrition points.
 */
@useModel('bread')
export class BreadModel extends AssetModel {
  /**
   * Create the default bread asset.
   */
  constructor() {
    super({
      freshness: new AssetFreshnessModel({ origin: 60 }),
      name: 'Bread',
      nutrition: new AssetNutritionModel({ origin: 5 }),
    });
  }
}
