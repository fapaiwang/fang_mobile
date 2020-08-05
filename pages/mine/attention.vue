<template>
	<view>
		<Attention :communityData="communityData"></Attention>
		<House :houseData="houseData"></House>
	</view>
</template>

<script>
	import Attention from '@/components/attention/attention.vue';
	import House from '@/components/attention/house.vue';
	
	export default {
		components:{
			Attention,
			House
		},
		data() {
			return {
				houseData:[],
				communityData:[],
				userId:-1
			}
		},
		onShow:function(){
			this.getUserInfo();
		},
		onLoad:function(){
			this.getUserInfo();
		
		},
		created:function(){
			this.getUserInfo();
		},
		methods: {
			getUserInfo(){
				var _self = this;
				uni.getStorage({
					key:_self.fun.userInfo,
					success:function(res){
						_self.userId = res.data.id;
						_self.getRes();
					},
					fail:function(){
						uni.clearStorage(_self.fun.userInfo);
						this.fun.navTo("/pages/login/login")
					}
				})
			},
			getRes(){
				this.getHouse();
				this.getCommunity();
			},
			getHouse() {
				var _self = this;
				var houseData = new Array();
				this.fun.getReq(this.baseUrl+'/api/user/followHouse',{"model":"second_house","user_id":_self.userId})
				.then((res)=>{
					this.houseData = res[1].data.data.lists.data;
					res[1].data.data.lists.data.forEach(function(item,key){
						houseData.push(item.id)
					})
					if (houseData.length >= 1) {
						uni.getStorage({
							key:_self.fun.likeHouse,
							fail:function(){
								uni.setStorage({
									key:_self.fun.likeHouse,
									data:houseData
								})
							}
						})
					}
				})
			},
			getCommunity(){
				var estateData = new Array();
				var _self = this;
				this.fun.getReq(this.baseUrl+'/api/user/followEstate',{"user_id":_self.userId})
				.then((res)=>{
					this.communityData = res[1].data.data.data;
					res[1].data.data.data.forEach(function(item,key){
						estateData.push(item.id)
					})
					if (estateData.length >= 1) {
						uni.getStorage({
							key:_self.fun.likeEstate,
							fail:function(){
								uni.setStorage({
									key:_self.fun.likeEstate,
									data:estateData
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
	page{
		background: #F3F0F1;
	}
</style>
