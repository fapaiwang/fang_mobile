<template name='auction'>
	<view class="auctionView">
		<view class="auctionContent">
			<view class="auctionitem">
				<view :style="{background: 'no-repeat 100% url('+getImgUrl(0)+')'}" class="leftItemContent" @click="getTargetUrl('h170')">
					<text class="textTitle">{{getName(0)}}</text>
					<text class="textContentView">{{getDescribe(0)}}</text>
				</view>
			</view>
			<view style="width: 20upx;" />
			<view class="auctionitem">
				<view class="rightItemContent">
					<view :style="{background: 'no-repeat 100% url('+getImgUrl(1)+')'}" class="rightItemContentItem" @click="getTargetUrl('h169')">
						<text class="textTitle">{{getName(1)}}</text>
						<text class="textContentView">{{getDescribe(1)}}</text>
					</view>
					<view style="height: 20upx;" />
					<view :style="{background: 'no-repeat 100% url('+getImgUrl(2)+')'}" class="rightItemContentItem" @click="getTargetUrl('h175r1')">
						<text class="textTitle">{{getName(2)}}</text>
						<text class="textContentView">{{getDescribe(2)}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'auction',
		props: ['auctionData'],
		data() {
			return {
				
			}
		},
		methods: {
			getTargetUrl(param){//跳转地址
				this.fun.navTo(`../../pages/all/index?a=${param}`)
			},
			getImgUrl(num){
				if (this.auctionData.length > 0) {
					let _img = this.auctionData[num].img.fileurl
					return `https://www.fangpaiwang.com/${_img}`;
				}
			},
			getName(num) {
				if (this.auctionData.length > 0) {
					return this.auctionData[num].name;
				}
			},
			getDescribe(num) {
				if (this.auctionData.length > 0) {
					return this.auctionData[num].describe;
				}
			}
		}
	}
</script>

<style scoped>
	.auctionView{
		padding: 0 30upx;
		padding-top: 50upx;
	},
	.auctionContent {
		width: 100%;
		display: flex;		
		flex-direction: row;
		align-items:center;
	},
	.auctionitem {
		height: 260upx;
		flex: 1;
	},
	.leftItemContent {
		height: 260upx;
		display: flex;
		flex-direction: column;
		border-radius: 10upx;
		background-color: #4CD964;
	},
	.rightItemContent {
		height: 260upx;
		display: flex;
		flex-direction: column;
	},
	.rightItemContentItem {
		flex: 1;
		border-radius: 10upx;
		background-color: #4CD964;
	},
	.textTitle {
		display: block;
		font-size: 26upx;
		color: #333333;
		margin-top: 22upx;
		margin-left: 30upx;
	},
	.textContentView {
		display: block;
		margin-top: 10upx;
		margin-left: 30upx;
		font-size: 20upx;
		color: #666666
	}
</style>
