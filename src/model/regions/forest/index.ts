import {
  useChild,
  useMemo,
  useModel,
} from 'set-piece';
import { TraitsModel } from '../../common/trait/group';
import { WildFruitSeasonTraitModel } from '../../events/wild-fruit-season/trait';
import { RegionModel } from '../index';

/**
 * Represents the forest region.
 */
@useModel('forest')
export class ForestModel extends RegionModel {
  @useChild()
  private _traits: TraitsModel;
  @useMemo()
  public get traits() { return this._traits; }

  /**
   * Create a forest with its default traits.
   */
  constructor() {
    super();
    this._traits = new TraitsModel({
      items: [
        new WildFruitSeasonTraitModel(),
      ],
    });
  }
}
