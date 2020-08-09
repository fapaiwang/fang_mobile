<template>
	<view class="recommend_con">
		<view class="recommend_list" v-for="(item,itemKey) in recommendData" :key="itemKey">
			<view class="recommend_list_l">
				<view class="avatar">
					<image :src="getImg(item.img)" mode=""></image>
				</view>
				<view class="workJob">
					<text class="name">{{item.nick_name}}</text>
					<view class="experience">法拍经验：<text class="workYear">{{item.history_complate}}年</text></view>
				</view>
			</view>
			<view class="recommend_list_r">
				<image class="tel" src="../../static/img/detail/tel.png" @click="dial(item.lxtel)"></image>
				<image class="msg" src="../../static/img/detail/msg.png" @click="online(item.kflj)"></image>
			</view>
			<view class="persion_desc">{{userRule !=-1 ? item.house_name : ''}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				recommendData:[],
				userRule:-1,
			}
		},
		created:function(){
			this.getRule();
		},
		onLoad:function(option){
			this.getRecommendPersion(option.id);
		},
		methods: {
			getRecommendPersion(houseId){//法拍专员推荐
				this.fun.getReq(this.baseUrl+"/api/second/houseComment",{"house_id":houseId})
				.then((res)=>{
					this.recommendData = res[1].data.data;
				});
			},
			getImg(_rul){
				return this.fun.getImgSrc(_rul);
			},
			dial(telPhone){
				uni.makePhoneCall({
					phoneNumber:telPhone
				})
			},
			online(_url){
				uni.switchTab({
					url:"/pages/community/community"
				})
			},
			getRule(){
				var _self = this;
				uni.getStorage({
					key:_self.fun.userInfo,
					success:function(res){
						_self.userRule = res.data.model;
					},
				})
			},
		}
	}
</script>

<style>
@import url("./css/recommend.css");
</style>
