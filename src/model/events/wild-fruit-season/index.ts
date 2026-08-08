import { useAction, useModel } from 'set-piece';
import { EventModel } from '../../common/event/index';
import type { RoleModel } from '../../common/role/index';
import { WildFruitSeasonTaskModel } from './task';

/**
 * Announces harvestable wild fruit and creates harvesting work for roles.
 */
@useModel('wild-fruit-season-event')
export class WildFruitSeasonEventModel extends EventModel {
  /**
   * Create the wild fruit season event metadata.
   */
  constructor() {
    super({
      desc: 'Sloe fruit can be harvested from mid to late spring.',
      name: 'Wild fruit season',
    });
  }

  /**
   * Create a harvesting task and assign one role to it.
   *
   * @param role - Role selected for wild fruit harvesting.
   * @returns Created task, or `undefined` when the event is not mounted.
   */
  @useAction()
  public assign(role: RoleModel) {
    const game = this.game;
    if (!game) return;
    const task = new WildFruitSeasonTaskModel();
    game.tasks.add(task);
    task.bind(role);
    return task;
  }
}
