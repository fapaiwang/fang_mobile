<template name="uni-navSearchHeader">
	<view class="header-wrap">
			 <view class="index-header">
				 <view class="addressView" @click="goBack">
				 	<image class="arrowIcon" src='../../static/img/base/left.png'></image>
				 </view>
				<view class="input-wrap">
					<image class="iconfangdajing" src='../../static/img/base/searchIcon@2x.png'></image>
					<input maxlength="140"
						step="" 
						placeholder="请输入小区/房源/法拍经理名称" 
						autocomplete="off" 
						type="search"
						v-model="search"
						@click="inputChange"
						placeholder-class="uni-inputPlaceholder"
						class="uni-input" style="color: #000;">
				</view>
				<view class="user-wrap"
					  @click="goUserClick">
					  <image class="userIconfont" src='../../static/img/base/area.png'></image>
				</view>
			 </view>
		 </view>
</template>

<script>
	export default {
		name: "navSearchHeader",
		props:["back","search"],
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
				this.fun.navTo("/pages/search/search")
			},
			goBack:function(){
				if (Number(this.back)==1) {
					uni.switchTab({
						url:"/pages/index/index"
					})
				}
				if (Number(this.back)==2) {
					uni.navigateBack({
						delta:1
					})
				}
				
			},
			goUserClick(){
				
			}
		}
	}
	
</script>

<style scoped>
	@import url("./css/navSearch.css");
</style>
