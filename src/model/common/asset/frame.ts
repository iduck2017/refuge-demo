import { DiffFrame } from 'set-piece';
import type { AssetModel } from './index';

/**
 * Carries the previous and next ordered contents of an asset collection.
 */
export class AssetsChangedFrame extends DiffFrame<AssetModel[]> {}
