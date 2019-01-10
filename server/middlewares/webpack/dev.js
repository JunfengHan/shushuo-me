const webpack = require('webpack')
const views = require('koa-views')
const serve = require('koa-static')
const { resolve } = require('path')

const r = path => resolve(__dirname, path)

export const dev = async app => {
    /**
     * ---> 在这里打包前端项目，前后端还不算完全分离
     * 如果想完全的前后端分离，需要在 build/dev-server.js里做相关配置，
     * 并且在 package.json 中做配置
     * ---> 这样需要启动两次服务，第一次启动后端 server
     * ---> 第二次启动前端项目，向后端服务器发起请求
     * ---> 因为跨域问题，后端可以用 koa-cors 允许跨域请求
    **/

    app.use(serve(r('../views')))
    app.use(views(r('../views')), {
        extension: 'html'
    })

    app.use(async (ctx) => {
        await ctx.render('index.html')
    })
}