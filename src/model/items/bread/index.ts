import { useAction, useModel } from 'set-piece';
import { RoleModel } from '../../role';
import { ItemModel } from '../../item';

@useModel('bread')
export class BreadModel extends ItemModel {
  @useAction()
  public use(role: RoleModel) {
    const state = role.state;
    const nutrition = state.nutrition;
    nutrition.restore(1);
  }
}
