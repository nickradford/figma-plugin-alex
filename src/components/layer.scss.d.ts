declare namespace LayerScssNamespace {
  export interface ILayerScss {
    flexRight: string;
    flexSpread: string;
    layer: string;
    main: string;
    selected: string;
  }
}

declare const LayerScssModule: LayerScssNamespace.ILayerScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: LayerScssNamespace.ILayerScss;
};

export = LayerScssModule;
