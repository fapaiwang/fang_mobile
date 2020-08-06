<template name='banner'>
	<view class="uni-padding-wrap">
	    <view class="page-section swiper">
	        <view class="page-section-spacing">
	            <swiper class="swiper" :circular="true" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item v-for="(item,index) in bannerdata" :key="index">
						<image class="swiper-item" :src="getImgUrl(item.setting.fileurl)"></image>
	                </swiper-item>
	            </swiper>
	        </view>
	    </view>
	</view>
</template>

<script>
	export default {
		name: 'banner',
		props:["bannerdata"],
		data() {
			return {
				indicatorDots: false,
				autoplay: true,
				interval: 2000,
				duration: 500,
			}
		},
		methods: {
			getImgUrl(ImgSrc){
				return this.fun.getImgSrc(ImgSrc);
			}
		}
	}
	
</script>

<style scoped>
	.uni-padding-wrap{
		padding: 0 30upx;
		margin-bottom: 30upx;
	}
	.page-section-spacing,.swiper{
		height:300px;
	}
	.swiper-item {
		width:690px;
		height:300px;
		border-radius:10px;
	}
</style>
