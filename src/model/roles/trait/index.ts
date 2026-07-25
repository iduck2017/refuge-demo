import {
  Model,
  useMemo,
} from 'set-piece';
import { RoleModel, useRole } from '../index';
import { TeamModel, useTeam } from '../team';
import { TraitModel, TraitProps } from '../../traits/index';
import {
  TraitActivedDecor,
  useTraitActived,
} from '../../traits/use-trait-actived';

export type RoleTraitProps = TraitProps;

export abstract class RoleTraitModel extends TraitModel {
  @useRole()
  private _role?: RoleModel;
  @useMemo()
  public get role() { return this._role; }

  @useTeam()
  private _team?: TeamModel;
  @useMemo()
  public get team() { return this._team; }

  constructor(props: RoleTraitProps = {}) {
    super(props);
  }
}
