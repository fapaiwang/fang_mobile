<template>
	<view>
		<Attention></Attention>
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
				userId:-1
			}
		},
		onLoad:function(){
			_self = this;
			uni.getStorage({
				key:"userInfo",
				success:function(res){
					console.log(res.data,111)
					if (res.data.code==20000){
						
						uni.clearStorage("userInfo");
						this.fun.navTo("/pages/login/login")
					}
					console.log(res.data)
					_self.userId = res.data.id;
				},
			})
			this.getHouse();
		},
		methods: {
			getHouse(){
				this.fun.getReq(this.baseUrl+'/api/user/followHouse',{"model":"second_house","user_id":this.userId})
				.then((res)=>{
					console.log(res[1].data)
					this.houseData = res[1].data;
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
