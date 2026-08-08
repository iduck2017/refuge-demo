import Phaser from 'phaser';
import { AppModel } from './app';
import { GameModel } from './model/common/game/game';
import {
  APP_BACKGROUND,
  AppView,
  STAGE_HEIGHT,
  STAGE_MARGIN,
  STAGE_WIDTH,
} from './views/app';

/**
 * Boots the application view and keeps its camera synchronized with the
 * browser viewport.
 */
class Main extends Phaser.Scene {
  private _app?: AppModel;

  /**
   * Create the main Phaser scene.
   */
  constructor() {
    super('main');
  }

  /**
   * Load assets required by the application view.
   *
   * @returns Nothing.
   */
  preload() {
    this.load.image(APP_BACKGROUND, '/app-view.png');
  }

  /**
   * Build the game and view models after scene assets are ready.
   *
   * @returns Nothing.
   */
  create() {
    const zoom = this.applyCamera();
    const game = new GameModel();
    const view = new AppView({
      scene: this,
      assets: game.assets,
    });
    this._app = new AppModel({ game, view });
    view.resize(zoom);
    this.scale.on(Phaser.Scale.Events.RESIZE, this.resize, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.shutdown, this);
  }

  /**
   * Reapply camera layout and text resolution after a viewport resize.
   *
   * @returns Nothing.
   */
  private resize() {
    const zoom = this.applyCamera();
    this._app?.view?.resize(zoom);
  }

  /**
   * Fit the logical stage inside the available viewport and center it.
   *
   * @returns Camera zoom applied to the logical stage.
   */
  private applyCamera() {
    const availableWidth = this.scale.width * (1 - STAGE_MARGIN * 2);
    const availableHeight = this.scale.height * (1 - STAGE_MARGIN * 2);
    const widthZoom = availableWidth / STAGE_WIDTH;
    const heightZoom = availableHeight / STAGE_HEIGHT;
    const zoom = Math.min(widthZoom, heightZoom);
    const width = STAGE_WIDTH * zoom;
    const height = STAGE_HEIGHT * zoom;
    const x = Math.round((this.scale.width - width) / 2);
    const y = Math.round((this.scale.height - height) / 2);
    const camera = this.cameras.main;
    camera.setViewport(x, y, width, height);
    camera.setOrigin(0, 0);
    camera.setZoom(zoom);
    camera.setScroll(0, 0);
    return zoom;
  }

  /**
   * Release scene listeners and destroy the active application view.
   *
   * @returns Nothing.
   */
  private shutdown() {
    this.scale.off(Phaser.Scale.Events.RESIZE, this.resize, this);
    this._app?.view?.destroy();
    this._app = undefined;
  }
}

const initialDpr = window.devicePixelRatio;

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#11131a',
  scale: {
    parent: 'game',
    mode: Phaser.Scale.NONE,
    width: window.innerWidth * initialDpr,
    height: window.innerHeight * initialDpr,
    zoom: 1 / initialDpr,
  },
  scene: [Main],
};

const game = new Phaser.Game(config);

window.addEventListener('resize', () => {
  const dpr = window.devicePixelRatio;
  game.scale.resize(
    window.innerWidth * dpr,
    window.innerHeight * dpr,
  );
  game.scale.setZoom(1 / dpr);
});
