const {
    controller,
    get,
    post,
    put
} = require('../lib/decorator')

const {
    checkPassword,
    checkCode,
    validateUserInfo,
    addUser
} = require('../service/user')

@controller('/api/v0/user')
class userController {
    // 用户注册
    @post('/register')
    async register (ctx, next) {
        const userInfo = ctx.request.body
        console.log('userInfo---------------', userInfo)
        const isLegal = await validateUserInfo(userInfo)
        const isCode = await checkCode(userInfo.verificationCode)
    
        if (isCode && isLegal) {
            // 注册用户
            await addUser(userInfo.email, userInfo.password, userInfo.phoneNumber)
        }
    
        return (ctx.body = {
            "code": 1,
            "mes": "success",
            "data": {}
        })
    }

    // 用户登录
    @post('/login')
    async login (ctx, next) {
        const { email, password } = ctx.request.body
        const matchData = await checkPassword(email, password)

        if (!matchData.match) {
            return (ctx.body = {
                "code": 0,
                "mes": "用户名或密码不正确",
                "data": {}
            })
        }

        if (matchData.match) {
            return (ctx.body = {
                "code": 1,
                "mes": "success",
                // TODO:返回给前端的信息
                "data": {
                    user_id: 'user_id'
                }
            })
        }

        return (ctx.body = {
            "code": 0,
            "mes": "用户名或密码不正确",
            "data": {}
        })
    }

    // 忘记密码
    @post('/forgetPassword')
    // async forgetPassword(ctx, next) {
    // }

    // 获取用户列表
    @get('/')
    async userList (ctx, next) {
        // TODO: 必须检查用户权限，只用特殊管理员才有获取用户的权限
    }

}

exports.userController = userController