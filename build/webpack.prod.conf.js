var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var MiniCssExtractPlugin = require("mini-css-extract-plugin")
var OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var env = config.build.env

var webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    // ---> 只在生产环境下使用 css 提取，有利于开发环境下热重载
                    { 
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            /*
                            * 复写 css 文件中资源路径
                            * webpack3.x 配置在 extract-text-webpack-plugin 插件中
                            * 因为 css 文件中的外链是相对与 css 的，
                            * 我们抽离的 css 文件在可能会单独放在 css 文件夹内
                            * 引用其他如 img/a.png 会寻址错误
                            * 这种情况下所以单独需要配置 ../，复写其中资源的路径
                            */
                            // publickPath 相对于 output.path
                            // by default it use publicPath in webpackOptions.output
                            publicPath: '../'
                        }
                    },
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    // 打包后 js 文件的输出
    output: {
        path: config.build.assetsRoot,
        // 入口文件的文件名
        filename: utils.assetsPath('js/[name].js'),
        // chunk文件的文件名
        chunkFilename: utils.assetsPath('js/[name].[chunkhash:6].min.js')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        // 抽离css into its own file
        new MiniCssExtractPlugin({
            // 和 webpackOptions.output 一样，配置抽离的 css 文件名
            filename: utils.assetsPath('css/[name].[hash:6].css'),
            chunkFilename: utils.assetsPath('css/[id].[hash:6].css')
        }),
        new HtmlWebpackPlugin({
            filename: config.build.index,
            template: 'index.html',
            favicon: 'favicon.ico',
            inject: true,
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency',
            // html 文件压缩
            minify: {
                removeComments: true, // 移除注释
                minifyJS: true, // 压缩js
                minifyCSS: true, // 压缩css
                collapseWhitespace: true // 去除空格
            }
        })
    ],
    // ****** 优化 ******
    optimization: {
        minimizer: [
            // 使用 UglifyJsPlugin 插件覆盖默认的 minimizer,丑化代码
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: true,
                    cache: true,
                    parallel: true,
                    sourceMap: true // set to true if you want JS source maps
                }
            }),
            // 生产环境下压缩 css
            new OptimizeCSSAssetsPlugin({})
        ],
        // split vendor 和 公共 js into its own file
        splitChunks: {
            // 对所有的 chunk 进行抽离，同步和异步的代码都会被抽离 
            chunks: "all",
            /**
             * https://webpack.docschina.org/plugins/split-chunks-plugin/#splitchunks-cachegroups
             * cacheGroups 可以继承或覆盖 splitChunks.* 里的选项
             */
            cacheGroups: {
                // 提取 node_modules 中代码
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                },
                // https://webpack.docschina.org/plugins/split-chunks-plugin/#split-chunks-example-1
                // Create a commons-async chunk, which includes all code shared between entry points
                commons: {
                    // async 设置提取异步代码中的公用代码
                    chunks: "async",
                    name: 'commons-async',
                    /**
                     * minSize 默认为 30000
                     * 想要使代码拆分按照我们的设置来
                     * 需要减小 minSize
                     */
                    minSize: 0,
                    // 至少为两个 chunks 的公用代码
                    minChunks: 2
                },
                // 添加一个 styles chunk, 打包css文件为单文件
                styles: {
                    test: '/\.css/',
                    name: 'styles',
                    chunks: "all",
                    minChunks: 1,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        },
        /**
         * 对应原来的 minchunks: Infinity
         * 提取 webpack 运行时代码
         * 直接置为 true 或设置 name
         */
        runtimeChunk: {
            name: 'manifest'
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