<template name='infoScroll'>
	<view class="infoScrollView">
		<view class="infoScrolContent">
			<view class="infoIcon">
				<image class="infoIconimg" src='../../static/img/home/infoIcon@2x.png'></image>
			</view>
			<view class="infoContent">
				<swiper class="swiper" :circular="true" :indicator-dots="indicatorDots" :vertical = "true" :autoplay="autoplay" :interval="interval" :duration="duration">
					<!-- <block > -->
						<swiper-item v-for="(item, index) in todayAddData" :key="index" class="infoItemView" @click="getTargetUrl(item.id)">
							<text class="infoItemTitle">今日新增:</text>
							<text>{{item.title}}</text>
						</swiper-item>
					<!-- </block> -->
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'infoScroll',
		props: ['todayAddData'],
		data() {
			return {
				indicatorDots: false,
				autoplay: true,
				interval: 2000,
				duration: 500,
			}
		},
		methods: {
			getTargetUrl(index){ //跳转页面
				this.fun.navTo(`/pages/news/detail?id=${index}`);
			}
		}
	}
</script>

<style scoped>
	@import url("./css/infoScroll.css");
</style>
