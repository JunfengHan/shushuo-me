import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const article = r => require.ensure([], () => r(require('../page/article/article')), 'article')
const articleDetail = r => require.ensure([], () => r(require('../page/article/children/articleDetail')), 'articleDetail')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const forget = r => require.ensure([], () => r(require('../page/forget/forget')), 'forget')
const profile = r => require.ensure([], () => r(require('../page/profile/profile')), 'profile')
const info = r => require.ensure([], () => r(require('../page/profile/children/info')), 'info')
const setInfo = r => require.ensure([], () => r(require('../page/profile/children/info/children/setInfo')), 'setInfo')

export default [{
	path: '/',
	component: App,
	children: [
		{
			path: '',
			redirect: '/home'
		},
		{
			path: '/home',
			component: home
		},
		{
			path: '/article',
			component: article,
			children: [
				{
					path: 'articleDetail',
					component: articleDetail
				}
			]
		},
		// 注册登录
		{
			path: '/login',
			component: login
		},
		// 修改密码
		{
			path: '/forget',
			component: forget
		},
		// 个人信息
		{
			path: '/profile',
			component: profile,
			children: [
				{
					path: 'info',
					component: info,
					children: [
						{
							path: 'setInfo',
							component: setInfo
						}
					]
				}
			]
		}
	]
}]