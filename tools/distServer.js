import path from 'path';
import express from 'express';
import open from 'open';
import colors from 'colors';

/*eslint-disable no-console */

const app = express();
const port = 3000;

app.use(express.static('dist'));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    const url = `http://localhost:${port}`;
    console.log(`Opening default browser at ${url}`.green);
    open(url);
  }
});
