<template name="uni-navSearchHeader">
	<view class="header-wrap">
			 <view class="index-header">
				<view  @click="onPickCityClick" class="addressView">
					<text class="address">北京</text>
					<image class="arrowIcon" src='../../static/img/base/arrow@2x.png'></image>
				</view>
				<view class="input-wrap">
					<image class="iconfangdajing" src='../../static/img/base/searchIcon@2x.png'></image>
					<input maxlength="140"
						step="" 
						placeholder="输入小区名称" 
						autocomplete="off" 
						type="search"
						v-model="value"
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
</template>

<script>
	export default {
		name: "navSearchHeader",
		data () {
			return {
				value: ''
			}
		},
		methods: {
			onPickCityClick:function(){
				console.log(this.value)
			},
			inputChange:function(){
				this.fun.navTo("/pages/search/estate_search")
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
	@import url("./css/navSearchHeader.css");
</style>
