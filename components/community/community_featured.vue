<template name="featured">
	<view class="featuredView">
		<view class="featuredtTitleView">
			<view class="titleText">
				<text>精选小区</text>
			</view>
			<image class="tieleImg" src='../../static/img/base/left@2x.png' @click="community"></image>
		</view>
		<view class="page-section swiper">
		    <view class="page-section-spacing">
				<scroll-view class="tab-container" scroll-x="true" @scroll="scroll" scroll-left="120">
					<block v-for="(item, index) in choiceEstateData" :key="index">
						<view class="item" @click="moreCommunity(item.id)">
							<view class="img">
							  <image :src="imgUrl(item.img)" mode=""></image>
							</view>
							<view class="titleinfoView">
								<view class="titleView">
									<text>{{item.title}}</text>
								</view>
								<view class="titleInfo">
									<view class="second_total">
										<text>房源<text style="color: #DF2D23">{{item.second_total}}</text>套</text>
									</view>
									<view class="price">
										<text style="color: #DF2D23">{{item.second_total}}元/㎡</text>
									</view>
								</view>
							</view>
						</view>
					</block>           
				</scroll-view>
		    </view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'featured',
	props: ['choiceEstateData'],
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
		imgUrl(url) {
			return this.fun.getImgSrc(url);
		},
		moreCommunity(index) {//跳转页面
			this.fun.navTo(`/pages/community/community?id=${index}`);
		},
		community(){
			this.fun.navTo('/pages/community/index');
		}
	}
}
</script>

<style scoped>
	@import url("./css/community_featured.css");
</style>
