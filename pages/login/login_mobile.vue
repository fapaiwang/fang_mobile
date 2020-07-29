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
				key:"user",
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
				this.fun.getReq(this.baseUrl+'/api/login_pwd',{mobile:this.phone,password:this.pwd})
				.then((res)=>{
					if (Number(res[1].data.code) ==10000) {
						uni.setStorage({
							key:"userInfo",
							data:res[1].data.data
						})
						uni.setStorage({
							key:"user",
							data:this.phone
						})
						uni.navigateBack({
							delta:2
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
	.login_input{
		display: flex;
		flex-flow: row;
		width:90%;
		height:102upx;
		border:2upx solid #EFEFF4;
		border-radius:51upx;
		margin:0 auto 30upx auto;
		box-sizing: border-box;
	}
	.login_inp{
		width: 100%;
		height: 100%;
		line-height: 90upx;
		height: 90upx;
	}
	.login_img{
		width: 48upx;
		height: 48upx;
		margin: 30upx;
	}
	.login_img image{
		width: 48upx;
		height: 48upx;
	}
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
