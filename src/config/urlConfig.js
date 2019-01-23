/**
 * api请求地址
 */
import baseUrl from './env'

// 账号登录
const accountLogin = baseUrl + '/user/login'
// 账号注册
const accountRegister = baseUrl + '/user/register'

export default {
    accountLogin,
    accountRegister,
}



