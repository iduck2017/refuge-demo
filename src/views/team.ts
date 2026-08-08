import { useChild, useView } from 'set-piece';
import { View } from './index';
import type { ViewProps } from './index';
import { RoleAvatarView } from './role-avatar';

const ROLE_GAP = 8;
const ROLE_COUNT = 6;

/**
 * Calculate the height of a six-column role row.
 *
 * @param width - Available row width.
 * @returns Rounded role-card height using a 3:4 width-to-height ratio.
 */
export function teamHeight(width: number) {
  const gaps = ROLE_GAP * (ROLE_COUNT - 1);
  const roleWidth = Math.floor((width - gaps) / ROLE_COUNT);
  return Math.round(roleWidth * 4 / 3);
}

export type TeamViewProps = ViewProps & {
  width: number;
  x: number;
  y: number;
};

/**
 * Displays a fixed row of role avatar slots using local Container coordinates.
 */
@useView()
export class TeamView extends View {
  @useChild()
  private _roles: RoleAvatarView[];

  /**
   * Create and evenly distribute six role avatar views.
   *
   * @param props - Local position and available row width.
   */
  constructor(props: TeamViewProps) {
    super(props);
    const gaps = ROLE_GAP * (ROLE_COUNT - 1);
    const contentWidth = props.width - gaps;
    const roleWidth = Math.floor(contentWidth / ROLE_COUNT);
    const roleHeight = teamHeight(props.width);

    const roles: RoleAvatarView[] = [];
    for (let index = 0; index < ROLE_COUNT; index += 1) {
      const x = index * (roleWidth + ROLE_GAP);
      const role = this.createView(RoleAvatarView, {
        x,
        y: 0,
        width: roleWidth,
        height: roleHeight,
      });
      roles.push(role);
    }
    this._roles = roles;
  }
}
