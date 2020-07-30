<template>
	<view class="focus_container">
		<view class="front_cove_about" @click="getTargetUrl">
			<view class="front_cove_img">
				<image :src="getImgSrc()"></image>
			</view>
			<view class="front_cove_info">
				<text class="front_cove_tit">疫情之后，楼市是超低折扣 还是一波猛涨？</text>
				<text class="front_cove_desc">在4月8日，北京中弘大厦拍卖终于...</text>
				<view class="front_cove_time">
					<view class="focus_price">
						起拍价<text class="qipaiPrice">611.00万</text>
					</view>
					<view class="focus_price">
						市场价<text class="marketPrice">620.00</text>万
					</view>
				</view>
				<view class="countdownTime">
					<view class="createIimeIcon">
						<image src="../../static/img/focus/time.png"></image>
					</view>
					<view class="createIimeIconinfo">
						开拍时间：<text>
							2020-04-26 10:00:00
						</text>
					</view>
				</view>
			</view>
		</view>
						
	</view>
</template>

<script>
	export default {
		name:"focues",
		data() {
			return {
				
			}
		},
		methods: {
			getImgSrc(){
				return this.baseUrl;
			},
			getTargetUrl(){
				this.fun.navTo("/pages/news/detail");
			}
		}
	}
</script>

<style scoped>
	@import url("./css/focus.css");
</style>
