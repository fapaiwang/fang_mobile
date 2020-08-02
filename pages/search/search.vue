<template>
	<view>
		<view class="header-wrap">
				 <view class="index-header">
					<view class="input-wrap">
						<image class="iconfangdajing" src='../../static/img/base/searchIcon@2x.png'></image>
						<input maxlength="140"
							step="" 
							placeholder="输入小区名称" 
							autocomplete="off" 
							type="search"
							v-model="keyword"
							placeholder-class="uni-inputPlaceholder"
							class="uni-input" @confirm="inputChange">
					</view>
					<view class="user-wrap"
						  @click="goUserClick">
						  <image class="userIconfont" src='../../static/img/base/userIcon@2x.png'></image>
					</view>
				 </view>
				 <view class="search_list">
					 <view v-for="(houseItem,key) in keyList" :key="key" @click="detail(houseItem.id)">
						 <text>{{houseItem.title}}</text>
						 <text>{{houseItem.address}}</text>
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
				keyword: '',
				keyList:[],
			}
		},
		onShow:function(){
			this.keyList = [];
			this.keyword = "";
		},
		methods: {
			inputChange:function(){
				this.fun.getReq(this.baseUrl+'/api/second/houseList',{keyword:this.keyword})
				.then((res)=>{
					this.keyList = res[1].data.data.lists.data
				});
			},
			detail(index){
				return this.fun.navTo("/pages/detail/index?id="+index);
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
	.search_list{
		position: absolute;
		z-index: 1111;
		background: #fff;
		left: 0;
	}
	.search_list view{
		margin-bottom: 20upx;
	}
	.search_list view text{
		font-size: 28upx;
		width: 100%;
		display: inline-block;
		overflow: hidden;
		text-overflow: ellipsis;
		display:-webkit-box; //作为弹性伸缩盒子模型显示。
		-webkit-box-orient:vertical;
		-webkit-line-clamp:1;
	}
	.search_list view text:last-child{
		font-size: 24upx;
		color: #999999;
	}
</style>
