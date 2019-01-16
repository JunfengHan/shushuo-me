var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var MiniCssExtractPlugin = require("mini-css-extract-plugin")
var HtmlWebpackPlugin = require('html-webpack-plugin')
var devMode = process.env.NODE_ENV !== 'production'

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
                devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
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
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        })
    ]
})