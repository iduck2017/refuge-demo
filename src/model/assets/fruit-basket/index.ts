import { useModel } from 'set-piece';
import { AssetModel } from '../../common/asset/index';

/**
 * Non-food basket used to carry harvested fruit.
 */
@useModel('fruit-basket')
export class FruitBasketModel extends AssetModel {
  /**
   * Create the default fruit basket asset.
   */
  constructor() {
    super({ name: 'Fruit Basket' });
  }
}
