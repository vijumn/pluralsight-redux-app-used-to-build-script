/* eslint-disable no-console */
import express from "express";
import webpack from "webpack";
import path from "path";
import config from "../webpack.config.dev";
import open from "open";
import history from "connect-history-api-fallback";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(history());

app.use(
  webpackDevMiddleware(compiler, {
    logLevel: "warn",
    silent: true,
    stats: "errors-only",
    publicPath: config.output.publicPath
  })
);

app.use(webpackHotMiddleware(compiler));

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../src/index.html"));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
