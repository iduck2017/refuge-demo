import { useModel } from 'set-piece';
import { ItemEdibleModel } from '../../common/item/edible/index';
import { ItemModel } from '../../common/item/index';

/**
 * Edible meat item that restores one nutrition point.
 */
@useModel('meat')
export class MeatModel extends ItemModel {
  /**
   * Create the default meat item.
   */
  constructor() {
    super({
      edible: new ItemEdibleModel({ nutrition: 1 }),
      name: 'Meat',
    });
  }
}
