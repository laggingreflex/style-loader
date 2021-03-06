// Commands:
// SOURCE_MAP=yes npm run test:manual
const ENABLE_SOURCE_MAP =
  typeof process.env.SOURCE_MAP !== 'undefined'
    ? Boolean(process.env.SOURCE_MAP)
    : false;

module.exports = {
  devtool: ENABLE_SOURCE_MAP ? 'source-map' : false,
  mode: 'development',
  output: {
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        exclude: [
          /\.module\.css$/i,
          /\.lazy\.css$/i,
          /\.lazy\.module\.css$/i,
          /\.link\.css$/i,
        ],
        use: [
          {
            loader: require.resolve('../../dist/index.js'),
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: ENABLE_SOURCE_MAP,
            },
          },
        ],
      },
      {
        test: /\.module\.css$/i,
        exclude: [/\.lazy\.css$/i, /\.link\.css$/i, /\.lazy\.module\.css$/i],
        use: [
          {
            loader: require.resolve('../../dist/index.js'),
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: ENABLE_SOURCE_MAP,
              modules: true,
            },
          },
        ],
      },
      {
        test: /\.lazy\.css$/i,
        use: [
          {
            loader: require.resolve('../../dist/index.js'),
            options: { injectType: 'lazyStyleTag' },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: ENABLE_SOURCE_MAP,
            },
          },
        ],
      },
      {
        test: /\.lazy\.module\.css$/i,
        use: [
          {
            loader: require.resolve('../../dist/index.js'),
            options: { injectType: 'lazyStyleTag' },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: ENABLE_SOURCE_MAP,
              modules: true,
            },
          },
        ],
      },

      {
        test: /\.link\.css$/i,
        use: [
          {
            loader: require.resolve('../../dist/index.js'),
            options: { injectType: 'linkTag' },
          },
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.scss$/i,
        exclude: /\.lazy\.scss$/i,
        use: [
          {
            loader: require.resolve('../../dist/index.js'),
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: ENABLE_SOURCE_MAP,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              // eslint-disable-next-line global-require
              implementation: require('sass'),
              sourceMap: ENABLE_SOURCE_MAP,
            },
          },
        ],
      },
      {
        test: /\.lazy\.scss$/i,
        use: [
          {
            loader: require.resolve('../../dist/index.js'),
            options: { injectType: 'lazyStyleTag' },
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: ENABLE_SOURCE_MAP,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              // eslint-disable-next-line global-require
              implementation: require('sass'),
              sourceMap: ENABLE_SOURCE_MAP,
            },
          },
        ],
      },

      {
        test: /\.png$/i,
        loader: 'file-loader',
      },
    ],
  },
  devServer: {
    hot: true,
    contentBase: __dirname,
  },
};
