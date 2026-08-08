import Phaser from 'phaser';
import { useChild, useView } from 'set-piece';
import type { AssetsModel } from '../model/common/asset/group';
import { View } from './index';
import type { ViewProps } from './index';
import {
  ASSET_GAP,
  assetSize,
  InventoryView,
} from './inventory';
import { IllustrationView } from './illustration';
import { teamHeight, TeamView } from './team';
import { WorkbenchView } from './workbench';

export const STAGE_HEIGHT = 540;
export const STAGE_WIDTH = STAGE_HEIGHT * 1120 / 720;
export const STAGE_MARGIN = 0.05;
const STAGE_PADDING = 16;
const PANEL_GAP = 8;

export const APP_BACKGROUND = 'app-background';

export type AppViewProps = ViewProps & {
  assets: AssetsModel;
};

/**
 * Root view that lays out the stage background and its primary panels.
 */
@useView()
export class AppView extends View {
  private readonly _background: Phaser.GameObjects.Image;
  @useChild()
  private _illustration: IllustrationView;
  @useChild()
  private _team: TeamView;
  @useChild()
  private _inventory: InventoryView;
  @useChild()
  private _workbench: WorkbenchView;

  protected override get isRootView() {
    return true;
  }

  /**
   * Create the fixed-ratio stage and calculate all top-level panel bounds.
   *
   * @param props - Root Scene and shared assets model.
   */
  constructor(props: AppViewProps) {
    super(props);
    const contentWidth = STAGE_WIDTH - STAGE_PADDING * 2 - PANEL_GAP;
    const contentHeight = STAGE_HEIGHT - STAGE_PADDING * 2;
    const illustrationWidth = Math.round(contentWidth * 0.4);
    const teamWidth = contentWidth - illustrationWidth;
    const rightX = STAGE_PADDING + illustrationWidth + PANEL_GAP;
    const teamY = STAGE_PADDING;
    const inventoryY = teamY + teamHeight(teamWidth) + PANEL_GAP;
    const contentBottom = STAGE_HEIGHT - STAGE_PADDING;
    const inventoryHeight = contentBottom - inventoryY;
    const slotSize = assetSize(teamWidth, inventoryHeight);
    const workbenchHeight = slotSize * 2 + ASSET_GAP;
    const illustrationHeight = contentHeight - workbenchHeight - PANEL_GAP;
    const workbenchY = STAGE_PADDING + illustrationHeight + PANEL_GAP;

    this._background = this.add(
      this.container.scene.add.image(0, 0, APP_BACKGROUND),
    );
    this._background.setOrigin(0);
    this._background.setDisplaySize(STAGE_WIDTH, STAGE_HEIGHT);
    this._illustration = this.createView(IllustrationView, {
      x: STAGE_PADDING,
      y: STAGE_PADDING,
      width: illustrationWidth,
      height: illustrationHeight,
    });
    this._workbench = this.createView(WorkbenchView, {
      x: STAGE_PADDING,
      y: workbenchY,
      width: illustrationWidth,
      height: workbenchHeight,
    });
    this._team = this.createView(TeamView, {
      x: rightX,
      y: teamY,
      width: teamWidth,
    });
    this._inventory = this.createView(InventoryView, {
      assets: props.assets,
      x: rightX,
      y: inventoryY,
      width: teamWidth,
      height: inventoryHeight,
    });
  }

  /**
   * Match all nested text render resolutions to the current camera zoom.
   *
   * @param zoom - Camera zoom applied to the logical stage.
   * @returns Nothing.
   */
  public resize(zoom: number) {
    const resize = (container: Phaser.GameObjects.Container) => {
      container.list.forEach(child => {
        if (child instanceof Phaser.GameObjects.Text) {
          child.setResolution(zoom);
        }
        if (child instanceof Phaser.GameObjects.Container) {
          resize(child);
        }
      });
    };
    resize(this.container);
  }
}
