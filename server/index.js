const Koa = require('koa')
const { resolve } = require('path')
const config = require('./config/server')
const { connect, initSchemas, initAdmin } = require('./data/init')
const R = require('ramda')
const MIDDLEWARES = ['router']

// ---> 使用函数式编程加载中间件
const useMiddlewares = (app) => {
    R.map(
        R.compose(
            R.forEachObjIndexed(
                initWith => initWith(app)
            ),
            require,
            name => resolve(__dirname, `./middlewares/${name}`)
        )
    )(MIDDLEWARES)
}

;(async () => {
    // ---> 连接数据库,初始化所有schema
    await connect()
    initSchemas()
    // 初始化一个用户，用于测试
    await initAdmin()

    const app = new Koa()

    await useMiddlewares(app)

    app.listen(config.port, function (err) {
        if (err) {
            console.log('服务器监听出错了：' + err)
        }
    })
    console.log('Server Running at 4000')
})()