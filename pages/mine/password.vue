<template>
	<view>
		<view class="taxes_warp">
			<Mobile :mobile.sync="phone" :code.sync="captcha" :cap.sync="cap"></Mobile>
			<Password :pwd.sync="password" :newpwd.sync="newPasswd"></Password>
			<view class="logout" @click="edit">
				确定修改
			</view>
		</view>
	</view>
</template>

<script>
	import Mobile from '@/components/login/mobile.vue';
	import Password from '@/components/login/password.vue';
	
	export default {
		components:{
			Mobile,
			Password
		},
		data() {
			return {
				phone:"",
				captcha:"",
				cap:"",
				password:"",
				newPasswd:'',
			}
		},
		methods: {
			edit(){
				var _self = this;
				if (this.phone =="") {
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
				if (this.password.length<6) {
					this.fun.showMsg("密码不能小于6位");
					return false
				}
				if (this.newPasswd.length<6) {
					this.fun.showMsg("确认新密码不能小于6位");
					return false
				}
				if (this.newPasswd != this.password) {
					this.fun.showMsg("两次密码不一致");
					return false
				}
				let _param = {
					mobile:this.phone,
					sms_code:this.captcha,
					password:this.password,
					password2:this.newPasswd,
				}
				this.fun.getReq(this.baseUrl+'/api/registerDo',_param)
				.then((res)=>{
					if (res[1].data.code ==10000) {
						uni.clearStorage(_self.fun.userInfo)
						this.fun.navTo("/pages/login/login");
					}
				}).catch((err)=>{
					this.fun.showMsg(err)
				})
			}
		}
	}
</script>

<style scoped>
@import url("./css/edit.css");
</style>
