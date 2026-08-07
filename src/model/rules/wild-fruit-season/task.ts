import { useModel } from 'set-piece';
import { TaskModel } from '../../common/task/index';
import { TaskPriorModel } from '../../common/task/prior';
import { RaspberryModel } from '../../assets/raspberry/index';

/**
 * Gives each assigned role one raspberry whenever the task proceeds.
 */
@useModel('wild-fruit-season-task')
export class WildFruitSeasonTaskModel extends TaskModel {
  /**
   * Create the harvesting task with its default priority.
   */
  constructor() {
    super({
      prior: new TaskPriorModel({ origin: 1 }),
    });
  }

  /**
   * Add one harvested raspberry to every assigned role.
   *
   * @returns Nothing.
   */
  public proceed() {
    this.roles.forEach((role) => {
      const raspberry = new RaspberryModel();
      role.assets.add(raspberry);
    });
  }
}
