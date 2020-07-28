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
				if (ImgSrc == null || ImgSrc == "" ) {
					return "../../static/img/base/default.png";
				}
				if (ImgSrc.substr(0,4) == "http") {
					return ImgSrc;
				} else if (ImgSrc.substr(0,1) == "/") {
					return this.baseUrl+`${ImgSrc}`;
				} else {
					return this.baseUrl+`/${ImgSrc}`;
				}
			}
		}
	}
	
</script>

<style scoped>
	.uni-padding-wrap{
		padding: 0;
	}
	.page-section-spacing,.swiper{
		height: 350upx;
	}
	.swiper-item {
		border-radius: 10upx;
		height: 100%;
		width: 100%;
	}
</style>
