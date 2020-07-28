<template name="featured">
	<view class="featuredView">
		<view class="featuredtTitleView">
			<view class="titleText">
				<text>推荐房源</text>
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
										<text class="fontRed">{{item.qipai}}万</text>
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
			return `https://www.fangpaiwang.com/${icon}`;
		},
		houseDeatil:function(e){
			location.href = "detail"
			console.log(e)
		},
		moreCommunity(index) {//跳转页面
			uni.redirectTo({
				url:`../../pages/detail/index?id=${index}`
			})
		}
	}
}
</script>

<style>
	scroll-view {
	  width: 100%;
	  white-space: nowrap;  // 不让它换行
	}
	.recpmmend_item {
	  width: 49%;
	  padding-right: 20upx;
	  display: inline-block;
	  vertical-align: top;
	 }
	 .img {
		display: inline-block;
		width: 100%;
		height: 208upx;
	}
	.img image {
	  width: 100%;
	  height: 100%;
	  border-radius: 10upx;
	}
	
	.featuredView {
		margin-top: 45upx;
		padding: 0 30upx;
		margin-bottom: 53upx;
	}
	.featuredtTitleView {
		height: 38upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 30upx;
	}
	.titleText{
		font-size: 40upx;
		color: #333333;
	},
	.fontOverflow {
		text-overflow: ellipsis;
		overflow: hidden;
		width:100%;
	}
	.houseTit{
		margin-top: 30upx;
		font-size:30upx;
		font-weight:bold;
		color:#333;
	}
	.houseDesc{
		margin-top: 20upx;
		font-size:24upx;
		font-weight:400;
		color:#666;
	}
	.qipaiPrice{
		font-size:24upx;
		font-weight:500;
		color:#333;
		line-height:60upx;
	}
	.fontRed{
		color: #CC0000;
	}
	.houseInfo {
	    display: flex;
	    flex-flow: column;
	}
</style>
