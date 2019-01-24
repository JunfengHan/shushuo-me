import { getStore } from '../lib/utils'
import url from '../config/urlConfig'
import axios from 'axios'

/**
 * 获取用户信息
 */
export async function getUser () {
    try {
        const response = axios.get(url.login, {
            params: {
                user_id: getStore('user_id')
            }
        })
        return response
    } catch (error) {
        return error
    }
}

/**
 * 账号注册
 */
export async function accountRegister (param) {
    try {
        console.log(url.accountRegister)
        const response = axios.post(url.accountRegister, param)
        console.log('getData--------------------', response)
        return response
    } catch (error) {
        return '注册失败'
    }
}

/**
 * 账号密码登录
 */
export async function accontLogin () {
    try {
        const response = axios.post(url.accountLogin, {
            user_id: getStore('user_id')
        })
        return response
    } catch (error) {
        return '登录错误'
    }
}

