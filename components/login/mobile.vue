<template>
	<view>
		<view class="login_input">
			<view class="login_img">
				<image src="../../static/img/login/mobile.png" mode=""></image>
			</view>
			<input placeholder="请输入手机号" class="login_inp" v-model="phone" @input="onInput"/>
		</view>
		<view class="login_input">
			<view class="login_img" >
				<image src="../../static/img/login/safe.png" mode=""></image>
			</view>
			<input placeholder="请输入验证码" class="login_inp" v-model="captcha" @input="onInput"/>
			<text class="code" @click="getCode">{{codeText}}</text>
		</view>
	</view>
</template>

<script>
	var time = 60;
	var interval;
	export default {
		props:["mobile","code","cap"],
		data() {
			return {
				captcha:'',
				phone:"",
				capVal:"",
				codeText:"获取验证码",
			}
		},
		methods: {
			onInput(){
				this.updateVal()
			},
			getCode() {
				var _self = this;
				if (_self.phone.length=="") {
					_self.fun.showMsg("手机号不能为空")
					return false;
				}
				if (_self.phone.length < 11 && !RegExp(/^1[\d]{10}$/).test(_self.phone)) {
					_self.fun.showMsg("手机号码不正确")
					return false;
				}
				_self.fun.getReq(_self.baseUrl+'/api/send_sms',{"mobile":_self.phone}).then((res)=>{
					
						this.capVal = res[1].data.data.code;
						if (time ==60){
							_self.daojs();
						}
						_self.updateVal()
				})
			},
			daojs(){
				interval = setInterval(()=>{
					if (time === 0) { 
					   time = 60;
					   this.codeText = "获取验证码";
					   clearInterval(interval)
					   return;
					} else {
						 time--;
						 this.codeText = time +'秒'
					}
				},1000)
			},
			updateVal(){
				this.$emit("update:mobile",this.phone)
				this.$emit("update:code",this.captcha)
				this.$emit("update:cap",this.capVal)
			}
		}
	}
</script>

<style scoped>
@import url("@/components/common/css/login/login.css");
</style>
