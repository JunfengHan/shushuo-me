# About

> 个人前端项目，打造自己的个人博客，从前到后，打通自己的知识点。

# 说明

> shushuo.me 接口文档
> 开发环境 win7 node 6.10.2   mongoDB 3.4.10
> 部署环境 阿里云 CentOS 7.3 64位

## 技术栈

NodeJs + Koa + mongodb + mongoose + vue + es6/7

## 项目运行

```
请确保系统已经安装以下应用
1、node (6.0 及以上版本)
2、mongodb (已经启动)

```

```
git clone https://github.com/JunfengHan/shushuo-me.git  

cd shushuo-me

npm install

npm run dev
(先启动后端项目，然后启动前端项目)

```

## 目标功能

- [ ] 文章展示 
- [ ] 文章添加与编辑
- [ ] 用户注册与登录
- [ ] 密码修改
- [ ] 用户头像上传
- [ ] 管理员权限认证
- [ ] 流量统计
- [ ] 评论功能 
- [ ] 部署上线

## API接口文档

文档地址 [link](https://note.youdao.com/)

## 项目布局

```
.
├── build                           项目打包构建配置
│   ├── build.js                    打包
│   |── check-version.js            运行环境检查
│   |── dev-server.js               开发环境运行
|   |── utils.js                    工具类
│   |── vue-loader.conf.js             
│   |── webpack.base.conf.js        webpack基础配置      
│   |── webpack.dev.conf.js         webpack开发环境配置
│   └── webpack.prod.conf.js        webpack生产环境配置
├── config                          运行配置
│   ├──                  
│   └── 
├── data                            数据中心
│   ├── schema                      数据结构与模型
│   │   └── user.js                 用户数据结构与模型
|   |—— init.js                     数据结构初始化
├── db                              本地临时数据库
├── lib                             通用功能库
│   ├── decorator.js                修饰符
├── middlewares                     中间件
│   ├── router.js                   路由中间件
├── routes                          路由文件
│   ├── user.js                     用户
├── service                         server服务
│   ├── user.js                     用户
├── index.js                        入口文件
├── package.json
└── README.md                  
.

```

### 部分文件说明
- nodemon.json nodemon的配置文件，开发环境下监听软重启node服务
```
{
    <!-- 项目重启 -->
    "restartable": "rs",
    "ignore": [
        ".git",
        "node_modules/**/node_modules"
    ],
    "verbose": true,
    "execMap": {
        "js": "node --harmony"
    },
    <!-- 监听文件变化 -->
    "watch": [
        "server/",
        "src/page"
    ],
    <!-- 监听所有后缀文件变化 -->
    "ext": "js json" 
}

```