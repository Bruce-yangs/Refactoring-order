var express = require('express')
var app = express()
var appData = require('./data.json')
const proxy = require('http-proxy-middleware');//引入代理中间件

var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;

var apiRoutes = express.Router();

apiRoutes.get('/seller', function (req, res) {
  res.json({
    errno: 0,
    data: seller
  });
});

apiRoutes.get('/goods', function (req, res) {
  res.json({
    errno: 0,
    data: goods
  });
});

apiRoutes.get('/ratings', function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  });
});

// app.use(express.static('./src'));
//将服务器代理到localhost:8080端口上[本地服务器为localhost:3000]
// const apiProxy = proxy('/api', {
//   target: 'http://localhost:8080',
//   changeOrigin: true
// });
app.use('/api', apiRoutes)

 // app.use('/api/*', apiProxy);//api子目录下的都是用代理
app.listen(3000, () => {
  console.log('Listening on: http://localhost:3000');
});
