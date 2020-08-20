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
			<view class="taxes_con" @click="recommend">
				<view class="taxes_tit">
					<view class="taxes_small_tit">
						<image src="../../static/img/mine/recommend.png"></image>
					</view>
					<text>推荐房源</text>
				</view>
				<view class="taxes_symbol">></view>
			</view>
			<view class="taxes_con" @click="discount">
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
			
			<view class="taxes_con client" @click="call">
				<view class="taxes_tit">
					<view class="taxes_small_tit">
						<image src="../../static/img/mine/call.png"></image>
					</view>
					<text>客服电话</text>
				</view>
				<view class="taxes_symbol">
					<text class="last">400 677 0028</text>
					>
				</view>
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
				uuid : -1,
			}
		},
		components:{
			grayBox
		},
		created:function(){
			this.getUserInfo();
		},
		onShow:function(){
			this.getUserInfo();
		},
		methods: {
			call(){
				if (uni.getSystemInfoSync().platform == "android") {
					var Intent = plus.android.importClass("android.content.Intent");
					var Uri = plus.android.importClass("android.net.Uri");  
					// 获取主Activity对象的实例  
					var main = plus.android.runtimeMainActivity();  
					// 创建Intent  
					var uri = Uri.parse("tel:400 677 0028"); // 这里可修改电话号码  
					var call = new Intent("android.intent.action.CALL",uri);  
					// 调用startActivity方法拨打电话  
					main.startActivity( call );  
				} else {
					uni.makePhoneCall({
					    phoneNumber: '400 677 0028' //仅为示例
					});
				}
			},
			recommend(){//推荐房源
				if (this.uuid ==-1) {
					uni.showToast({
						icon:'none',
						title:'请登录',
						duration:3000
					})
					return false;
				}
				this.fun.navTo("/pages/all/index?tabCur=0");
			},
			discount(){//6折房源
				if (this.uuid ==-1) {
					uni.showToast({
						icon:'none',
						title:'请登录',
						duration:3000
					})
					return false;
				}
				this.fun.navTo("/pages/all/index?tabCur=2");
			},
			list(){
				if (this.uuid ==-1) {
					uni.showToast({
						icon:'none',
						title:'请登录',
						duration:3000
					})
					return false;
				}
				this.fun.navTo("/pages/mine/list")
			},
			history(){
				if (this.uuid ==-1) {
					uni.showToast({
						icon:'none',
						title:'请登录',
						duration:3000
					})
					return false;
				}
				this.fun.navTo("/pages/mine/history")
			},
			logout(){
				var _self = this;
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
						// uni.clearStorage(_self.fun.searchList);
						// uni.clearStorage(_self.fun.searchEstate);
						uni.switchTab({
							url:"/pages/index/index"
						})
					},
				})
			},
			getUserInfo(){
				var _self = this;
				uni.getStorage({
					key:_self.fun.userInfo,
					success:function(res){
						_self.uuid = res.data.id;
					},
					fail:function(){
						// uni.showToast({
						// 	icon:'none',
						// 	title:'请登录',
						// 	duration:3000
						// })
						return false;
					}
				})
			}
		}
	}
</script>

<style scoped>
	@import url("./css/history.css");
	.last{
		float: left;
		color: #E02E24;
		height:27upx;
		ffont-size:28upx;
		font-family: PingFang SC;
		font-weight: bold;
		display: inline-block;
	}
	.client .taxes_symbol{
		width: 31%;
	}
</style>
