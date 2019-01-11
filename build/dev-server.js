var config = require('../config')
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
var path = require('path')
var koa = require('koa')
var views = require('koa-views')
var serve = require('koa-static')
var opn = require('opn')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')

var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
var proxyTable = config.dev.proxyTable

var app = koa()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        hotMiddleware.publish({
            action: 'reload'
        })
        cb()
    })
})

/** 
 * 因为前后端分离，所以存在跨域问题，需要使用代理或者用 axios 向后端发起请求
**/
// ---> 代理模式
/* var context = config.dev.context

switch(process.env.NODE_ENV) {
    case 'dev': var proxypath = 'http://localhost:4000'; break;
    case 'proc': var proxypath = 'http://api.shushuo.me'; break;
    default: var proxypath = config.dev.proxypath
}
var options = {
    target: proxypath,
    changeOrigin: true
}
if (context.length) {
    app.use(proxyMiddleware(context, options))
} */

// ---> proxy api requests
Object.keys(proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = { target: options}
    }
    app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// server webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// server pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(serve(r(staticPath)))
app.use(views(r(staticPath)), {
    extension: 'html'
})

app.use(async (ctx) => {
    await ctx.render('index.html')
})

module.exports = app.listen(port, function(err) {
    if (err) {
        console.log(err)
        return
    }
    var uri = 'http://localhost:' + port
    console.log('Listening at ' + uri + '\n')

    // when env is testing, don't need open it
    if (process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
})