import {
  Model,
  useChild,
  useMemo,
  useRoute,
  useState,
} from 'set-piece';
import { AssetNutritionModel } from './nutrition';
import { AssetsModel } from './group';
import { AssetFreshnessModel } from './freshness';

export type AssetProps = {
  freshness?: AssetFreshnessModel;
  name?: string;
  nutrition?: AssetNutritionModel;
};

/**
 * Base class for named assets with optional capability models.
 */
export abstract class AssetModel extends Model {
  @useRoute(() => AssetsModel)
  private _container?: AssetsModel;
  @useMemo()
  public get container() { return this._container; }

  @useState()
  private readonly _name: string;
  @useMemo()
  public get name() { return this._name; }

  @useChild()
  private _nutrition?: AssetNutritionModel;
  @useMemo()
  public get nutrition() { return this._nutrition; }

  @useChild()
  private _freshness?: AssetFreshnessModel;
  @useMemo()
  public get freshness() { return this._freshness; }

  /**
   * Create an asset with optional name, nutrition, and freshness models.
   *
   * @param props - Asset configuration.
   */
  constructor(props: AssetProps = {}) {
    super();
    this._name = props.name ?? '';
    this._freshness = props.freshness;
    this._nutrition = props.nutrition;
  }
}
