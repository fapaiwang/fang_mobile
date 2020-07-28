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
				uni.navigateTo({
					url:'../../pages/news/detail'
				})
			}
		}
	}
</script>

<style scoped>
	.focus_container{
		padding: 0 30upx;
		padding-top: 40upx;
	}
	.front_cove_about{
		display: flex;
		flex-flow: row;
		justify-content: space-between;
		margin-top: 60upx;
	}
	.front_cove_about:first-child{
		margin-top: 30upx;
	}
	.front_cove_img{
		width:240upx;
		height:149upx;
		background:#F1F1F1;
		border-radius:10px;
	}
	.front_cove_img image {
		width:240upx;
		height:149upx;
		flex: 1;
		min-width: 0;
	}
	.front_cove_info{
		display: flex;
		flex-flow: column;
		margin-left: 30upx;
	}
	.front_cove_tit {
		width:100%;
		font-size:30upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:#333;
	}
	.front_cove_desc{
		width:100%;
		font-size:24upx;
		font-family:PingFang SC;
		font-weight:400;
		color:#666;
		white-space: nowrap;  // 不让它换行
		line-height:36upx;
	}
	.front_cove_time {
		width: 100%;
		font-size:20upx;
		font-family:PingFang SC;
		font-weight:400;
		color:#999;
		line-height:36upx;
	},
	.focus_price{
		width: 50%;
		float: left;
	}
	.createIimeIcon{
		margin-top: 12upx;
		margin-right: 7upx;
		margin-left: 12upx;
	}
	.createIimeIcon,.createIimeIcon image {
		width: 24upx;
		height: 24upx;
		float: left;
	}
	.countdownTime{
		width: 100%;
		background:#FCF3F2;
		border-radius:10upx;
		font-size:24upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#E02E24;
		line-height:50upx;
		margin-top: 10upx;
	}
	.createIimeIconinfo{
		
	}

	.wuc-tab-item.cur{
		border-bottom: none !important;
	}
	.qipaiPrice{
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#DF2D23;
		margin-left:2upx;
	}
	.marketPrice{
		font-size:28upx;
		font-family:PingFang SC;
		font-weight:400;
		color:#333;
	}
</style>
