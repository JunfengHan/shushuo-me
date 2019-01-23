// ---> 状态管理
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
	login: false,  //是否登录
	imgPath:null,  //头像地址
	userInfo: null, //用户信息
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})