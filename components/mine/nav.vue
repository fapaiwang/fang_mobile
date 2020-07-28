<template>
	<view>
		<view class="header">
			<view class="header_login">
				<view class="avatar"><image mode=""></image></view>
				<view class="header_text" v-if="isShow">
					<text @click="login">登录</text>
					/
					<text @click="register">注册</text>
				</view>
			</view>
			<view class="change_info" @click="changeInfo">
				修改资料
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				isShow:true,
			}
		},
		created() {
			this.getStore()
		},
		onShow:function(){
			this.getStore()
		},
		onLoad:function(){
			uni.$on("login",(val)=>{
				console.log(333,val);
			})
		},
		methods: {
			childMethod(val){
				this.isShow = val;
			},
			login(){
				uni.navigateTo({
					url:"../../pages/login/login"
				})
			},
			register(){
				uni.navigateTo({
					url:"../../pages/login/register"
				})
			},
			getStore(){
				var _self = this;
				uni.getStorage({
					key:"user",
					success:function(res){
						_self.isShow = false;
					},
					fail:function(){
						_self.isShow = true;
					}
				})
			}
		}
	}
</script>

<style scoped>
.header{
	display: flex;
	justify-content: space-between;
	padding: 0 30upx;
	width: 90%;
	height:124upx;
	margin-top: -40upx;
}
.header_login {
    display: flex;
}
.avatar{
	width:120upx;
	height:120upx;
	background:#ccc;
	border:4upx solid rgba(255,255,255,1);
	border-radius:50%;
	float: left;
	position: relative;
}
.avatar image{
	width:120upx;
	height:120upx;
}
.header_login{
	justify-content: center;
}
.header_text{
	font-size:36upx;
	font-family:PingFang SC;
	font-weight:bold;
	color:#333;
	height:60upx;
	line-height:60upx;
	margin-left: 26upx;
	margin-top:70upx;
}
.change_info{
	margin-top: 33upx;
	width:138upx;
	height:54upx;
	background:#fff;
	border:2upx solid #333;
	border-radius:27upx;
	font-size:24upx;
	font-family:PingFang SC;
	font-weight:bold;
	line-height:60upx;
	text-align: center;
	margin-top: 60upx;
}
</style>
