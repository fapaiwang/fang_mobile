<template>
	<view class="fang_test">
		<view class="top_20" >
			<text @click="video_min_cache">小视频_七牛</text>
		</view>
		<view class="top_20" @click="video_min">
			<text>小视频_本地</text>
		</view>
		<view class="top_20" >
			<text @click="video_max_cache">大视频_七牛</text>
		</view>
		<view class="top_20">
			<text @click="video_max">大视频_本地</text>
		</view>
		<!-- 
		http://image.fangpaiwang.com//video/WW_HOMEPAGE_1_4.mp4
		http://image.fangpaiwang.com//video/e3be1a46370da03795cffba7d3790a58.mp4 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			// video_min(){
			// 	this.fun.navTo("/pages/test/video_min")
			// },
			// video_max(){
			// 	this.fun.navTo("/pages/test/video_max")
			// },
			// video_max_cache(){
			// 	this.fun.navTo("/pages/test/video_max_cache")
			// },
			// video_min_cache(){
			// 	this.fun.navTo("/pages/test/video_min_cache")
			// }
		}
	}
</script>

<style>
	.fang_test view{
		margin-top: 20upx;
	}
	.top_20{
		/* margin-top: 20upx; */
	}
</style>