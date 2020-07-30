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
	export default {
		props: ["info","bannerTit","bannerCol"],
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
		border-radius:5px;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
		text-align: center;
		font-size:28px;
		font-family:PingFang SC;
		font-weight:bold;
		width:140upx;
		height:70upx;
		line-height: 70upx;
		color: #fff;
	}
</style>
