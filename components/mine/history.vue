<template>
	<view>
		<grayBox></grayBox>
		<view class="taxes_warp">
			<view class="taxes_con">
				<view class="taxes_tit">
					<view class="taxes_small_tit">
						<image src="../../static/img/mine/foot.png"></image>
					</view>
					<text>浏览足迹</text>
				</view>
				<view class="taxes_symbol">></view>
			</view>
			<view class="taxes_con">
				<view class="taxes_tit">
					<view class="taxes_small_tit">
						<image src="../../static/img/mine/recommend.png"></image>
					</view>
					<text>推荐房源</text>
				</view>
				<view class="taxes_symbol">></view>
			</view>
			<view class="taxes_con">
				<view class="taxes_tit">
					<view class="taxes_small_tit">
						<image src="../../static/img/mine/Pick.png"></image>
					</view>
					<text>捡漏房源</text>
				</view>
				<view class="taxes_symbol">></view>
			</view>
		</view>
		<grayBox></grayBox>
		<view class="taxes_warp">
			<view class="taxes_con" @click="list">
				<view class="taxes_tit">
					<view class="taxes_small_tit">
						<image src="../../static/img/mine/hammer.png"></image>
					</view>
					<text>我的法拍专员</text>
				</view>
				<view class="taxes_symbol">></view>
			</view>
		</view>
		<grayBox></grayBox>
		<view class="logout" @click="logout">
			退出登录
		</view>
		<grayBox></grayBox>
		<grayBox></grayBox>
	</view>
</template>

<script>
	import grayBox from "@/components/detail/gray_box.vue" //灰色边框
	export default {
		data() {
			return {
				
			}
		},
		components:{
			grayBox
		},
		methods: {
			list(){
				this.isLogin("../../pages/mine/list")
			},
			logout(){
				uni.clearStorage("user");
				uni.switchTab({
					url:"/pages/index/index"
				})
				//17316082501
			},
			isLogin(url){
				uni.getStorage({
					key:"user",
					success:function(res){
						uni.navigateTo({
							url:url
						})
					},
					fail:function(){
						uni.showToast({
							icon:'none',
							title:'请登录',
							duration:3000
						})
						return false;
					}
				})
			}
		}
	}
</script>

<style scoped>
	.taxes_warp{
		padding: 0 30upx;
	}
	.taxes_con{
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		line-height: 98upx;
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:#333;
		border-bottom: 1px solid #EBEBEB;
	}
.taxes_tit {
    width: 61%;
}
.taxes_small_tit,.taxes_small_tit image {
	width: 40upx;
	height: 40upx;
	float: left;
	margin-top: 14upx;
	margin-right: 15upx;
}
.taxes_tit text{
	height:27upx;
	font-size:28upx;
	font-family:PingFang SC;
	font-weight:500;
}
.taxes_symbol{
	font-size:28upx;
	font-family:PingFang SC;
	color:#999;
	width: 20%;
	text-align: right;
}
.logout{
	text-align: center;
	font-size:32upx;
	font-family:PingFang SC;
	font-weight:500;
	color:#999;
	line-height:80upx;
	background: #FFF;
	height: 80upx;
}
</style>
