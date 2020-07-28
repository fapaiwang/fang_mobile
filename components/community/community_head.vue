<template>
	<view>
		<view class="houseInfo">
			<view class="houseInfoL">
				<text class="houseName">{{cData.title}}</text>
				<view class="averagePrice">
					均价：<text class="price">{{cData.price}}/㎡</text>
				</view>
			</view>
			<view class="join" @click="join">
				<image src="../../static/img/community/join.png" class="joinImg"></image>
				<text class="joinText">关注</text>
			</view>
			<view class="houseLine"></view>
		</view>
	</view>
</template>

<script>
	export default {
		props:["cData"],
		data() {
			return {
				
			}
		},
		methods: {
			join(){
				this.isLogin("../../pages/mine/mine");
			},
			isLogin(){
				uni.getStorage({
					key:"user",
					success:function(res){
						// uni.navigateTo({
						// 	url:url
						// })
					},
					fail:function(){
						uni.switchTab({
							url:"../../pages/mine/mine"
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
.houseInfo{
	display: flex;
	flex-flow: row wrap;
	justify-content: space-around;
	padding: 0 30upx;
	padding-top: 40upx;
	
}
.houseLine{
	margin-top: 40upx;
	width: 100%;
	display: flex;
	border-bottom:1upx solid #EBEBEB;
	margin-bottom: 50upx;
}
.houseInfoL{
	flex: 1;
}
.join{
	width: 48upx;
	height: 48upx;
	display: flex;
	flex-flow: inherit;
}
.joinImg{
	width: 48upx;
	height: 48upx;
}
.joinText{
	height:23upx;
	font-size:24upx;
	font-family:PingFang SC;
	font-weight:500;
	color:#666;
}
.houseName{
	height:34upx;
	font-size:36upx;
	font-family:PingFang SC;
	font-weight:800;
	color:#333;
}
.averagePrice{
	margin-top: 31upx;
}
.price{
	height:30upx;
	font-size:28upx;
	font-family:PingFang SC;
	font-weight:500;
	color:#E02E24;
}
</style>
