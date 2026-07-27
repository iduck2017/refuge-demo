import { useModel } from 'set-piece';
import { TaskModel } from '../../common/task/index';
import { TaskPriorModel } from '../../common/task/prior/index';
import { RaspberryModel } from '../../items/raspberry/index';

@useModel('wild-fruit-season-task')
export class WildFruitSeasonTaskModel extends TaskModel {
  constructor() {
    super({
      prior: new TaskPriorModel({ origin: 1 }),
    });
  }

  public proceed() {
    this.roles.forEach((role) => {
      const raspberry = new RaspberryModel();
      role.items.add(raspberry);
    });
  }
}
