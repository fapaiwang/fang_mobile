<template>
	<view>
		<TopNav></TopNav>
		<view class="top"></view>
		<Mobile :mobile.sync="phone" :code.sync="captcha" :cap.sync="cap"></Mobile>
		<Password :pwd.sync="password" :newpwd.sync="newPasswd"></Password>
		<button class="login_btn" @click="login">立即登录</button>
		<Bottom></Bottom>
	</view>
</template>

<script>
	import TopNav from '@/components/login/topNav.vue';
	import Bottom from '@/components/login/footer.vue';
	import Mobile from '@/components/login/mobile.vue';
	import Password from '@/components/login/password.vue';
	export default {
		components:{
			TopNav,
			Mobile,
			Password,
			Bottom
		},
		data() {
			return {
				phone:'',
				captcha:"",
				cap:"",
				password:"",
				newPasswd:"",
			}
		},
		methods: {
			login(){
				if (this.phone.length < 11) {
					thi.fun.showMsg("请输入正确的手机号码");
					return false;
				}
				if (this.captcha.length=="") {
					thi.fun.showMsg("验证码不能为空");
					return false;
				}
				if (this.captcha != this.cap) {
					thi.fun.showMsg("验证码不正确");
					return false
				}
				if (this.password.length < 6) {
					thi.fun.showMsg("新密码最少6位");
					return false;
				}
				if (this.newPasswd.length < 6) {
					thi.fun.showMsg("确认新密码最少6位");
					return false;
				}
				if (this.newPasswd != this.password) {
					thi.fun.showMsg("两次密码不一致");
					return false
				}
			},
			onInput(){
				if (this.mobile != "" && this.captcha !="" && this.pwd !="" && this.newpwd !="")
				console.log(1111)
			}
		}
	}
</script>

<style scoped>
	.top{
		margin-top: 48upx !important;
	}
	.login_btn{
		background:#CF2924;
		border-radius:51upx;
		width: 90%;
		font-size:32upx;
		color: #fff;
		margin-top: 157upx;
	}
</style>
