import {
  Model,
  useAction,
  useDecorProducer,
  useMemo,
  useModel,
  useState,
} from 'set-piece';
import {
  VitalityMaximumDecor,
  VitalityOffsetDecor,
} from './use-vitality-offset';
import { RoleModel, useRole } from '../../index';
import { TeamModel, useTeam } from '../../team';

export type VitalityProps = {
  maximum?: number;
  offset?: number;
};

@useModel('vitality')
export class VitalityModel extends Model {
  @useRole()
  private _role?: RoleModel;
  @useMemo()
  public get role() { return this._role; }

  @useTeam()
  private _team?: TeamModel;
  @useMemo()
  public get team() { return this._team; }

  @useDecorProducer(() => VitalityMaximumDecor)
  @useState()
  private readonly _maximum: number;
  @useMemo()
  public get maximum() { return this._maximum; }

  @useDecorProducer(() => VitalityOffsetDecor)
  @useState()
  private _offset: number;
  @useMemo()
  public get offset() { return this._offset; }

  @useMemo()
  public get current() { return this.maximum - this.offset; }

  constructor(props: VitalityProps = {}) {
    super();
    const maximum = props.maximum ?? 5;
    this._maximum = maximum;
    this._offset = props.offset ?? maximum;
  }

  @useAction()
  public check() {
    const role = this.role;
    const team = this.team;
    if (!role || !team) return;
    const current = this.current;
    if (current >= 0) return;
    const chance = Math.min(-current * 0.1, 1);
    if (Math.random() >= chance) return;
    team.del(role);
  }
}
