import { useModel } from 'set-piece';
import { ItemEdibleModel } from '../../common/item/edible/index';
import { ItemModel } from '../../common/item/index';

@useModel('meat')
export class MeatModel extends ItemModel {
  constructor() {
    super({
      edible: new ItemEdibleModel({ nutrition: 1 }),
      name: 'Meat',
    });
  }
}
