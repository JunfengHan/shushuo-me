var path = require('path')
var config = require('../config')
// var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var VueLoaderPlugin = require('vue-loader/lib/plugin')

var env = process.env.NODE_ENV

module.exports = {
    // 入口
    entry: {
        app: './src/main.js'
    },
    // 输出
    output: {
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath: config.dev.assetsPublicPath,
        filename: '[name].[hash].js'
    },
    // 解析规则
    resolve: {
        // 自动解析时的扩展名称，配制后可以在引入模块时不使用扩展名
        extensions: ['.js', '.vue', '.less', '.css', '.scss'],
        // 告诉 webpack 解析模块时应该搜索的目录
        modules: [path.join(__dirname, '../node_modules')],
        // 创建import 和 require 的别名
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.relative(__dirname, '../src/compontens')
        }
    },
    // 与resolve 对象的属性集合相同，但仅用于解析webpack 的 loader 包
    resolveLoader: {
        modules: [ 'node_modules' ],
        extensions: [ '.js', '.json' ],
        mainFields: [ 'loader', 'main' ]
    },
    // 这些选项决定了如何处理项目中的不同类型的模块
    module: {
        // 匹配请求规则数组
        rules: [{
            // 模块后缀匹配正则
            test: /\.vue$/,
            // 模块解析使用的loader
            use: 'vue-loader'
        }, {
            test: /\.css$/,
            // 从右向左应用解析模块
            use: ["style-loader", "css-loader", "postcss-loader"]
        },
        {
            test: /\.js$/,
            // 排除不需要使用loader解析的目录
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }, {
            test: /\.json$/,
            use: 'json-loader'
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        outputPath: 'images'
                    }
                }
            ]
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        outputPath: 'fonts'
                    }
                }
            ]
        }]
    },
    // webpack 插件列表
    plugins: [
        new VueLoaderPlugin(),
        require('autoprefixer') // 自动添加css前缀
    ]
}