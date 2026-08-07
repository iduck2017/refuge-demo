import {
  useChild,
  useFrameConsumer,
  useRef,
  useView,
} from 'set-piece';
import { AssetsChangedFrame } from '../model/common/asset/frame';
import type { AssetsModel } from '../model/common/asset/group';
import type { AssetModel } from '../model/common/asset/index';
import { View } from './index';
import type { ViewProps } from './index';
import { AssetView } from './asset';

export const ASSET_GAP = 8;
const ASSET_COUNT = 6;

/**
 * Calculate the largest square asset size that fits the assets grid.
 *
 * @param width - Available grid width.
 * @param height - Available grid height.
 * @returns Rounded square asset size.
 */
export function assetSize(width: number, height: number) {
  const columnGaps = ASSET_GAP * (ASSET_COUNT - 1);
  const widthSize = (width - columnGaps) / ASSET_COUNT;
  const estimate = (height + ASSET_GAP) / (widthSize + ASSET_GAP);
  const rows = Math.max(Math.round(estimate), 1);
  const rowGaps = ASSET_GAP * (rows - 1);
  const heightSize = (height - rowGaps) / rows;
  return Math.round(Math.min(widthSize, heightSize));
}

export type AssetsViewProps = ViewProps & {
  height: number;
  assets: AssetsModel;
  width: number;
  x: number;
  y: number;
};

/**
 * Renders and synchronizes shared assets as a six-column slot grid.
 */
@useView()
export class AssetsView extends View {
  @useRef()
  private _model?: AssetsModel;

  @useChild()
  private _assets: AssetView[];

  /**
   * Create a bottom-aligned asset grid and render its initial model contents.
   *
   * @param props - Assets model, bounds, and local position.
   */
  constructor(props: AssetsViewProps) {
    super(props);
    this._model = props.assets;
    const columnGaps = ASSET_GAP * (ASSET_COUNT - 1);
    const widthSize = (props.width - columnGaps) / ASSET_COUNT;
    const estimate = (props.height + ASSET_GAP) / (widthSize + ASSET_GAP);
    const rows = Math.max(Math.round(estimate), 1);
    const rowGaps = ASSET_GAP * (rows - 1);
    const size = assetSize(props.width, props.height);
    const assetsWidth = size * ASSET_COUNT + columnGaps;
    const assetsHeight = size * rows + rowGaps;
    const startX = Math.round(
      (props.width - assetsWidth) / 2,
    );
    const startY = Math.round(
      props.height - assetsHeight,
    );
    const assets: AssetView[] = [];

    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < ASSET_COUNT; column += 1) {
        const x = startX + column * (size + ASSET_GAP);
        const y = startY + row * (size + ASSET_GAP);
        const asset = this.createView(AssetView, {
          drop: this.drop.bind(this),
          size,
          x,
          y,
        });
        assets.push(asset);
      }
    }
    this._assets = assets;
    this.render(props.assets.items);
  }

  /**
   * Rerender asset slots after the assets collection changes.
   *
   * @param frame - Diff frame containing the next ordered asset list.
   * @returns Promise resolved after the synchronous render update.
   */
  @useFrameConsumer(self => [self._model, AssetsChangedFrame])
  protected async handleAssets(frame: AssetsChangedFrame) {
    this.render(frame.detail.next);
  }

  /**
   * Move a dropped asset to the slot containing the pointer.
   *
   * @param asset - Asset being dropped.
   * @param x - Pointer world x-coordinate.
   * @param y - Pointer world y-coordinate.
   * @returns Nothing.
   */
  private drop(asset: AssetModel, x: number, y: number) {
    const index = this._assets.findIndex((view) => {
      return view.contains(x, y);
    });
    if (index < 0) return;
    this._model?.add(asset, index);
  }

  /**
   * Render an ordered asset list into the available slot views.
   *
   * @param assets - Assets to display by slot index.
   * @returns Nothing.
   */
  private render(assets: AssetModel[]) {
    this._assets.forEach((view, index) => {
      view.render(assets[index]);
    });
  }
}
