const { Route } = require('../lib/decorator')
const { resolve } = require('path')

function router (app) {
    const apiPath = resolve(__dirname, '../routes')
    const router = new Route(app, apiPath)

    router.init()
}

exports.router = router