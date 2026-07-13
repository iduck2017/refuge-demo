import Phaser from 'phaser';
import { Model } from 'set-piece';

export type ViewProps = {
  scene: Phaser.Scene;
};

class GraphRegistry {
  private readonly _keys: Map<Function, string[]>;

  constructor() {
    this._keys = new Map();
  }

  public register(prototype: View, key: string) {
    const constructor = prototype.constructor;
    const keys = this._keys.get(constructor) ?? [];
    keys.push(key);
    this._keys.set(constructor, keys);
  }

  public query(view: View) {
    const keys: string[] = [];
    let prototype = Object.getPrototypeOf(view);
    while (prototype) {
      const constructor = prototype.constructor;
      const current = this._keys.get(constructor) ?? [];
      current.forEach(key => {
        if (keys.includes(key)) return;
        keys.push(key);
      });
      prototype = Object.getPrototypeOf(prototype);
    }
    return keys;
  }
}

const graphRegistry = new GraphRegistry();

export function useGraph() {
  return function(prototype: View, key: string) {
    graphRegistry.register(prototype, key);
  };
}

export abstract class View extends Model {
  protected readonly _scene: Phaser.Scene;

  constructor(props: ViewProps) {
    super();
    this._scene = props.scene;
  }

  public destroy() {
    this.children.forEach(child => {
      if (!(child instanceof View)) return;
      child.destroy();
    });
    graphRegistry.query(this).forEach(key => {
      const value: unknown = Reflect.get(this, key);
      if (value instanceof Phaser.GameObjects.GameObject) value.destroy();
      if (!Array.isArray(value)) return;
      value.forEach(item => {
        if (!(item instanceof Phaser.GameObjects.GameObject)) return;
        item.destroy();
      });
    });
    this.unlink();
  }
}
