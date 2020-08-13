<template>
	<view class="recommend_warp" v-if="recommendData.length>0">
		<view class="recommend_con" @click="recommend">
			<view class="featuredtTitleView">
				<view class="titleText">
					法拍专员推荐
				</view>
				<view class="moreData">
					<view>查看更多<text class="more">></text></view>
				</view>
			</view>
			<view class="recommend_list" v-for="(item,itemKey) in recommendData" :key="itemKey">
				<view class="recommend_list_l">
					<view class="avatar">
						<image :src="getImg(item.img)" mode=""></image>
					</view>
					<view class="workJob">
						<text class="name">{{item.nick_name}}</text>
						<view class="experience">法拍经验：<text class="workYear">{{item.history_complate}}年</text></view>
					</view>
				</view>
				<view class="recommend_list_r">
					<image class="tel" src="../../static/img/detail/tel.png" @click="dial(item.lxtel)"></image>
					<image class="msg" src="../../static/img/detail/msg.png" @click="online(item.kflj)"></image>
				</view>
				<view class="persion_desc">{{userRule !=-1 ? item.house_name : ''}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:["recommendData","detailId"],
		name: "recommend",
		data(){
			return {
				userRule:-1,
			}
		},
		created:function(){
			this.getRule();
		},
		methods:{
			getImg(_rul){
				return this.fun.getImgSrc(_rul);
			},
			dial(telPhone){
				if (uni.getSystemInfoSync().platform == "android") {
					var Intent = plus.android.importClass("android.content.Intent");
					var Uri = plus.android.importClass("android.net.Uri");  
					// 获取主Activity对象的实例  
					var main = plus.android.runtimeMainActivity();  
					// 创建Intent  
					var uri = Uri.parse("tel:"+telPhone); // 这里可修改电话号码  
					var call = new Intent("android.intent.action.CALL",uri);  
					// 调用startActivity方法拨打电话  
					main.startActivity( call );  
				} else {
					uni.makePhoneCall({
					    phoneNumber: telPhone //仅为示例
					});
				}
			},
			online(_url){
				uni.switchTab({
					url:"/pages/community/community"
				})
			},
			getRule(){
				var _self = this;
				uni.getStorage({
					key:_self.fun.userInfo,
					success:function(res){
						_self.userRule = res.data.model;
					},
				})
			},
			recommend(){
				this.fun.navTo("/pages/detail/recommend?id="+this.detailId)
			}
		}
	}
</script>

<style scoped>
	@import url("./css/recommend.css");
</style>
