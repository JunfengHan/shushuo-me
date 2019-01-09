const path = require('path')

module.exports = {
    build: {
        env: {
            NODE_ENV: "production"
        },
        index: path.resolve(__dirname, '../')
    }
}