<template>
	<div class="loginContainer center">
		<div class="logo">
			<img class="logo-img" src="../../assets/images/shushuo.png" alt="">
		</div>
		<form class="login-form">
			<section class="input_container">
                <input type="text" placeholder="邮箱/手机号码" v-model.lazy="userAccount">
            </section>
			<section class="input_container">
                <input placeholder="密码" type="password" v-model="passWord">
            </section>
		</form>
		<p class="login_tips">
            温馨提示：未注册过的账号，登录时将自动注册
        </p>
		<div class="login_container" @click="login">登录</div>
		<alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
	</div>
</template>

<script>
	import alertTip from '../../components/common/alertTip'
	import { accountLogin } from '../../service/getData'

	export default {
		data() {
			return {
				userAccount: null, //用户名
				passWord: null, //密码
				showAlert: false, //显示提示组件
				alertText: null, //提示的内容
			}
		},
		methods: {
			async login() {
				if (!this.userAccount) {
					this.showAlert = true;
					this.alertText = '请输入手机号/邮箱/用户名';
					return
				} else if (!this.passWord){
					this.showAlert = true;
					this.alertText = '请输入密码';
					return
				}
	
				//用户名登录
				this.userInfo = await accountLogin(this.userAccount, this.passWord);
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

	.login_tips{
		.sc(.5rem, red);
		padding: .4rem .6rem;
		line-height: 1.2rem;
		a{
			color: #3b95e9;
		}
	}

	.login_container{
        margin: 0 .5rem 1rem;
        .sc(.7rem, #fff);
        background-color: #4cd964;
		padding: .5rem 0;
		color: #fff;
        border: 1px;
        border-radius: 0.15rem;
        text-align: center;
    }
</style>