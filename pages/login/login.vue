<template>
	<view>
		<Head></Head>
		<Mobile :mobile.sync="phone" :code.sync="captcha" :cap.sync="cap"></Mobile>
		<view class="login_txt">
			<text @click="register">没有账号？去注册</text>
			<text @click="login_mobile">账号密码登录</text>
		</view>
		<button class="login_btn" @click="getLogin">立即登录</button>
		<Bottom></Bottom>
	</view>
</template>

<script>
	import Head from '@/components/login/head.vue';
	import Mobile from '@/components/login/mobile.vue';
	import Bottom from '@/components/login/footer.vue';
	export default {
		components:{
			Head,
			Mobile,
			Bottom
		},
		data() {
			return {
				phone:"",
				captcha:"",
				cap:""
			}
		},
		created() {
			var _self = this;
			uni.getStorage({
				key:"user",
				success:function(res){
					uni.navigateBack({
						delta:1
					})
				},
			})
		},
		methods: {
			getLogin(){
				if (this.phone =="") {
					this.fun.showMsg("手机号码不正确");
					return false;
				}
				if (this.captcha =="") {
					this.fun.showMsg("验证码不能为空");
				}
				// if (this.captcha != this.cap) {
				// 	this.fun.showMsg("验证码不正确");
				// 	return false;
				// }
				this.fun.getReq(this.baseUrl+'/api/login',{user_name:this.phone,code:this.captcha})
				.then((res)=>{
					console.log(res[1])
					// if (res[1].code ==200) {
					// 	this.fun.navTo("../../pages/mine/mine");
					// }
				}).catch((err)=>{
					this.fun.showMsg(err)
				})
			},
			register(){//注册
				this.fun.navTo("../../pages/login/register")
			},
			login_mobile(){
				this.fun.navTo("../../pages/login/login_mobile")
			}
		}
	}
</script>

<style scoped>
	.login_txt{
		width: 90%;
		display: flex;
		flex-flow: row;
		justify-content: space-between;
		margin: 0 auto;
		color: #666;
		font-size:24upx;
		font-family:PingFang SC;
		font-weight:500;
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
