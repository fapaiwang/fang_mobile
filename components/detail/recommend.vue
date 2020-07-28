<template>
	<view class="recommend_warp">
		<view class="recommend_con">
			<view class="featuredtTitleView">
				<view class="titleText">
					法拍专员推荐
				</view>
				<view class="moreData">
					<view>查看更多<text class="more">></text></view>
				</view>
			</view>
			<view class="recommend_list" v-for="(item,itemKey) in recommendData" :key="itemKey">
				<view class="recommend_list_l">
					<view class="avatar">
						<image :src="getImg(item.img)" mode=""></image>
					</view>
					<view class="workJob">
						<text class="name">{{item.nick_name}}</text>
						<view class="experience">法拍经验：<text class="workYear">{{item.history_complate}}年</text></view>
					</view>
				</view>
				<view class="recommend_list_r">
					<image class="tel" src="../../static/img/detail/tel.png" @click="dial(item.lxtel)"></image>
					<image class="msg" src="../../static/img/detail/msg.png" @click="online(item.kflj)"></image>
				</view>
				<view class="persion_desc">{{item.house_name}}</view>
			</view>
		
		</view>
	</view>
</template>

<script>
	export default{
		props:["recommendData"],
		name: "recommend",
		data(){
			return {
				
			}
		},
		methods:{
			getImg(_rul){
				return this.baseUrl+_rul;
			},
			dial(telPhone){
				uni.makePhoneCall({
					phoneNumber:telPhone
				})
			},
			online(_url){
				uni.switchTab({
					url:"../../pages/community/community"
				})
			}
		}
	}
</script>

<style scoped>
	.recommend_con{
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
	.more{
		color: #999;
		margin-left: 16upx;
	}
	.recommend_list{
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		margin-top: 30upx;
		border-bottom: 1px solid #EBEBEB;
		padding-bottom: 28upx;
	}
	.recommend_list image{
		width: 80upx;
		height: 80upx;
	}
	.recommend_list_l{
		display: flex;
		flex-flow: row;
		justify-content: space-between;
	}
	.recommend_list_r{
		display: flex;
		width: 50%;
		flex-flow: row-reverse;
	}
	
	.avatar{
		border-radius:50%;
		width: 80upx;
		height: 80upx;
	}
	.avatar image{
		border-radius:50%;
	}
	.workJob{
		margin-left: 30upx;
	}
	.name {
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:#333;
		line-height:30upx;
	}
	.experience{
		font-size:24upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#666;
		line-height:30upx;
	}
	.msg {
		margin-right: 38upx;
	}
	.persion_desc {
		display: flex;
		justify-items: left;
		font-size:32upx;
		font-family:PingFang SC;
		color:#333;
		line-height:44upx;
		margin-top: 40upx;
	}
</style>
