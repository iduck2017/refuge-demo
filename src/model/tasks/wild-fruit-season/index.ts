import { useModel } from 'set-piece';
import { TaskTraitsModel } from '../traits/group';
import { TaskModel } from '../index';
import { TaskPriorModel } from '../task-prior';
import { WildFruitSeasonTraitModel } from './trait';

@useModel('wild-fruit-season-task')
export class WildFruitSeasonTaskModel extends TaskModel {
  constructor() {
    const traits = new TaskTraitsModel({
      traits: [new WildFruitSeasonTraitModel()],
    });
    super({
      desc: 'In the heart of spring, sloe branches darken with fruit for careful hands.',
      name: 'Sloe harvest',
      prior: new TaskPriorModel({ origin: 1 }),
      traits,
    });
  }
}
