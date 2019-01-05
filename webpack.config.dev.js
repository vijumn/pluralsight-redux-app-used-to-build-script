const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

// Required by babel-preset-react-app
process.env.NODE_ENV = "development";

module.exports = {
  mode: "development",
  target: "web",
  devtool: "cheap-module-source-map", // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
  entry: "./src/index", // Default, so can omit.
  output: {
    path: path.resolve(__dirname, "dist"), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: "/", // Necessary so historyApiFallback works
    filename: "bundle.js"
  },
  devServer: {
    // Options: https://webpack.js.org/configuration/dev-server/
    stats: "minimal", // output minimal stats to command line
    overlay: true, // overlay errors in browser
    historyApiFallback: true, // load deep links
    // Last 3 lines necessary to avoid console errors in Chrome: https://github.com/webpack/webpack-dev-server/issues/851#issuecomment-449550071
    disableHostCheck: true,
    headers: { "Access-Control-Allow-Origin": "*" },
    https: false
  },
  plugins: [
    // Note that because the plugin does a direct text replacement, the value given to it must include actual quotes inside of the string itself.
    // Typically, this is done either with alternate quotes, such as '"production"', or by using JSON.stringify('production').
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify("http://localhost:3000")
    }),
    new HtmlWebpackPlugin({ template: "src/index.html" })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        // Processed bottom up, so eslint-loader should be last.
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /(\.css)$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};
