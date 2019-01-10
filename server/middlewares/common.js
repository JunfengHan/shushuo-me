import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
import session from 'koa-session'
import cors from 'koa-cors'

export const addBodyParser = app => {
    app.use(bodyParser())
}

export const addLogger = app => {
    app.use(logger())
}

export const addSession = app => {
    app.keys = ['shushuo-trailer']

    const CONFIG = {
        key: 'koa:sess',
        maxAge: 86400000,
        overWrite: true,
        httpOnly: false,
        signed: true,
        rolling: false
    }

    app.use(session(CONFIG, app))
}

export const addCors = app => {
    app.use(cors())
}