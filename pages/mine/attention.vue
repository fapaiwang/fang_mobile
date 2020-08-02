<template>
	<view>
		<Attention :communityData="communityData"></Attention>
		<House :houseData="houseData"></House>
	</view>
</template>

<script>
	var _self;
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
		onLoad:function(){
			_self = this;
			uni.getStorage({
				key:_self.fun.userInfo,
				success:function(res){
					if (res.data.code==20000){
						uni.clearStorage(_self.fun.userInfo);
						this.fun.navTo("/pages/login/login")
					}
					_self.userId = res.data.id;
				},
			})
			this.getRes();
		},
		methods: {
			getRes(){
				this.getHouse();
				this.getCommunity();
			},
			getHouse() {
				_self = this;
				var houseData = new Array();
				this.fun.getReq(this.baseUrl+'/api/user/followHouse',{"model":"second_house","user_id":this.userId})
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
				this.fun.getReq(this.baseUrl+'/api/user/followEstate',{"user_id":this.userId})
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
