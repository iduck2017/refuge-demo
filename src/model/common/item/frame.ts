import { DiffFrame } from 'set-piece';
import type { ItemModel } from './index';

/**
 * Carries the previous and next ordered contents of an item group.
 */
export class ItemsChangedFrame extends DiffFrame<ItemModel[]> {}
