<template>
	<view class="community">
		<view class="featuredtTitleView">
			<view class="titleText">
				小区介绍
			</view>
			<view class="moreData"  @click="moreCommunity(detial.id)">
				<view>小区详情<text class="more">></text></view>
			</view>
		</view>
		<view class="community_name">
			{{detial.estate_name}}<text class="taotalHouse">(本小区共有拍卖房2套)</text>
		</view>
		<view class="community_about">
			<view class="community_info">
				<view>建筑年代：<text>{{buildYear}}年</text></view>
				<view>物业费用：<text>{{estateData.property_fee}}</text></view>
				<view>总户数：<text>{{estateData.plan_number}}</text></view>
			</view>
			<image class="community_img" :src="getImgUrl(communityThumb)"></image>
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
			getImgUrl(icon){
				if (icon=="" || icon.substr(0,4)=="http") {
					return icon;
				} else {
					return `https://www.fangpaiwang.com/${icon}`;
				}
			},
			moreCommunity(index) {//跳转到小区详情页面
				uni.navigateTo({
					url:`../../pages/community/community?id=${index}`
				})
			}
		}
	}
</script>

<style scoped>
	.community{
		padding: 40upx 30upx 0 30upx;
	}
	.featuredtTitleView {
		height: 60upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.titleText{
		color: #333333;	
		height:39upx;
		font-size:40upx;
		font-family:PingFang SC;
		font-weight:800;
		line-height:60upx;
		display: flex;
		flex-flow: row;
	},
	.moreData {
		height:39upx;
		font-size:28upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#999;
		line-height:60upx;
	}
	.moreData:hover{
		cursor: pointer;
	}
	.more{
		color: #999;
		margin-left: 16upx;
	}
	.community_name{
		margin-top: 49upx;
		width:100%;
		font-size:32upx;
		font-weight:bold;
		color:#CF2924;
		line-height:60upx;
		display: flex;
	}
	.taotalHouse{
		font-size:32upx;
		font-weight:bold;
		color:#333;
	}
	.community_about{
		margin-top: 30upx;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		margin-bottom: 60upx;
	}
	.community_info{
		font-size:28upx;
		font-weight:500;
		color:#666;
		line-height:50upx;
	}
	.community_img{
		width:240upx;
		height:148upx;
		border-radius:10upx;
		background: #ccc;
	}
</style>