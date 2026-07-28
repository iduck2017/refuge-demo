import { useModel } from 'set-piece';
import { ItemModel } from '../../common/item/index';

/**
 * Raspberry item harvested during wild fruit season.
 */
@useModel('raspberry')
export class RaspberryModel extends ItemModel {
  /**
   * Create the default raspberry item.
   */
  constructor() {
    super({ name: 'Raspberry' });
  }
}
