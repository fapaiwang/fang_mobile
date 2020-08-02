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
				<image :src="isLike(communityId)" class="joinImg"></image>
				<text class="joinText">关注</text>
			</view>
			<view class="houseLine"></view>
		</view>
	</view>
</template>

<script>
	var _self;
	export default {
		props:["detail","communityId","like"],
		data() {
			return {
				isShow:1,
				uuid:-1,
				EstateData:[],
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
			uni.getStorage({ //获取关注小区
				key:_self.fun.likeEstate,
				success:function(ops){
					_self.EstateData = ops.data;
				},
			})
		},
		methods: {
			isLike(id) {
				return this.EstateData.indexOf(Number(id)) != -1 ? '../../static/img/community/xin.png' :  '../../static/img/community/join.png';
			},
			join(){//关注
				if (this.uuid != -1) {
					let _param = {
						"house_id":this.communityId,
						"model":"estate",
						"user_id":this.uuid,
					}
					this.fun.getReq(this.baseUrl+'/api/follow',_param)
					.then((res)=>{
						if (res[1].data.status==1) {
							_self.EstateData.push(Number(_self.communityId))
						} else {
							_self.EstateData.splice(_self.EstateData.indexOf(Number(_self.communityId)), 1);
						}
						uni.setStorage({
							key:_self.fun.likeEstate,
							data:_self.EstateData
						})
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
