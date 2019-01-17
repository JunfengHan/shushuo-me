var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var friendlyErrors = require('friendly-errors-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

// ---> add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
    // webpack工作模式，告知webpack 使用相应模式的内置优化
    mode: 'development',
    module: {
        noParse: /lodash/,
        rules: [{
            test: /\.(sa|sc|le|c)ss$/,
            use: [
                'vue-style-loader',
                'css-loader', // translates CSS into CommonJS
                'less-loader'
                // 'sass-loader',            // compiles Less to CSS
                // loader: "style-loader"    // creates style nodes from JS strings
            ]
        }]
    },
    // 此选项控制是否生成，以及如何生成 source map
    /************* 不同的值会明显影响到构建(build)和重新构建(rebuild)的速度 ************/
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            favicon: 'favicon.ico',
            inject: true
        }),
        // 优化 webpack 报错输出
        new friendlyErrors()
    ]
})