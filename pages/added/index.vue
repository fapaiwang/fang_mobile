<template>
	<view class="bg">
		<image src="../../static/img/base/bg.png" class="bgImg"></image>
		<text class="desc">程序猿小哥哥正在开发~</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
.bg{
	width: 750upx;
	height: 482upx;
	left: 50%;
	top: 35%;
	position: absolute;
	display: inline-block;
	transform: translate(-50%,-50%);
}
.bgImg{
	width: 750upx;
	height: 482upx;
}
.desc{
	width:100%;
	height:35upx;
	font-size:36upx;
	font-family:Adobe Heiti Std;
	font-weight:normal;
	color:rgba(51,51,51,1);
	line-height:38upx;
	text-align: center;
	justify-content: center;
	display: block;
	margin-top: 63upx;
}
</style>
