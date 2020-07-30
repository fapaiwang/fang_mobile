<template>
	<view>
		<Mobile :mobile.sync="mobile" :code.sync="captcha" :cap.sync="cap"></Mobile>
		<Password :pwd.sync="pwd" :newpwd.sync="newpwd"></Password>
		<button class="login_btn" @click="login">重置密码</button>
		<Bottom></Bottom>
	</view>
</template>

<script>
	import Bottom from '@/components/login/footer.vue';
	import Mobile from '@/components/login/mobile.vue';
	import Password from '@/components/login/password.vue';
	export default {
		components:{
			Bottom,
			Mobile,
			Password
		},
		data() {
			return {
				mobile: "",
				captcha: "",
				cap:"",
				pwd: "",
				newpwd: "",
				showBtn: false
			}
		},
		methods: {
			getCode() {
				if (this.mobile.length < 11) {
					this.fun.showMsg("手机号码不正确");
					return false;
	
				}
			},
			login(){
				if (this.mobile =="") {
					this.fun.showMsg("手机号码不正确");
					return false
				}
				if (this.captcha =="") {
					this.fun.showMsg("验证码不能为空");
					return false
				}
				if (this.captcha != this.cap) {
					this.fun.showMsg("验证码不正确");
					return false
				}
				if (this.pwd.length<6) {
					this.fun.showMsg("密码不能小于6位");
					return false
				}
				if (this.newpwd.length<6) {
					this.fun.showMsg("确认新密码不能小于6位");
					return false
				}
				if (this.pwd != this.newpwd) {
					this.fun.showMsg("两次密码不一致");
					return false
				}
			}
		}
	}
</script>

<style scoped>
	@import url("./css/foget_mobile.css");
</style>
