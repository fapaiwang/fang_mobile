<template>
	<view>
		<view class="mine_head">
			<view class="mine_banner">
				<MineBanner :bannerdata="bannerdata"></MineBanner>
			</view>
			<view class="header">
				<view class="header_login">
					<view class="avatar"><image mode=""></image></view>
					<view class="header_text" v-if="isShow">
						<text @click="login">登录</text>
						/
						<text @click="register">注册</text>
					</view>
				</view>
				<view class="change_info" @click="changeInfo">
					修改资料
				</view>
			</view>
		</view>
		<Header></Header>
		<History></History>
	</view>
</template>

<script>
	import MineBanner from '@/components/base/banner.vue';
	import Header from '@/components/mine/header.vue';
	import History from "@/components/mine/history.vue"
	
	export default {
		components:{
			MineBanner,
			Header,
			History
		},
		data() {
			return {
				bannerdata:[],
				isShow:true
			}
		},
		onLoad:function(){
			this.getBannerData();
		},
		onShow:function(){
			this.getStore();
		},
		methods: {
			getStore(){
				var _self = this;
				uni.getStorage({
					key:"user",
					success:function(res){
						_self.isShow = false;
					},
					fail:function(){
						_self.isShow = true;
					}
				})
			},
			getBannerData() {
				this.fun.getReq(this.baseUrl+'/api/banner/index?space_id=28')
				.then((res)=>{
					this.bannerdata = res[1].data.data
				});
			},
			login(){
				this.fun.navTo("/pages/login/login");
			},
			register(){
				this.fun.navTo("/pages/login/register");
			},
			changeInfo(){
				if (this.isShow) {
					this.fun.showMsg("请登录");
					return false;
				} else {
					this.fun.navTo("/pages/mine/edit");
				}
			},
		}
	}
</script>

<style scoped>
.header{
	display: flex;
	justify-content: space-between;
	padding: 0 30upx;
	width: 90%;
	height:124upx;
	margin-top: -40upx;
}
.header_login {
    display: flex;
}
.avatar{
	width:120upx;
	height:120upx;
	background:#ccc;
	border:4upx solid rgba(255,255,255,1);
	border-radius:50%;
	float: left;
	position: relative;
}
.avatar image{
	width:120upx;
	height:120upx;
}
.header_login{
	justify-content: center;
}
.header_text{
	font-size:36upx;
	font-family:PingFang SC;
	font-weight:bold;
	color:#333;
	height:60upx;
	line-height:60upx;
	margin-left: 26upx;
	margin-top:70upx;
}
.change_info{
	margin-top: 33upx;
	width:138upx;
	height:54upx;
	background:#fff;
	border:2upx solid #333;
	border-radius:27upx;
	font-size:24upx;
	font-family:PingFang SC;
	font-weight:bold;
	line-height:60upx;
	text-align: center;
	margin-top: 60upx;
}
</style>
