<template>
	
	<view style="isShow? 'background:#F3F0F1;!important' :'background: #ffffff;!important' ">
		<Attention :communityData="communityData" v-if="isShow"></Attention>
		<House :houseData="houseData" v-if="isShow"></House>
	<!-- 	<view class="bg" v-if="isShow !=true">
			<image src="../../static/img/base/noMsg.png" class="bgImg"></image>
			<text class="desc">暂无任何信息哦~</text>
		</view> -->
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
				userId:-1,
				isShow:true,
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
					} else {
						this.isShow = false;
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
					} else {
						if (this.houseData.length <1) {
							this.isShow = false;
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
	.bg{
		width: 750upx;
		height: 482upx;
		left: 50%;
		top: 35%;
		position: absolute;
		display: inline-block;
		transform: translate(-50%,-50%);
	}
	.bgImg{
		width: 750upx;
		height: 482upx;
	}
	.desc{
		width:100%;
		height:35upx;
		font-size:36upx;
		font-family:Adobe Heiti Std;
		font-weight:normal;
		color:rgba(51,51,51,1);
		line-height:38upx;
		text-align: center;
		justify-content: center;
		display: block;
		margin-top: 63upx;
	}
</style>
