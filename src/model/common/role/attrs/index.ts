import {
  Model,
  useChild,
  useMemo,
  useModel,
} from 'set-piece';
import { RoleGatheringModel } from './gathering';
import { RoleStrengthModel } from './strength';

export type RoleAttrsProps = {
  gathering?: RoleGatheringModel;
  strength?: RoleStrengthModel;
};

/**
 * Owns the attributes of a role.
 */
@useModel('role-attrs')
export class RoleAttrsModel extends Model {
  @useChild()
  private _gathering: RoleGatheringModel;
  @useMemo()
  public get gathering() { return this._gathering; }

  @useChild()
  private _strength: RoleStrengthModel;
  @useMemo()
  public get strength() { return this._strength; }

  /**
   * Create role attributes with optional gathering and strength values.
   *
   * @param props - Role attributes configuration.
   */
  constructor(props: RoleAttrsProps = {}) {
    super();
    this._gathering = props.gathering ?? new RoleGatheringModel();
    this._strength = props.strength ?? new RoleStrengthModel();
  }
}
