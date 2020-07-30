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
			getHouse(){
				this.fun.getReq(this.baseUrl+'/api/user/followHouse',{"model":"second_house","user_id":this.userId})
				.then((res)=>{
					console.log(res[1].data)
					this.houseData = res[1].data.data.data;
				})
			},
			getCommunity(){
				this.fun.getReq(this.baseUrl+'/api/user/followHouse',{"model":"estate","user_id":this.userId})
				.then((res)=>{
					console.log(res[1].data)
					this.communityData = res[1].data.data.data;
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
