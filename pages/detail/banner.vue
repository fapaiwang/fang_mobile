<template name='banner'>
	<view class="uni-padding-wrap">
	    <view class="page-section swiper">
	        <view class="page-section-spacing">
	            <swiper class="swiper swiperList" :circular="true" :indicator-dots="indicatorDots"  :interval="interval" :duration="duration" mode="scaleToFill" :style="{height:Height+'px'}">
					<swiper-item v-for="(item,index) in info" :key="index" mode="scaleToFill">
						<image :src="getImgUrl(item.url)" mode="scaleToFill"></image>
	                </swiper-item>
	            </swiper>
	        </view>
	    </view>
	</view>
</template>

<script>
	export default {
		name: "homeBanner",
		data() {
			return {
				indicatorDots: false,
				interval: 2000,
				duration: 500,
				info: [],
				Height:0
			};
		},
		created:function(){
			this.getHeight();
		},
		onLoad:function(option){
			this.getHeight();
			this.fun.getReq(this.baseUrl+"/api/second/houseDetail",{"id":option.id})
			.then((res)=>{
				if (Number(res[1].data.code) == 20000) {
					this.getHome();
				} else {
					uni.setNavigationBarTitle({
						title:res[1].data.data.title,
					})
					this.info = res[1].data.data.file;
				}
			})
		},
		methods:{
			getHeight(){
				var _self = this;
				uni.getSystemInfo({
					success:function(res){
						_self.Height = res.windowHeight;
					},
				})
			},
			getImgUrl(ImgSrc){
				return this.fun.getImgSrc(ImgSrc)
			},
			getHome() {
				uni.navigateBack({
					delta:1
				})
			},
		}
	}
</script>
<style scoped>
	.swiperList{
		padding-top: 50%;
	}
</style>
