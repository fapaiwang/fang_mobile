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
				this.fun.navTo(`/pages/all/index?a=${param}`)
			},
			getImgUrl(num){
				if (this.auctionData.length > 0) {
					let _img = this.auctionData[num].img.fileurl
					return this.fun.getImgSrc(_img);
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
@import url("./css/auction.css");	
</style>
