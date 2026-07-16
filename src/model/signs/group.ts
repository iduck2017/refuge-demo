import { Model, useAction, useChild, useMemo, useModel } from 'set-piece';
import type { SignModel } from '.';

export type SignsProps = {
  signs?: SignModel[];
};

@useModel('signs')
export class SignsModel extends Model {
  @useChild()
  private _signs: SignModel[];
  @useMemo()
  public get signs() { return [...this._signs]; }

  constructor(props: SignsProps = {}) {
    super();
    this._signs = props.signs ?? [];
  }

  @useAction()
  public add(sign: SignModel) {
    const exists = this._signs.includes(sign);
    const owned = sign.parent === this;
    if (exists && owned) return;
    if (exists || sign.parent) return;
    this._signs.push(sign);
  }

  @useAction()
  public remove(sign: SignModel) {
    const index = this._signs.indexOf(sign);
    if (index < 0) return;
    if (sign.parent !== this) return;
    this._signs.splice(index, 1);
  }
}
