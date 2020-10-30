<template>
	<view class="footer">
		<view class="home" @click="goMenu('home')">
			<image src="../../static/img/tab/home@2x.png"></image>
			<text>首页</text>
		</view>
		<view class="strong" @click="goMenu('strong')">
			<image src="../../static/img/tab/focus@2x.png"></image>
			<text>重点推荐</text>
		</view>
		<view class="kf" @click="goMenu('kf')">
			<image src="../../static/img/tab/customer@2x.png"></image>
			<text>客服</text>
		</view>
		<view class="mine" @click="goMenu('mine')">
			<image src="../../static/img/tab/mine@2x.png"></image>
			<text>我的</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods: {
			goMenu(menuName) {
				if (menuName == 'home') {
					uni.switchTab({
						url:"/pages/index/index"
					})
				}
			}
		}
	}
</script>

<style scoped>
.footer {
	position: fixed;
	width: 100%;
	z-index: 20;
	bottom: 0;
	height: 98upx;
	display: flex;
	flex-flow: row wrap;
	background: #fff;
}
.footer view{
	width: 25%;
	font-size: 20upx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #666666;
	justify-content: center;
	text-align: center;
}
.footer text{
	width: 100%;
	text-align: center;
}
.footer image{
	display: block;
	margin: 13upx auto 6upx auto;
}
.home image{
	width: 48upx;
	height: 44upx;
}
.strong image{
	width: 45upx;
	height: 44upx;
}
.kf image{
	width: 47upx;
	height: 40upx;
	margin-bottom: 10upx !important;
}
.mine image{
	width: 37upx;
	height: 42upx;
	margin-bottom: 8upx !important;
}
</style>
