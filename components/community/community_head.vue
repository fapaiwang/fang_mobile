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
				uuid:-1,
			}
		},
	created:function(){
		_self = this;
		uni.getStorage({
			key:"userInfo",
			success:function(res){
				_self.uuid = res.data.id;
				_self.bmrs = true;
			},
			fail:function(){
				_self.bmrs = true;
			}
		})
	},
		methods: {
			join(){
				if (this.uuid != -1) {
					let _param = {
						"house_id":this.detial.id,
						"model":"estate",
						"user_id":this.uuid,
					}
					this.fun.getReq(this.baseUrl+'/api/follow',_param)
					.then((res)=>{
						console.log(res[1].data)
						this.fun.showMsg(res[1].data.msg);
					})
				} else {
					this.fun.navTo('/pages/login/login');
				}
				// this.isLogin("/pages/mine/mine");
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
