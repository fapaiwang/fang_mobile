<template>
	<view>
		<view class="header-wrap">
				 <view class="index-header">
					<view  @click="onPickCityClick" class="addressView">
						<image class="arrowIcon" src='../../static/img/base/left.png'></image>
					</view>
					<view class="input-wrap">
						<image class="iconfangdajing" src='../../static/img/base/searchIcon@2x.png'></image>
						<input maxlength="140"
							step="" 
							placeholder="输入小区名称" 
							autocomplete="off" 
							type="search"
							v-model="keyword"
							@click="inputChange"
							placeholder-class="uni-inputPlaceholder"
							class="uni-input">
					</view>
					<view class="user-wrap"
						  @click="goUserClick">
						  <image class="userIconfont" src='../../static/img/base/userIcon@2x.png'></image>
					</view>
				 </view>
			 </view>
			 <view class="container">
			 	<view class="history">
			 		<text>搜索历史</text>
			 	</view>
			 	<view class="history_list">
			 		<text>盘古大观</text>
			 		<text>公寓</text>
			 		<text>中弘·北京像素</text>
			 		
			 		<text>禧瑞都</text>
			 		<text>阿拉啦啦啦啦</text>
			 	</view>
			 </view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				keyword: ''
			}
		},
		methods: {
			onPickCityClick:function(){
				uni.navigateBack({
					delta:1
				})
			},
			inputChange:function(){
				this.fun.getReq(this.baseUrl+'/api/second/houseList?keyword'+this.keyword);
			},
			goUserClick:function(){
				uni.switchTab({
					url:"/pages/mine/mine"
				})
			}
		}
	}
</script>

<style scoped>
	@import url("./css/search.css");
</style>
