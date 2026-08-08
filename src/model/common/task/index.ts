import {
  Model,
  useAction,
  useChild,
  useMemo,
  useRef,
} from 'set-piece';
import { useGameRoute } from '../../../hooks/use-game-route';
import { GameModel } from '../game/game';
import type { RoleModel } from '../role/index';
import { TraitsModel } from '../trait/group';
import { TaskPriorModel } from './prior';
import type { TaskTraitModel } from './traits/index';

export type TaskProps = {
  prior?: TaskPriorModel;
  roles?: RoleModel[];
  traits?: TaskTraitModel[];
};

/**
 * Base class for work that can bind roles and advance each turn.
 */
export abstract class TaskModel extends Model {
  @useGameRoute()
  private _game?: GameModel;
  @useMemo()
  public get game() { return this._game; }

  @useRef()
  private _roles?: RoleModel[];
  @useMemo()
  public get roles() { return [...this._roles ?? []]; }

  @useChild()
  private _traits: TraitsModel;
  @useMemo()
  public get traits() { return this._traits; }

  @useChild()
  private _prior: TaskPriorModel;
  @useMemo()
  public get prior() { return this._prior; }

  /**
   * Create a task with optional roles, traits, and priority.
   *
   * @param props - Task configuration.
   */
  constructor(props: TaskProps = {}) {
    super();
    this._roles = props.roles ?? [];
    this._traits = new TraitsModel({
      items: props.traits ?? [],
    });
    this._prior = props.prior ?? new TaskPriorModel();
  }

  /**
   * Advance task-specific work for one turn.
   *
   * @returns Nothing.
   */
  public abstract proceed(): void;

  /**
   * Assign an unoccupied role to this task.
   *
   * @param role - Role to assign.
   * @returns Nothing.
   */
  @useAction()
  public bind(role: RoleModel) {
    if (!this._roles) this._roles = [];
    if (role.task) return;
    const exists = this._roles.includes(role);
    if (!exists) this._roles.push(role);
    role.task = this;
  }

  /**
   * Unassign a role from this task.
   *
   * @param role - Role to unassign.
   * @returns Nothing.
   */
  @useAction()
  public unbind(role: RoleModel) {
    if (!this._roles) this._roles = [];
    if (role.task !== this) return;
    const index = this._roles.indexOf(role);
    if (index >= 0) this._roles.splice(index, 1);
    role.task = undefined;
  }
}
