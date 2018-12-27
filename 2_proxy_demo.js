const http = require('http');
const httpProxy = require('http-proxy');

/* 访问 localhost:5050 得到 https://www.jiqizhixin.com */
const proxy = httpProxy.createProxyServer({})
const server = http.createServer(function(req, res) {
  proxy.web(req, res, { target: 'https://www.jiqizhixin.com' });
});


/* 访问 localhost:5050 直接跳转到 target
const proxy = httpProxy.createProxyServer({
  target: {
    protocol: 'https:',
    host: 'www.jiqizhixin.com'
  },
  changeOrigin: true,
  secure: false // Depends on your needs, could be false.
})
*/

console.log("listening on port 5050");
proxy.listen(5050);

