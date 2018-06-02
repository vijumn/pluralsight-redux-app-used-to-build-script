import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'), //This global makes sure React is built in prod mode. https://facebook.github.io/react/downloads.html
  __DEV__: false // potentially useful for feature flags. More info: https://github.com/petehunt/webpack-howto#6-feature-flags
};

export default {
  mode: 'production',
  devtool: 'source-map', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
  entry: './src/index',
  target: 'web',
  output: {
    path: path.resolve(path.join(__dirname, 'dist')), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('styles.css'),
  ],
  module: {
    rules: [
      {test: /\.js$/, include: path.join(__dirname, 'src'), loader: 'babel-loader'},
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: require.resolve('style-loader'),
          use: [
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                minimize: true,
                sourceMap: true,
              }
            }
          ]
        })
      },
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
      {test: /\.(woff|woff2)$/, options: {prefix: 'font/', limit: 5000}, loader: 'url-loader'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, options: {limit: 10000, mimetype: 'application/octet-stream'}, loader: 'url-loader'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, options: {limit: 10000, mimetype: 'image/svg+xml' }, loader: 'url-loader'}
    ]
  }
};
