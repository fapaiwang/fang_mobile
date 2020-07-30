<template>
	<view>
		<view class="top_nav">
			<text @click="close">
				X
			</text>
			<text @click="login">登录</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			login(){
				this.fun.navTo("/pages/login/login");
			},
			close(){
				uni.switchTab({
					url:"/pages/mine/mine"
				})
			},
		}
	}
</script>

<style scoped>
	.top_nav{
		width: 90%;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		margin-top: 30upx;
	}
	.top_nav text{
		height:36upx;
		font-size:28upx;
		font-family:PingFang SC;
		color:#333;
		line-height:36upx;
	}
</style>
