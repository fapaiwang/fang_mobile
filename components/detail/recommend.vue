<template>
	<view class="recommend_warp">
		<view class="recommend_con">
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
				<view class="persion_desc">{{userRule ==4 ? item.house_name : ''}}</view>
			</view>
		
		</view>
	</view>
</template>

<script>
	export default{
		props:["recommendData","userRule"],
		name: "recommend",
		data(){
			return {
				
			}
		},
		methods:{
			getImg(_rul){
				return this.fun.getImgSrc(_rul);
			},
			dial(telPhone){
				uni.makePhoneCall({
					phoneNumber:telPhone
				})
			},
			online(_url){
				uni.switchTab({
					url:"/pages/community/community"
				})
			}
		}
	}
</script>

<style scoped>
	@import url("./css/recommend.css");
</style>
