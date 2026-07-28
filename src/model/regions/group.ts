import { Model, useChild, useMemo, useModel } from 'set-piece';
import { ForestModel } from './forest/index';
import { RefugeModel } from './refuge/index';

export type RegionsProps = {
  forest?: ForestModel;
  refuge?: RefugeModel;
};

/**
 * Aggregates the named regions available to a game.
 */
@useModel('regions')
export class RegionsModel extends Model {
  @useChild()
  private _refuge?: RefugeModel;
  @useMemo()
  public get refuge() { return this._refuge; }

  @useChild()
  private _forest?: ForestModel;
  @useMemo()
  public get forest() { return this._forest; }

  /**
   * Create a region collection from optional named regions.
   *
   * @param props - Region configuration.
   */
  constructor(props: RegionsProps = {}) {
    super();
    this._refuge = props.refuge;
    this._forest = props.forest;
  }
}
