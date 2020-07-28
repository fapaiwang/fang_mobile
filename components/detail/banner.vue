<template>
	<view>
		<uni-swiper-dot :info="info" :current="current" field="title" :mode="mode">
		    <swiper class="swiper-box" @change="change">
		        <swiper-item v-for="(item ,index) in info" :key="index">
		            <view class="swiper-item">
						<image class="swiper-item" :src="getImgUrl(item.url)"></image>
		            </view>
		        </swiper-item>
		    </swiper>
		</uni-swiper-dot>
	</view>
</template>

<script>
	import uniSwiperDot from "@/components/uni-swiper-dot/uni-swiper-dot.vue"
	
	export default {
		props: ["info"],
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
			getImgUrl(icon){
			   return this.fun.getImgSrc(icon);
			},
			change(e) {
				this.current = e.detail.current;
			}
		}
	}
</script>

<style>

</style>
