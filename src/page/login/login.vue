<template>
	<div class="loginContainer center">
		<div class="logo">
			<img class="logo-img" src="../../assets/images/shushuo.png" alt="">
		</div>
		<form class="login-form">
			<section class="input_container">
                <input type="text" placeholder="邮箱/手机号码" autocomplete="username" v-model.lazy="userAccount">
            </section>
			<section class="input_container">
                <input placeholder="密码" type="password" autocomplete="current-password" v-model="passWord">
            </section>
			<section v-if="registerView" class="input_container">
                <input placeholder="再次确认密码" type="password" autocomplete="new-password" v-model="confirmPassword">
            </section>
		</form>
		<div class="register">
			<span v-if="registerView" :loginText="loginText">{{loginText}}</span>
			<span v-else :loginText="loginText">{{loginText}}</span>
			<div v-if="registerView" class="register_container" :registerBtnText="registerBtnText" @click="switchLogin">{{registerBtnText}}</div>
			<div v-else class="register_container" :registerBtnText="registerBtnText" @click="switchLogin">{{registerBtnText}}</div>
		</div>
		<div v-if="registerView" class="login_container" @click="login">{{loginBtnText}}</div>
		<div v-else class="login_container" @click="login">{{loginBtnText}}</div>
		<alert-tip v-if="showAlert" :show-hide='showAlert' @closeTip="closeTip" :alertText="alertText"></alert-tip>
	</div>
</template>

<script>
	import alertTip from '../../components/common/alertTip'
	import { accountLogin, accountRegister } from '../../service/getData'

	export default {
		data() {
			return {
				userAccount: null, //用户名
				passWord: null, //密码
				confirmPassword: null,
				showAlert: false, //显示提示组件
				alertText: null, //提示的内容
				registerView: false, // 注册视图
				loginText: '还没有账号，点去注册', // 登录提示
				registerBtnText: '注册', // 登录按钮
				loginBtnText: '登录'
			}
		},
		methods: {
			switchLogin() {
				this.registerView = !this.registerView;
				if (this.registerView) {
					this.loginText = "已有账号，点击登录"
					this.registerBtnText = "登录"
					this.loginBtnText = "注册"
				} else {
					this.loginText = "还没有账号，点去注册"
					this.registerBtnText = "注册"
					this.loginBtnText = "登录"
				}
				
			},
			async login() {
				if (!this.userAccount) {
					this.showAlert = true;
					this.alertText = '请输入手机号/邮箱/用户名';
					return
				} else if (!this.passWord){
					this.showAlert = true;
					this.alertText = '请输入密码';
					return
				} else if (!this.registerView && !this.confirmPassword) {
					this.showAlert = true;
					this.alertText = '请输入确认密码'
				} else if (this.confirmPassword ==! this.passWord) {
					this.showAlert = true;
					this.alertText = '两次输入的密码不一致'
				}

				if (!this.registerView) {
					// 用户名登录
					this.userInfo = await accountLogin({
							userCount: this.userAccount,
							password: this.passWord
						});
				} else {
					// 用户注册
					this.userInfo = await accountRegister({
							userCount: this.userAccount,
							password: this.passWord
						});
				}

				// 如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
                if (!this.userInfo.user_id) {
                    this.showAlert = true;
                    this.alertText = this.userInfo.message;
                    if (!this.loginWay) this.getCaptchaCode();
                }else{
                    this.RECORD_USERINFO(this.userInfo);
                    this.$router.go(-1);

                }
			},
			closeTip(){
                this.showAlert = false;
            }
		},
		components: {
			alertTip,
		}

	}
</script>

<style lang="less">
	@import "../../style/mixin";

	.loginContainer {
		padding-top: 1.95rem;
        p, span, input{
			font-family: Helvetica Neue,Tahoma,Arial;
			outline: none;
		}
		width: 16rem;
	}

	.logo-img {
		.wh(100px; 100px);
		.cl();
		margin-top: -120px;
	}

	.login-form {
		background-color: #fff;
		margin-top: .6rem;
		
		.input_container {
			display: flex;
			justify-content: space-between;
            padding: .6rem .8rem;
			border-bottom: 1px solid #f1f1f1;
            input {
                .sc(.7rem, #666);
            }
            button {
                .sc(.65rem, #fff);
                font-family: Helvetica Neue,Tahoma,Arial;
                padding: .28rem .4rem;
                border: 1px;
                border-radius: 0.15rem;
            }
            .right_phone_number{
                background-color: #4cd964;
            }
		}
	}

	.register{
		.wh(16rem, 1.8rem);
		line-height: 1.8rem;
		margin: .5rem 1rem;
	}
	.register > span {
		padding-left: 1rem;
		.sc(.5rem, #CCC);
	}
	.register_container {
        .sc(.7rem, #fff);
        background-color: hsl(120, 0%, 52%);
		padding: 0 .5rem;
		color: #fff;
        border: 1px;
        border-radius: 0.15rem;
        text-align: center;
		margin-left: 1rem;
		display: inline-block;
		cursor: pointer;
	}

	.login_container{
        margin: .5rem .5rem 1rem;
        .sc(.7rem, #fff);
        background-color: #4cd964;
		padding: .5rem 0;
		color: #fff;
        border: 1px;
        border-radius: 0.15rem;
		text-align: center;
		cursor: pointer;
    }
</style>