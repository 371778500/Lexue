var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('../config')
var opn = require('opn')
//lanzhiming
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
// var multipart = require('connect-multiparty')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session)
var db = require('../server/db')
var routes = require('../server/api')

var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')



// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)



var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
// https://github.com/chimurai/http-proxy-middleware#proxycontext-config
Object.keys(proxyTable).forEach(function (context) {
  console.log(context,"context")
  var options = proxyTable[context]
  console.log(options,"options")
  if (typeof options === 'string') {
    options = { target: options }
  }
  // 如果context的值是字符串(target)就将其转成对象,如果context是对象,不做操作.'/api' => target+'/api'，
  // eg. localhost:5001/api/login => http://academy.yonyou.com/api/login ，当然路径也可以被重写,使用http-proxy的options配置即可.
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
// 类似nginx后台配置前端一样,使用这个插件,可以在请求一个完整的地址时,跳转到一个候选的资源界面.
// app.use(require('connect-history-api-fallback')())
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

//暴露API
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(multipart());
app.use(session({
  secret: 'lexuemgr', // secret 的值建议使用随机字符串
  cookie: {
    maxAge: 60 * 1000 * 30, // 过期时间（毫秒）
    httpOnly: false
  },
  store: new MongoStore({
    url: db.dbUrl,
    touchAfter: 30 * 60
  }),
  resave: false,
  saveUninitialized: true
}))
app.use('/', routes)

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = 'http://localhost:' + port
  console.log('Listening at ' + uri + '\n')
  opn(uri)
})
