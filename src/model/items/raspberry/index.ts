import { useModel } from 'set-piece';
import { ItemModel } from '../../common/item/index';

@useModel('raspberry')
export class RaspberryModel extends ItemModel {
  constructor() {
    super({ name: 'Raspberry' });
  }
}
