import { useAction, useModel } from 'set-piece';
import { RoleModel } from '../../role';
import { ItemModel } from '../../item';

@useModel('meat')
export class MeatModel extends ItemModel {
  @useAction()
  public use(role: RoleModel) {
    const state = role.state;
    const nutrition = state.nutrition;
    nutrition.restore(1);
  }
}
