<template>
	<div>
		<transition name="fade" mode="out-in">
			<keep-alive>
				<router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
		</transition>
		<transition name="fade" mode="out-in">
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</transition>
	</div>
</template>

<script>
import svgIcon from './components/common/svg';
export default {
	components: {
		svgIcon
	}
}
</script>

<style lang="less" scoped>
	@import './style/common';
	.fade-enter-active, .fade-leave-active {
		transition: opacity .3s;
	}
	.fade-enter, .fade-leave-active {
		opacity: 0;
	}
</style>