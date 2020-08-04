declare namespace RescanButtonScssNamespace {
  export interface IRescanButtonScss {
    button: string;
  }
}

declare const RescanButtonScssModule: RescanButtonScssNamespace.IRescanButtonScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: RescanButtonScssNamespace.IRescanButtonScss;
};

export = RescanButtonScssModule;
