const path = require('path')

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/dist/',
        productionSourceMap: true,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },
    dev: {
        env: require('./dev.env'),
        port: 4000,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        // ---> 代理路径
        /* context: [
            '/home',
            '/article',
            '/comment'
        ],
        proxypath: 'http://api.shushuo.me:4000',
        */
        // ---> 使用axios跨域请求
        proxyTable: {},
        cssSouceMap: false
    }
}