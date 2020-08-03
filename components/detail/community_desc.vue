<template>
	<view class="community" v-if="detial">
		<view class="featuredtTitleView" @click="moreCommunity(detial.id)">
			<view class="titleText">
				小区介绍
			</view>
			<view class="moreData">
				<view>小区详情<text class="more">></text></view>
			</view>
		</view>
		<view class="community_name">
			{{detial.estate_name}}<text class="taotalHouse">(本小区共有拍卖房{{detial.estate_num}}套)</text>
		</view>
		<view class="community_about">
			<view class="community_info">
				<view>建筑年代：<text>{{buildYear}}年</text></view>
				<view>物业费用：<text>{{estateData.property_fee}}</text></view>
				<view>总户数：<text>{{estateData.plan_number}}</text></view>
			</view>
			<image class="community_img" :src="getImgUrl(communityThumb)" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		props: ["detial","estateData","buildYear","communityThumb"],
		data() {
			return {
				
			}
		},
		methods: {
			getImgUrl(ImgSrc){
				return this.fun.getImgSrc(ImgSrc);
			},
			moreCommunity(index) {//跳转到小区详情页面
				this.fun.navTo(`/pages/community/community?id=${index}`);
			}
		}
	}
</script>

<style scoped>
	@import url("./css/community_desc.css");
</style>