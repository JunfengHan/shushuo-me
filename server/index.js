const Koa = require('koa')
const { resolve } = require('path')

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
    const app = new Koa()

    await useMiddlewares(app)

    app.listen(4000)
    console.log('Server Running at 4000')
})()