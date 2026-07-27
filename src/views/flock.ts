import { useChild, useView } from 'set-piece';
import { View } from './index';
import type { ViewProps } from './index';
import { RoleAvatarView } from './role-avatar';

const ROLE_GAP = 8;
const ROLE_COUNT = 6;

export function flockHeight(width: number) {
  const gaps = ROLE_GAP * (ROLE_COUNT - 1);
  const roleWidth = Math.floor((width - gaps) / ROLE_COUNT);
  return Math.round(roleWidth * 4 / 3);
}

export type FlockViewProps = ViewProps & {
  width: number;
  x: number;
  y: number;
};

@useView()
export class FlockView extends View {
  @useChild()
  private _roles: RoleAvatarView[];

  constructor(props: FlockViewProps) {
    super(props);
    const gaps = ROLE_GAP * (ROLE_COUNT - 1);
    const contentWidth = props.width - gaps;
    const roleWidth = Math.floor(contentWidth / ROLE_COUNT);
    const roleHeight = flockHeight(props.width);

    const roles: RoleAvatarView[] = [];
    for (let index = 0; index < ROLE_COUNT; index += 1) {
      const x = props.x + index * (roleWidth + ROLE_GAP);
      const role = new RoleAvatarView({
        scene: this._scene,
        x,
        y: props.y,
        width: roleWidth,
        height: roleHeight,
      });
      roles.push(role);
    }
    this._roles = roles;
  }
}
