<template>
	<div>
		<div class="home center">
			<p>{{msg}}</p>
			<router-link to="/login" class="login">
                <span>{{login}}</span>
            </router-link>
			<div class="home-img">
				<img src="../../assets/images/test.jpg">
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			msg: "欢迎来到主页",
			login: "登录/注册"
		}
	}
}
</script>

<style lang="less" scoped>
	@import "../../style/mixin";
	@import "../../style/common";

	.home {
		width: 100%;
		height: 100%;
	}

	.home > p {
		font-size: 24px;
		padding-left: 20px;
	}

	.home-img > img {
		.wh(300px, 300px)
	}

	.login {
		margin-left: 200px;
	}
</style>