const http = require('http');
const httpProxy = require('http-proxy');

/* 访问 localhost:5050 得到 http://lvh.me:3000 */
const proxy = httpProxy.createProxyServer({})
const server = http.createServer(function(req, res) {
  proxy.web(req, res, { target: 'http://lvh.me:3000/' });
});


/* 访问 localhost:5050 直接跳转到 terget
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

