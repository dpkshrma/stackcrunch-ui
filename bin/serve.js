var express = require('express');
var serveStatic = require('serve-static');

var app = express();

app.use(serveStatic('build', { 'setHeaders': setHeaders }));

// Set header to force download
const setHeaders = (res, path) => {
  const gzipArgs = ['--gzip', '-z'];
  if (process.argv.length>2 && gzipArgs.indexOf(process.argv[2]) !== -1) {
    res.setHeader('Content-Encoding', 'gzip');
  }
};

const port = 4000;
app.listen(port, () => {
  console.log(`Serving on ${port}`);
});
