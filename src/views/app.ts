import Phaser from 'phaser';
import { useChild, useView } from 'set-piece';
import type { ItemGroupModel } from '../model/common/item/group';
import { useGraph, View } from './index';
import type { ViewProps } from './index';
import {
  ITEM_GAP,
  inventoryItemSize,
  InventoryView,
} from './inventory';
import { IllustrationView } from './illustration';
import { flockHeight, FlockView } from './flock';
import { WorkbenchView } from './workbench';

export const STAGE_HEIGHT = 540;
export const STAGE_WIDTH = STAGE_HEIGHT * 1120 / 720;
export const STAGE_MARGIN = 0.05;
const STAGE_PADDING = 16;
const PANEL_GAP = 8;

export const APP_BACKGROUND = 'app-background';

export type AppViewProps = ViewProps & {
  items: ItemGroupModel;
};

@useView()
export class AppView extends View {
  @useGraph()
  private readonly _background: Phaser.GameObjects.Image;
  @useChild()
  private _illustration: IllustrationView;
  @useChild()
  private _flock: FlockView;
  @useChild()
  private _items: InventoryView;
  @useChild()
  private _workbench: WorkbenchView;

  constructor(props: AppViewProps) {
    super(props);
    const contentWidth = STAGE_WIDTH - STAGE_PADDING * 2 - PANEL_GAP;
    const contentHeight = STAGE_HEIGHT - STAGE_PADDING * 2;
    const illustrationWidth = Math.round(contentWidth * 0.4);
    const flockWidth = contentWidth - illustrationWidth;
    const rightX = STAGE_PADDING + illustrationWidth + PANEL_GAP;
    const flockY = STAGE_PADDING;
    const itemsY = flockY + flockHeight(flockWidth) + PANEL_GAP;
    const contentBottom = STAGE_HEIGHT - STAGE_PADDING;
    const itemsHeight = contentBottom - itemsY;
    const itemSize = inventoryItemSize(flockWidth, itemsHeight);
    const workbenchHeight = itemSize * 2 + ITEM_GAP;
    const illustrationHeight = contentHeight - workbenchHeight - PANEL_GAP;
    const workbenchY = STAGE_PADDING + illustrationHeight + PANEL_GAP;

    this._background = this._scene.add.image(0, 0, APP_BACKGROUND);
    this._background.setOrigin(0);
    this._background.setDisplaySize(STAGE_WIDTH, STAGE_HEIGHT);
    this._illustration = new IllustrationView({
      scene: this._scene,
      x: STAGE_PADDING,
      y: STAGE_PADDING,
      width: illustrationWidth,
      height: illustrationHeight,
    });
    this._workbench = new WorkbenchView({
      scene: this._scene,
      x: STAGE_PADDING,
      y: workbenchY,
      width: illustrationWidth,
      height: workbenchHeight,
    });
    this._flock = new FlockView({
      scene: this._scene,
      x: rightX,
      y: flockY,
      width: flockWidth,
    });
    this._items = new InventoryView({
      scene: this._scene,
      items: props.items,
      x: rightX,
      y: itemsY,
      width: flockWidth,
      height: itemsHeight,
    });
  }

  public resize(zoom: number) {
    this._scene.children.list.forEach((child) => {
      if (!(child instanceof Phaser.GameObjects.Text)) return;
      child.setResolution(zoom);
    });
  }
}
