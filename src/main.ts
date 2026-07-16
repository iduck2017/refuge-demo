import Phaser from 'phaser';
import { APP_BACKGROUND, AppView } from './views/app';

class Main extends Phaser.Scene {
  private _app?: AppView;

  constructor() {
    super('main');
  }

  preload() {
    this.load.image(APP_BACKGROUND, '/app-view.png');
  }

  create() {
    this._app = new AppView({ scene: this });
    this._app.resize(this.scale.gameSize);
    this.scale.on(Phaser.Scale.Events.RESIZE, this.resize, this);
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.shutdown, this);
  }

  private resize(size: Phaser.Structs.Size) {
    this._app?.resize(size);
  }

  private shutdown() {
    this.scale.off(Phaser.Scale.Events.RESIZE, this.resize, this);
    this._app?.destroy();
    this._app = undefined;
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#1d1f27',
  scale: {
    parent: 'game',
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  scene: [Main],
};

new Phaser.Game(config);
