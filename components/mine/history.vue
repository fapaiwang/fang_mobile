<template>
	<view>
		<grayBox></grayBox>
		<view class="taxes_warp">
			<view class="taxes_con" @click="history">
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
	var _self = this;
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
				this.isLogin("/pages/mine/list")
			},
			history(){
				this.fun.navTo("/pages/mine/history")
			},
			logout(){
				_self = this;
				uni.getStorage({
					key:_self.fun.userInfo,
					success:function(res){
						uni.clearStorage(_self.fun.userInfo);
						uni.clearStorage(_self.fun.likeHouse);
						uni.clearStorage(_self.fun.likeEstate);
						uni.clearStorage(_self.fun.historyHouse);
						uni.clearStorage(_self.fun.houseKeys);
						uni.clearStorage(_self.fun.historyEstate);
						uni.clearStorage(_self.fun.estateKeys);
						
						uni.switchTab({
							url:"/pages/index/index"
						})
					},
				})
			},
			isLogin(url){
				uni.getStorage({
					key:_self.fun.userInfo,
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
