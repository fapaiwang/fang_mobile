<template>
	<view class="recommend_warp">
		<view class="total">
			<text>共3位法拍专员</text>
		</view>
		<view class="recommend_con">
			<view class="recommend_list">
				<view class="recommend_list_l">
					<view class="avatar">
						<image src="../../static/img/detail/tel.png" mode=""></image>
					</view>
					<view class="workJob">
						<text class="name">111</text>
						<view class="experience">法拍经验：<text class="workYear">0年</text></view>
					</view>
				</view>
				<view class="recommend_list_r">
					<image class="tel" src="../../static/img/detail/tel.png" @click="dial(item.lxtel)"></image>
					<image class="msg" src="../../static/img/detail/msg.png" @click="online(item.kflj)"></image>
				</view>
			</view>
			<view class="recommend_list">
				<view class="recommend_list_l">
					<view class="avatar">
						<image src="../../static/img/detail/tel.png" mode=""></image>
					</view>
					<view class="workJob">
						<text class="name">111</text>
						<view class="experience">法拍经验：<text class="workYear">0年</text></view>
					</view>
				</view>
				<view class="recommend_list_r">
					<image class="tel" src="../../static/img/detail/tel.png" @click="dial(item.lxtel)"></image>
					<image class="msg" src="../../static/img/detail/msg.png" @click="online(item.kflj)"></image>
				</view>
			</view>
			<view class="recommend_list">
				<view class="recommend_list_l">
					<view class="avatar">
						<image src="../../static/img/detail/tel.png" mode=""></image>
					</view>
					<view class="workJob">
						<text class="name">111</text>
						<view class="experience">法拍经验：<text class="workYear">0年</text></view>
					</view>
				</view>
				<view class="recommend_list_r">
					<image class="tel" src="../../static/img/detail/tel.png" @click="dial(item.lxtel)"></image>
					<image class="msg" src="../../static/img/detail/msg.png" @click="online(item.kflj)"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	page{
		background: #FAF7F8;
	}
	.total{
		background: #F8F8F8;
		width: 100%;
		height:26upx;
		font-size:28upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#999;
		padding: 35upx 0 35upx 30upx;
	}
	.recommend_con{
		padding: 30upx;
		background: #fff;
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
		margin-bottom: 60upx;
	}
	.recommend_list:last-child{
		margin-bottom: 0;
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
