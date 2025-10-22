// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = false; // true for dev, false for production
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(process.env.PORT || 3000, (err) => {
    if (err) throw err;
    console.log(`Server ready on port ${process.env.PORT || 3000}`);
  });
});
