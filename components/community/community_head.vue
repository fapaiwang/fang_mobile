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
				<image :src="isShow ? '../../static/img/community/xin.png' : '../../static/img/community/join.png'" class="joinImg"></image>
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
				isShow:true,
			}
		},
		methods: {
			join(){
				if (this.isShow) {
					this.isShow = false;
				} else {
					this.isShow = true;
				}
				this.isLogin("/pages/mine/mine");
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
							url:"/pages/mine/mine"
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
@import url("./css/community_head.css");
</style>
