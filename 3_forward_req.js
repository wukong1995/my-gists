const http = require('http');
const fetch = require('node-fetch');
const url = require('url');

// fetch data
const fetchData = async (req, res) => {
  const { search } = url.parse(req.url);

  await fetch(`XXXXXXXX${search}`)
    .then(result => result.text())
    .then(result => {
      res.end(result);
    })
    .catch(err => {
      console.log(err);
    })
}

// create server
const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  const url = req.url;
  if (/^\/api/.test(url)) {
    fetchData(req, res);
  }
});

server.listen(65534, () => {
  console.log('listen on 65534');
});

// JSON.parse when get data
