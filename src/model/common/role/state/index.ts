import {
  Model,
  useChild,
  useMemo,
  useModel,
} from 'set-piece';
import { RoleSatietyModel } from '../satiety';
import { RoleVitalityModel } from '../vitality';

export type RoleStateProps = {
  satiety?: RoleSatietyModel;
  vitality?: RoleVitalityModel;
};

/**
 * Owns the mutable states of a role.
 */
@useModel('role-state')
export class RoleStateModel extends Model {
  @useChild()
  private _satiety: RoleSatietyModel;
  @useMemo()
  public get satiety() { return this._satiety; }

  @useChild()
  private _vitality: RoleVitalityModel;
  @useMemo()
  public get vitality() { return this._vitality; }

  /**
   * Create role state with optional satiety and vitality.
   *
   * @param props - Role state configuration.
   */
  constructor(props: RoleStateProps = {}) {
    super();
    this._satiety = props.satiety ?? new RoleSatietyModel({ origin: 10 });
    this._vitality = props.vitality ?? new RoleVitalityModel({ origin: 5 });
  }
}
