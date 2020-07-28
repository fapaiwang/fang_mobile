<template>
	<view>
		<view class="total">
			<text>我关注的小区</text>
		</view>
		<view class="xiaoquList">
			<view class="item" @click="detailXiaoqu">
				<view class="img">
				  <image src="" mode=""></image>
				</view>
				<view class="titleinfoView">
					<view class="titleView">
						<text>通州区 新海南里</text>
					</view>
					<view class="titleInfo">
						<text>周边房源<text style="color: #DF2D23">20</text>套</text>
					</view>
					<view class="price">
						<text style="color: #DF2D23">13000元/㎡</text>
					</view>
				</view>
			</view>
			<view class="item" @click="detailXiaoqu">
				<view class="img">
				  <image src="" mode=""></image>
				</view>
				<view class="titleinfoView">
					<view class="titleView">
						<text>通州区 新海南里</text>
					</view>
					<view class="titleInfo">
						<text>周边房源<text style="color: #DF2D23">20</text>套</text>
					</view>
					<view class="price">
						<text style="color: #DF2D23">13000元/㎡</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped>
	.xiaoquList{
		padding:30upx;
		background: #fff;
	}
	.total{
		background: #F3F0F1;
		width: 100%;
		height:31upx;
		line-height: 31upx;
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#333;
		padding: 35upx 0 35upx 30upx;
	}
	.xiaoquList .item:first-child{
		margin-top: 30upx;
	}
	.xiaoquList .item:last-child{
		margin-bottom: 30upx;
	}
	.item {
		width: 100%;
		display: block;
		flex-flow: row;
		height: 149upx;
		margin-bottom: 60upx;
	 }
	 .img {
		display: inline-block;
		width: 240upx;
		height: 149upx;
		background: #ccc;
		float: left;
		margin-right: 26upx;
	}
	.img image {
	  width: 100%;
	  height: 100%;
	  border-radius: 10upx;
	}
	.titleView {
		width: 100%;
		padding-top: 7upx;
		padding-bottom: 28upx;
		height:29upx;
		font-size:30upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:#333;
	}
	
	.titleView{
		height:24upx;
		font-size:24upx;
		font-family:PingFang SC;
		font-weight:400;
		color:#333;
	}
	.titleinfoView {
		width: 100%;
		padding-right: 20upx;
	}
	.titleInfo {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 24upx;
		height:24px;
		line-height:24px;
	}
	.price{
		height:60upx;
		font-size:26upx;
		font-family:Arial;
		font-weight:bold;
		color:#CC0000;
		line-height:60upx;
	}
	
	.featuredView {
		margin-top: 45upx;
		padding: 0 30upx;
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
	.tieleImgView {
		height: 38upx;
		width: 32upx;
	}
	.tieleImg{
		height: 32upx;
		width: 32upx;
	},
	.featuredtSwiper {
		height: 348upx;
	}
</style>
