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
				uni.clearStorage("userInfo");
				uni.switchTab({
					url:"/pages/index/index"
				})
				//17316082501
			},
			isLogin(url){
				uni.getStorage({
					key:"userInfo",
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
	@import url("./css/history.css");
</style>
