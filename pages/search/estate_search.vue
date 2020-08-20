<template>
	<view>
		<view class="header-wrap">
			<view class="index-header">
				<view class="input-wrap">
					<image class="iconfangdajing" src='../../static/img/base/searchIcon@2x.png'></image>
					<input maxlength="140"
						step="" placeholder="输入小区名称" autocomplete="off" 
						type="search" v-model="keyword" placeholder-class="uni-inputPlaceholder"
						class="uni-input" @input="inputChange" @confirm="doSearch">
				</view>
				<view class="user-wrap" @click="goUserClick">
					<image class="userIconfont" src='../../static/img/base/userIcon@2x.png'></image>
				</view>
			</view>
		</view>
		<view class="container" v-if="isShow">
			<view class="history">
				<text>搜索历史</text>
			</view>
			<view class="history_list">
				<text v-for="(item,key) in historyList" :key="key" v-if="item!=''" class="historyitem" @click="ondetail(item.id)">
					{{item.title}}
				</text>
			</view>
		</view>
		<view class="search_list">
			 <view v-for="(houseItem,key) in keyList" :key="key" @click="detail(houseItem)" class="search_item">
				 <text style="text-align: left;">小区：{{houseItem.title}}</text>
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
				historyList:[],
				isShow:true,
			}
		},
		onShow:function(){
			this.keyList = [];
			this.keyword = "";
			this.getStore()
		},
		onLoad:function(){
			this.keyList = [];
			this.keyword = "";
			this.getStore()
		},
		methods: {
			doSearch(){
				this.fun.navTo("/pages/community/index="+this.keyword)
			},
			ondetail(id){
				this.fun.navTo("/pages/community/community?id="+id);
			},
			inputChange:function() {
				var _self = this;
				this.isShow = false;
				this.fun.getReq(this.baseUrl+'/api/estate/estate_list',{keyword:this.keyword})
				.then((res)=>{
					this.keyList = res[1].data.lists.data;
				});
			},
			detail(houseItem){
				this.setStore(houseItem);
				this.fun.navTo("/pages/community/community?id="+houseItem.id);
			},
			setStore(houseItem) {
				var _self = this;
				var _key = _self.fun.searchEstate;
				uni.getStorage({
					key:_key,
					success:function(ops) {
						let oldData = ops.data;
						ops.data.forEach(function(item,itemKey){
							if (item.title==houseItem.title) {
								return false;
							} else {
								oldData.push({
									"id":houseItem.id,
									"title":houseItem.title
								});
								uni.setStorage({
									key:_key,
									data:oldData
								})
								return false;
							}
						})
						
						
					},
					fail:function(){
						var _newData = new Array({
							"id":houseItem.id,
							"title":houseItem.title
						});
						uni.setStorage({
							key:_key,
							data:_newData
						})
					}
				})
			},
			getStore(){
				var _self = this;
				uni.getStorage({
					key:_self.fun.searchEstate,
					success:function(ops){
						_self.historyList = ops.data
					},
					fail:function(){
					}
				})
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
	.header-wrap{
		width: 95%;
		margin-left: 2%;
	}
	.container{
		margin-top: 0px;
	}
	.user-wrap{
		/* margin-top: -10upx; */
		height: 60upx;
	}
</style>
