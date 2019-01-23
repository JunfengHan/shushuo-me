import {
    RECORD_USERINFO,
    GET_USERINFO,
    RETSET_NAME,
    OUT_LOGIN,
    SAVE_IMG
} from './mutation-types'
import { setStore, getStore } from '../lib/utils'

export default {
    // 记录用户信息
	[RECORD_USERINFO](state, info) {
		state.userInfo = info;
		state.login = true;
		setStore('user_id', info.user_id);
    },
    //获取用户信息存入vuex
	[GET_USERINFO](state, info) {
		if (state.userInfo && (state.userInfo.username !== info.username)) {
			return;
		};
		if (!state.login) {
			return
		}
		if (!info.message) {
			state.userInfo = {...info};
		} else {
			state.userInfo = null;
		}
    },
    //修改用户名
	[RETSET_NAME](state,username) {
		state.userInfo = Object.assign({}, state.userInfo,{username})
    },
    //退出登录
	[OUT_LOGIN](state) {
		state.userInfo = {};
		state.login = false;
	},
	//保存图片
	[SAVE_IMG](state, imgPath) {
		state.imgPath = imgPath;
	},
}




