import Phaser from 'phaser';
import { useChild, useView } from 'set-piece';
import { useGraph, View } from './index';
import type { ViewProps } from './index';
import {
  ITEM_GAP,
  inventoryItemSize,
  InventoryView,
} from './inventory';
import { IllustrationView } from './illustration';
import { teamHeight, TeamView } from './team';
import { WorkbenchView } from './workbench';

const STAGE_WIDTH = 1120;
const STAGE_HEIGHT = 720;
const STAGE_MARGIN = 0.05;
const STAGE_PADDING = 24;
const PANEL_GAP = 24;

@useView()
export class AppView extends View {
  @useGraph()
  private readonly _backdrop: Phaser.GameObjects.Graphics;
  @useGraph()
  private readonly _stage: Phaser.GameObjects.Container;
  @useChild()
  private _illustration: IllustrationView;
  @useChild()
  private _team: TeamView;
  @useChild()
  private _inventory: InventoryView;
  @useChild()
  private _workbench: WorkbenchView;

  constructor(props: ViewProps) {
    super(props);
    const line = 1;
    const offset = line / 2;
    const contentWidth = STAGE_WIDTH - STAGE_PADDING * 2 - PANEL_GAP;
    const contentHeight = STAGE_HEIGHT - STAGE_PADDING * 2;
    const illustrationWidth = contentWidth * 0.4;
    const teamWidth = contentWidth - illustrationWidth;
    const rightX = STAGE_PADDING + illustrationWidth + PANEL_GAP;
    const teamY = STAGE_PADDING;
    const inventoryY = teamY + teamHeight(teamWidth) + PANEL_GAP;
    const contentBottom = STAGE_HEIGHT - STAGE_PADDING;
    const inventoryHeight = contentBottom - inventoryY;
    const itemSize = inventoryItemSize(teamWidth, inventoryHeight);
    const workbenchHeight = itemSize * 2 + ITEM_GAP;
    const illustrationHeight = contentHeight - workbenchHeight - PANEL_GAP;
    const workbenchY = STAGE_PADDING + illustrationHeight + PANEL_GAP;

    this._backdrop = this._scene.add.graphics();
    this._stage = this._scene.add.container();
    this._illustration = new IllustrationView({
      scene: this._scene,
      parent: this._stage,
      x: STAGE_PADDING,
      y: STAGE_PADDING,
      width: illustrationWidth,
      height: illustrationHeight,
    });
    this._workbench = new WorkbenchView({
      scene: this._scene,
      parent: this._stage,
      x: STAGE_PADDING,
      y: workbenchY,
      width: illustrationWidth,
      height: workbenchHeight,
    });
    this._team = new TeamView({
      scene: this._scene,
      parent: this._stage,
      x: rightX,
      y: teamY,
      width: teamWidth,
    });
    this._inventory = new InventoryView({
      scene: this._scene,
      parent: this._stage,
      x: rightX,
      y: inventoryY,
      width: teamWidth,
      height: inventoryHeight,
    });

    const frame = this._scene.add.graphics();
    frame.lineStyle(line, 0xeeeeee);
    frame.strokeRect(
      offset,
      offset,
      STAGE_WIDTH - line,
      STAGE_HEIGHT - line,
    );
    this._stage.add(frame);
  }

  public resize(size: Phaser.Structs.Size) {
    const marginX = size.width * STAGE_MARGIN;
    const marginY = size.height * STAGE_MARGIN;
    const availableWidth = size.width - marginX * 2;
    const availableHeight = size.height - marginY * 2;
    const scale = Math.min(
      availableWidth / STAGE_WIDTH,
      availableHeight / STAGE_HEIGHT,
    );
    const width = STAGE_WIDTH * scale;
    const height = STAGE_HEIGHT * scale;
    const x = (size.width - width) / 2;
    const y = (size.height - height) / 2;

    this._backdrop.clear();
    this._backdrop.fillStyle(0x11131a);
    this._backdrop.fillRect(0, 0, size.width, size.height);
    this._stage.setPosition(x, y);
    this._stage.setScale(scale);
  }
}
