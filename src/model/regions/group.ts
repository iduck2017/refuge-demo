import { Model, useChild, useMemo, useModel } from 'set-piece';
import { ForestModel } from './forest/index';
import { RefugeModel } from './refuge/index';

export type RegionsProps = {
  forest?: ForestModel;
  refuge?: RefugeModel;
};

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

  constructor(props: RegionsProps = {}) {
    super();
    this._refuge = props.refuge;
    this._forest = props.forest;
  }
}
