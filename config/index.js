const path = require('path')

module.exports = {
    build: {
        env: {
            NODE_ENV: "production"
        },
        index: path.resolve(__dirname, '../shushuo/index.html')
    },
    dev: {
        env: {
            NODE_ENV: "development"
        },
        port: 4000
    }
}