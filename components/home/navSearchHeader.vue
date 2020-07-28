<template>
	<view class="quickConView">
		<view class="quickConContent">
			<view v-for="(item,index) in homeMenuData" :key="index" class="quickConItem" @click="getTargetUrl(index)">
				<image class="quickConItemIcon" :src="getImgSrc(item.icon)"></image>
				<text class="quickConItemText">{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:[
			'homeMenuData'
		],
		data() {
			return {
				
			};
		},
		methods:{
			getImgSrc(path){
				return `https://www.fangpaiwang.com/${path}`
			},
			getTargetUrl(index) {
				switch(Number(index)) {
					case 1:
					this.fun.navTo("../../pages/all/index?tit=全部房源");
					break;
					case 2:
					this.fun.navTo("../../pages/all/index?a=f18334&tit=住宅/公寓");
					break;
					case 5:
					this.fun.navTo("../../pages/all/index?a=h175&tit=成交案例");
					break;
					case 6:
					this.fun.navTo("../../pages/news/index");
					break;
					case 7:
					this.fun.navTo("../../pages/detail/taxes");
					break;
				}
				
			},
		}
	}
</script>

<style scoped>
	.quickConView {
		padding: 50upx 30upx 0 30upx;
	},
	.quickConView .quickConContent {
		width: 100%;
		display: flex;
		flex-flow: row wrap;
		align-items:center;
	},
	.quickConView .quickConContent .quickConItem {
		display: flex;
		width: 25%;
		height: 144upx;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.quickConView .quickConContent .quickConItem .quickConItemIcon {
		width: 68upx;
		height: 68upx;
	},
	.quickConItemText {
		margin-top: 18upx;
		color: #333;
		font-size: 26upx;
	}
</style>