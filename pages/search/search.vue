<template>
	<view>
		<view class="header-wrap" id="boxFixed">
			<view class="index-header">
				<view class="addressView" @click="goBack">
					<image class="arrowIcon" src='../../static/img/base/left.png'></image>
				</view>
				<view class="input-wrap">
					<image class="iconfangdajing" src='../../static/img/base/searchIcon@2x.png'></image>
					<input maxlength="140"
						step="" placeholder="请输入小区/房源/法拍经理名称" autocomplete="off" 
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
				<text v-for="(item,key) in historyList" :key="key" v-if="item !=''  ">
					{{item.first}}
					<text style="color:#E02E24" v-if="item.mid !='' ">{{item.mid}}</text>
					{{item.last}}
				</text>
			</view>
		</view>
		<view class="search_list" :style="{top:Height+'px'}">
			 <view v-if="keyList.length>0" v-for="(houseItem,key) in keyList" :key="key" @click="detail(houseItem.id)" class="search_item">
				 <view>
				 {{houseItem.first}}
				 <text style="color:#E02E24">{{houseItem.mid}}</text>
				 {{houseItem.last}}
				 </view>
			 </view>
		</view>
	</view>
</template>

<script>
	var query;
	export default {
		data() {
			return {
				keyword: '',
				keyList:[],
				historyData:'',
				historyList:[],
				Height:0,
				isShow:true,
				showIs:true,
				first:'',
				mid:'',
				last:'',
			}
		},
		onShow:function(){
			this.keyList = [];
			this.keyword = "";
			this.getStore();
			isShow:true;
		},
		onLoad:function(){
			this.keyList = [];
			this.keyword = "";
			this.getStore()
		},
		mounted:function(){
			var _seflDe = this;
			query = uni.createSelectorQuery().in(this);
			query.select('#boxFixed').boundingClientRect(data => {
				_seflDe.Height = data.height+30;
			}).exec();
		},
		methods: {
			doSearch(){
				this.fun.navTo("/pages/all/index?keyword="+this.keyword)
			},
			inputChange:function() {
				this.isShow = false;
				var _self = this;
				var _key = this.keyword;
				if (_key != "") {
					this.fun.getReq(this.baseUrl+'/api/searchSecond',{keyword:_key})
					.then((res)=>{
						var _newData = new Array();
						if (res[1].data.data.length > 0) {
							res[1].data.data.forEach(function(k,v){
								let key = k.title;
								if (key.indexOf(_key) !=-1) {
									let first = key.substr(0,key.indexOf(_key));
									let mid = key.substr(key.indexOf(_key),_key.length);
									let last = key.substr(first.length+mid.length,20);
									_newData.push({
										"id":k.id,
										"first":first,
										"mid":mid,
										"last":last
									});
								} else {
									let first = key
									_newData.push({
										"id":k.id,
										"first":first,
										"mid":'',
										"last":''
									});
								}
								_self.keyList = _newData;
								_self.setStore(_newData);
							})
						} else {
							_self.keyList = [];
						}
					});
				} else {
					_self.keyList = [];
				}
			},
			setStore(strRes) {
				var _self = this;
				console.log(strRes)
				uni.setStorage({
					key:_self.fun.searchList,
					data:strRes
				})
			},
			getStore(){
				var _self = this;
				uni.getStorage({
					key:_self.fun.searchList,
					success:function(ops){
						_self.historyList = ops.data
					},
					fail:function(){
					}
				})
			},
			detail(index){
				return this.fun.navTo("/pages/detail/index?id="+index);
			},
			goUserClick:function(){
				uni.switchTab({
					url:"/pages/mine/mine"
				})
			},
			goBack:function(){
				uni.navigateBack({
					delta:2
				})
			},
		}
	}
</script>

<style scoped>
	@import url("./css/search.css");
	/* #ifdef APP-PLUS */
		.header-wrap {
			margin-top: 10upx;
			height: 60upx;
			width: 100%;
			position: fixed;
			top: 0;
			z-index: 999;
			left: 40upx;
			padding-top: 60upx;
			width:91%;
		}
		.container{
			margin-top: 78px;
		}
	/* #endif */
	
	/* #ifdef MP-WEIXIN */
		.header-wrap {
		margin-top: 10upx;
		height: 60upx;
		width: 100%;
		top: 0;
		z-index: 999;
		left: 40upx;
		padding: 180upx 30upx 0 20upx;	
		width: 91%;
	}
	/* #endif */
	
	/* #ifdef H5 */
	.header-wrap {
		margin-top: 10upx;
		height: 60upx;
		width: 100%;
		top: 0;
		z-index: 999;
		left: 40upx;
		padding: 0 30upx;
		width: 91%;
	}
	/* #endif */
	.history_list text{
		margin: 0;
		margin-bottom: 10upx;
		width: 100%;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.history_list{
		overflow: hidden;
		text-overflow:ellipsis;
	}
</style>
