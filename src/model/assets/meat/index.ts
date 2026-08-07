
import { useModel } from 'set-piece';
import { AssetNutritionModel } from '../../common/asset/nutrition';
import { AssetModel } from '../../common/asset/index';
import { AssetFreshnessModel } from '../../common/asset/freshness';

/**
 * Meat asset that restores five nutrition points.
 */
@useModel('meat')
export class MeatModel extends AssetModel {
  /**
   * Create the default meat asset.
   */
  constructor() {
    super({
      freshness: new AssetFreshnessModel({ origin: 10 }),
      name: 'Meat',
      nutrition: new AssetNutritionModel({ origin: 5 }),
    });
  }
}
