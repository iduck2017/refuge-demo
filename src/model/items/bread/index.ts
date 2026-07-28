import { useModel } from 'set-piece';
import { ItemEdibleModel } from '../../common/item/edible/index';
import { ItemModel } from '../../common/item/index';

/**
 * Edible bread item that restores one nutrition point.
 */
@useModel('bread')
export class BreadModel extends ItemModel {
  /**
   * Create the default bread item.
   */
  constructor() {
    super({
      edible: new ItemEdibleModel({ nutrition: 1 }),
      name: 'Bread',
    });
  }
}
