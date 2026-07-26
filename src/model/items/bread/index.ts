import { useModel } from 'set-piece';
import { ItemEdibleModel } from '../../common/item/edible/index';
import { ItemModel } from '../../common/item/index';

@useModel('bread')
export class BreadModel extends ItemModel {
  constructor() {
    super({
      edible: new ItemEdibleModel({ nutrition: 1 }),
    });
  }
}
