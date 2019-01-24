/**
 * api请求地址
 */
import { baseUrl } from './env'

// 账号登录
const accountLogin = baseUrl+ '/api/v0' + '/user/login'
// 账号注册
const accountRegister = baseUrl+ '/api/v0' + '/user/register'

export default {
    accountLogin,
    accountRegister,
}



