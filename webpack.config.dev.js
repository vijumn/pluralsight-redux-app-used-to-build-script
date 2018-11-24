const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map", // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and https://webpack.github.io/docs/configuration.html#devtool
  entry: ["./src/index"],
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist"), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: "/", // Necessary so historyApiFallback works
    filename: "bundle.js"
  },
  devServer: {
    // Options: https://webpack.js.org/configuration/dev-server/
    // quiet: true, // Disable output
    // open: true, // auto open browser
    stats: "minimal", // output minimal stats to command line
    overlay: true, // overlay errors in browser
    historyApiFallback: true // load deep links
  },
  plugins: [new HtmlWebpackPlugin({ template: "src/index.html" })],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, "src"),
        loader: "babel-loader"
      },
      {
        test: /(\.css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { sourcemap: true }
          }
        ]
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader" },
      {
        test: /\.(woff|woff2)$/,
        options: { prefix: "font/", limit: 5000 },
        loader: "url-loader"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        options: { limit: 10000, mimetype: "application/octet-stream" },
        loader: "url-loader"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        options: { limit: 10000, mimetype: "image/svg+xml" },
        loader: "url-loader"
      }
    ]
  }
};
