import { useModel } from 'set-piece';
import { AttrModel } from '../attr';

/**
 * Represents a task's non-consumable priority attr.
 */
@useModel('task-prior')
export class TaskPriorModel extends AttrModel {}
