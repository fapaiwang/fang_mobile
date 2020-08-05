<template name='banner'>
	<view class="uni-padding-wrap">
	    <view class="page-section swiper">
	        <view class="page-section-spacing">
	            <swiper class="swiper" :circular="true" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item>
						<image class="swiper-item" :src="getImgUrl(info)"></image>
	                </swiper-item>
	            </swiper>
	        </view>
	    </view>
	</view>
</template>

<script>
	export default {
		name: 'banner',
		props:["info"],
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
	.page-section-spacing,.swiper{
		height:465upx;
	}
	.swiper-item {
		width:750upx;
		height:465upx;
		background:rgba(241,241,241,1);
	}
</style>
