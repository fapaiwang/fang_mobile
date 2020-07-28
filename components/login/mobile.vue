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
				if (this.phone.length=="") {
					this.fun.showMsg("手机号不能为空")
					return false;
				}
				if (this.phone.length < 11 && !RegExp(/^1[\d]{10}$/).test(this.phone)) {
					this.fun.showMsg("手机号码不正确")
					return false;
				}
				this.fun.getReq(this.baseUrl+'/api/send_sms',{"mobile":this.phone}).then((res)=>{
					console.log("lalal",res[1].data);
					this.$emit("update:cap",res[1].data.msg)
				})
				
				if (time ==60){
					this.daojs();
				}
				this.updateVal()
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
				console.log(this.captcha);
				this.$emit("update:code",this.captcha)
			}
		}
	}
</script>

<style scoped>
@import url("../../common/css/login/login.css");
</style>
