<template>
	<view>
		<Head></Head>
		<view class="login_input">
			<view class="login_img">
				<image src="../../static/img/login/mobile.png"></image>
			</view>
			<input placeholder="请输入手机号" class="login_inp" v-model="phone"/>
		</view>
		<view class="login_input">
			<view class="login_img">
				<image src="../../static/img/login/fork.png"></image>
			</view>
			<input placeholder="请输入密码" class="login_inp" v-model="pwd" type="password"/>
		</view>
		<view class="login_txt">
			<text @click="register">没有账号？去注册</text>
			<text @click="forget">忘记密码？</text>
		</view>
		<button class="login_btn" @click="login">立即登录</button>
		<Bottom></Bottom>
	</view>
</template>

<script>
	import Head from '@/components/login/head.vue';
	import Bottom from '@/components/login/footer.vue';
	
	export default {
		components:{
			Head,
			Bottom
		},
		data() {
			return {
				phone:"",
				pwd:""
			}
		},
		created() {
			var _self = this;
			uni.getStorage({
				key:_self.fun.userInfo,
				success:function(res){
					uni.navigateBack({
					    delta: 2
					});
				},
			})
		},//
		methods: {
			childMethod(){
				
			},
			register(){
				this.fun.navTo("./register")
			},
			forget(){
				this.fun.navTo("./forget")
			},
			login(){
				if (this.phone.length <11) {
					this.fun.showMsg("手机号码不正确");
					return false;
				}
				if (this.pwd == "") {
					this.fun.showMsg("密码不能为空");
					return false;
				}
				if (this.pwd.length == "") {
					this.fun.showMsg("密码小于6位");
					return false;
				}
				var _self = this;
				this.fun.getReq(this.baseUrl+'/api/login_pwd',{mobile:this.phone,password:this.pwd})
				// this.fun.getReq('http://fang.al/api/login_pwd',{mobile:this.phone,password:this.pwd})
				.then((res)=>{
					console.log(res[1].data,"login");
					console.log(this.phone)
					console.log(this.pwd)
					console.log(this.baseUrl+'/api/login_pwd')
					if (Number(res[1].data.code) ==10000) {
						uni.setStorage({
							key:_self.fun.userInfo,
							data:res[1].data.data
						})
						uni.switchTab({
							url:"/pages/index/index"
						})
					} else {
						this.fun.showMsg(res[1].data.msg);
						return fasle;
					}
				}).catch((err)=>{
					// this.fun.showMsg(err)
					// return fasle;
				})
			}
			
		}
	}
</script>

<style scoped>
	@import url("./css/login_mobile.css");
</style>
