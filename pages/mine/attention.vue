<template>
	<view>
		<Attention></Attention>
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
				houseData:[]
			}
		},
		onLoad:function(){
			this.getHouse();
		},
		methods: {
			getHouse(){
				this.fun.getReq(this.baseUrl+'/api/user/followHouse')
				.then((res)=>{
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
