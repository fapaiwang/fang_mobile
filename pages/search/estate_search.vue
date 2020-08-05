<template>
	<view>
		<view class="header-wrap">
			<view class="index-header">
				<view class="input-wrap">
					<image class="iconfangdajing" src='../../static/img/base/searchIcon@2x.png'></image>
					<input maxlength="140"
						step="" placeholder="输入小区名称" autocomplete="off" 
						type="search" v-model="keyword" placeholder-class="uni-inputPlaceholder"
						class="uni-input" @input="inputChange">
				</view>
				<view class="user-wrap" @click="goUserClick">
					<image class="userIconfont" src='../../static/img/base/userIcon@2x.png'></image>
				</view>
			</view>
		</view>
		<view class="container">
			<view class="history">
				<text>搜索历史</text>
			</view>
			<view class="history_list">
				<text v-for="(item,key) in historyList" :key="key" v-if="item!=''">
					{{item}}
				</text>
			</view>
		</view>
		<view class="search_list">
			 <view v-for="(houseItem,key) in keyList" :key="key" @click="detail(houseItem.id)">
				 <text>{{houseItem.title}}</text>
				 <text>{{houseItem.address}}</text>
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
				historyData:'',
				historyList:[]
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
			inputChange:function() {
				var _self = this;
				this.fun.getReq(this.baseUrl+'/api/estate/estate_list',{keyword:this.keyword})
				.then((res)=>{
					if (_self.historyData.indexOf(_self.keyword) ==-1) {
						_self.historyData = _self.historyData+" "+_self.keyword
						_self.setStore(_self.historyData);
						_self.historyList = _self.historyData.split(" ");
					}
					this.keyList = res[1].data.lists.data;
				});
			},
			setStore(strRes) {
				var _self = this;
				uni.setStorage({
					key:_self.fun.searchEstate,
					data:strRes
				})
			},
			getStore(){
				var _self = this;
				uni.getStorage({
					key:_self.fun.searchEstate,
					success:function(ops){
						_self.historyData = ops.data
					},
					fail:function(){
					}
				})
			},
			detail(index){
				return this.fun.navTo("/pages/community/community?id="+index);
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
