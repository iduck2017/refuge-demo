import { useModel } from 'set-piece';
import { AttributeModel } from '../attribute';

/**
 * Represents a task's non-consumable priority attribute.
 */
@useModel('task-prior')
export class TaskPriorModel extends AttributeModel {}
