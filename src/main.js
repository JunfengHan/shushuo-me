// ---> build VUE
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
// import store from './store'
import { routerMode } from './config/env'
// import './config/rem'
import FastClick from 'fastclick'

if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function() {
		FastClick.attach(document.body)
	}, false)
}

Vue.use(VueRouter)

const router = new VueRouter({
	routes,
	mode: routerMode,
	strict: process.env.NODE_ENV !== 'production',
	scrollBehivior (to, from, savedPositon) {
		if (savedPositon) {
			return savedPositon
		} else {
			if (from.meta.keepAlive) {
				from.meta.savedPositon = document.body.scrollTop
			}

			return { x: 0, y: to.meta.savedPositon || 0}
		}
	}
})

new Vue({
	router,
	// store
}).$mount('#app')