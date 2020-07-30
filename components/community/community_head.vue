<template>
	<view>
		<view class="houseInfo">
			<view class="houseInfoL">
				<text class="houseName">{{detail.title}}</text>
				<view class="averagePrice">
					均价：<text class="price">{{detail.price}}/㎡</text>
				</view>
			</view>
			<view class="join" @click="join">
				<image :src="isShow==1 ? '../../static/img/community/xin.png' : '../../static/img/community/join.png'" class="joinImg"></image>
				<text class="joinText">关注</text>
			</view>
			<view class="houseLine"></view>
		</view>
	</view>
</template>

<script>
	var _self;
	export default {
		props:["detail","communityId"],
		data() {
			return {
				isShow:0,
				uuid:-1,
			}
		},
		created:function(){
			_self = this;
			_self.id = _self.detail.id;
			uni.getStorage({
				key:_self.fun.userInfo,
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
			join(){//关注
				if (this.uuid != -1) {
					let _param = {
						"house_id":this.communityId,
						"model":"estate",
						"user_id":this.uuid,
					}
					this.fun.getReq(this.baseUrl+'/api/follow',_param)
					.then((res)=>{
						this.isShow = res[1].data.status;
						this.fun.showMsg(res[1].data.msg);
					})
				} else {
					this.fun.navTo('/pages/login/login');
				}
			},
		}
	}
</script>

<style scoped>
@import url("./css/community_head.css");
</style>
