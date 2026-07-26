import { useAction, useModel } from 'set-piece';
import { EventModel } from '../../common/event/index';
import type { RoleModel } from '../../common/role/index';
import { WildFruitSeasonTaskModel } from './task';

@useModel('wild-fruit-season-event')
export class WildFruitSeasonEventModel extends EventModel {
  constructor() {
    super({
      desc: 'Sloe fruit can be harvested from mid to late spring.',
      name: 'Wild fruit season',
    });
  }

  @useAction()
  public assign(roles: RoleModel[]) {
    const game = this.game;
    if (!game) return;
    const task = new WildFruitSeasonTaskModel();
    game.tasks.add(task);
    task.bind(roles);
    return task;
  }
}
