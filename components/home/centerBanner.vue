<template name='centerBanner'>
	<view class="uni-padding-wrap">
	    <view class="page-section swiper">
	        <view class="page-section-spacing">
	            <swiper class="swiper" :circular="true" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item v-for="(item,index) in centerBannerdata" :key="index">
						<navigator url="/pages/detail/taxes">
							<image class="swiper-item" :src="getImgUrl(item.setting.fileurl)" mode="heightFix"></image>
						</navigator>
	                </swiper-item>
	            </swiper>
	        </view>
	    </view>
	</view>
</template>

<script>
	export default {
		name: 'centerBanner',
		props:["centerBannerdata"],
		data() {
			return {
				indicatorDots: false,
				autoplay: true,
				interval: 2000,
				duration: 500,
			}
		},
		methods: {
			getImgUrl(icon){
				return this.fun.getImgSrc(icon);
			},
		}
	}
	
</script>

<style scoped>
	@import url("./css/centerBanner.css");
</style>
