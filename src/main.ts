import Phaser from 'phaser';

class Main extends Phaser.Scene {
  constructor() {
    super('main');
  }

  create() {
    const { width, height } = this.scale;
    const x = width / 2;
    const y = height / 2;
    const color = 0x1d1f27;
    const style = {
      color: '#eeeeee',
      fontSize: '32px',
    };
    const text = this.add.text(x, y, 'Refuge', style);
    this.add.rectangle(x, y, width, height, color);
    text.setOrigin(0.5);
  }
}

const dpr = window.devicePixelRatio;
const width = window.innerWidth * dpr;
const height = window.innerHeight * dpr;

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#1d1f27',
  scale: {
    parent: 'game',
    mode: Phaser.Scale.NONE,
    width,
    height,
    zoom: 1 / dpr,
  },
  scene: [Main],
};

const game = new Phaser.Game(config);

/* Render at device pixel density while preserving CSS-space dimensions. */
function resize() {
  const dpr = window.devicePixelRatio;
  const width = window.innerWidth * dpr;
  const height = window.innerHeight * dpr;

  game.scale.resize(width, height);
  game.scale.setZoom(1 / dpr);
}
window.addEventListener('resize', resize);
