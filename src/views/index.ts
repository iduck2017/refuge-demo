import Phaser from 'phaser';
import { Model, useEffect } from 'set-piece';

export type ViewProps = {
  scene: Phaser.Scene;
  x?: number;
  y?: number;
};

export const INK_COLOR = 0x5a3d22;
export const INK_WIDTH = 0.5;

/**
 * Base class for Container-backed Phaser views managed by the set-piece model
 * hierarchy.
 *
 * Child views automatically mount their Containers under the Container of
 * their logical parent.
 */
export abstract class View extends Model {
  public readonly container: Phaser.GameObjects.Container;
  private _destroyed = false;

  protected get isRootView() {
    return false;
  }

  /**
   * Create a detached Container at the view's local position.
   *
   * @param props - Scene and optional local coordinates.
   */
  constructor(props: ViewProps) {
    super();
    this.container = new Phaser.GameObjects.Container(
      props.scene,
      props.x ?? 0,
      props.y ?? 0,
    );
  }

  /**
   * Add a Phaser Game Object to this view's Container.
   *
   * @param graph - Display object owned by this view.
   * @returns The same display object for fluent construction.
   */
  protected add<T extends Phaser.GameObjects.GameObject>(graph: T) {
    this.container.add(graph);
    return graph;
  }

  /**
   * Construct a child view using this Container's Scene.
   *
   * This removes the need to pass the same Scene through each view layer.
   *
   * @param ViewType - Child view constructor.
   * @param props - Child properties excluding the inherited Scene.
   * @returns Newly constructed child view.
   */
  protected createView<P extends ViewProps, V extends View>(
    ViewType: new (props: P) => V,
    props: Omit<P, 'scene'>,
  ) {
    return new ViewType({
      ...props,
      scene: this.container.scene,
    } as P);
  }

  /**
   * Synchronize the Phaser display parent with the reactive model parent.
   *
   * Root views mount on the Scene display list, child views mount under their
   * parent View Container, and unowned views remain detached.
   *
   * @returns Nothing.
   */
  @useEffect()
  private handleParentChange() {
    if (this._destroyed) return;
    const parent = this.parent;
    if (parent instanceof View) {
      if (this.container.parentContainer !== parent.container) {
        parent.container.add(this.container);
      }
      return;
    }
    const current = this.container.parentContainer;
    if (current) current.remove(this.container);
    if (this.isRootView) {
      if (!this.container.displayList) {
        this.container.scene.add.existing(this.container);
      }
      return;
    }
    this.container.removeFromDisplayList();
  }

  /**
   * Recursively destroy child views, this Container, and model references.
   *
   * Repeated calls are ignored.
   *
   * @returns Nothing.
   */
  public destroy() {
    if (this._destroyed) return;
    this._destroyed = true;
    this.children.forEach(child => {
      if (!(child instanceof View)) return;
      child.destroy();
    });
    this.container.destroy();
    this.unlink();
  }
}
