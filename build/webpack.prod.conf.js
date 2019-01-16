var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var MiniCssExtractPlugin = require("mini-css-extract-plugin")
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var devMode = process.env.NODE_ENV !== 'production'
var env = config.build.env

var webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader', 'less-loader'
                ]
            }
        ]
    },
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].js'),
        chunkFilename: utils.assetsPath('js/[name].[chunkhash].min.js')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        // extract css into its own file
        // new MiniCssExtractPlugin
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
        }),
        new HtmlWebpackPlugin({
            filename: config.build.index,
            template: 'index.html',
            inject: true,
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency'
        })
    ],
    optimization: {
        // compress .js files
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: false
                }
            })
        ],
        // split vendor js into its own file
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                default: false,
                vendors: false,
            }
        }
    }
})

if (config.build.productionGzip) {
    /**
     * 'compression-webpack-plugin' 插件可以将资源按 gzip等格式压缩
     */
    var CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

module.exports = webpackConfig