<template>
	<view>
		<view class="featuredView">
			<view class="featuredtTitleView">
				<view class="titleText">
					<text>小区房源</text>
				</view>
			</view>
			<view class="page-section swiper">
			    <view class="page-section-spacing">
					<scroll-view class="tab-container" scroll-x="true" @scroll="scroll" scroll-left="120">
						<block v-for="(item, index) in qualityEstateData" :key="index">
								<view class="recpmmend_item" @click="moreCommunity(item.id)">
									<view class="img">
										<image :src="imgUrl(item.img)" mode=""></image>
									</view>
									<view class="houseInfo">
										<text class="houseTit fontOverflow">{{item.title}}</text>
										<text class="houseDesc fontOverflow">{{`${item.room}室${item.living_room}厅 | ${item.acreage}㎡`}}</text>
										<view class="qipaiPrice fontOverflow">
											市场价：<text class="fontRed">{{item.price}}万</text>
										</view>
									</view>
								</view>
						</block>           
					</scroll-view>
			    </view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'recommend_hosue',
	props: ['qualityEstateData'],
	data() {
		return {
			indicatorDots: false,
			autoplay: true,
			interval: 2000,
			duration: 500,
			scrollTop: 0,
			old: {
				scrollTop: 0
			}
		}
	},
	methods: {
		scroll: function(e) {
			this.old.scrollTop = e.detail.scrollTop
		},
		imgUrl(icon) {
			return this.fun.getImgSrc(icon);
		},
		houseDeatil:function(e){
			location.href = "detail"
			console.log(e)
		},
		moreCommunity(index) {//跳转页面
			this.fun.navTo(`/pages/detail/index?id=${index}`);
		}
	}
}
</script>

<style>
	@import url("./css/recommend_house.css");
</style>
