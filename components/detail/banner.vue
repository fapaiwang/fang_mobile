<template>
	<view>
		<uni-swiper-dot :info="info" :current="current" field="title" :mode="mode">
		    <swiper class="swiper-box" @change="change">
		        <swiper-item v-for="(item ,index) in info" :key="index">
		            <view class="swiper-item">
						<image class="swiper-item" :src="getImgUrl(item.url)"></image>
						<text class="free" :style="{background:bannerCol}">{{bannerTit}}</text>
		            </view>
		        </swiper-item>
		    </swiper>
		</uni-swiper-dot>
	</view>
</template>

<script>
	import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue"
	
	export default {
		props: ["info","bannerTit","bannerCol"],
		components:{
			uniSwiperDot
		},
		name: "homeBanner",
		data() {
			return {
				current: 0,
				mode: 'nav'
			};
		},
		methods:{
			getImgUrl(ImgSrc){
				return this.fun.getImgSrc(ImgSrc)
			},
			change(e) {
				this.current = e.detail.current;
			}
		}
	}
</script>

<style>
	.free{
		padding: 21upx 23upx;
		border-radius:5px;
		position: absolute;
		left: 0;
		top: 0;
		color:#FFFEFA;
		z-index: 1;
		text-align: center;
		font-size: 30upx;
	}
</style>
