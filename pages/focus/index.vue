<template>
	<view :class="isFix ? 'fix' : '' ">
		<view class="container">
			<view @click="poll" class="topSty">
				<FocusList :arealist="arealist" :pricelist="pricelist" :familyData="familyData" :houseProperty="houseProperty" :areaData="areaData" :levelData="levelData" :statusReData="statusReData"  @myEvent="touchMe"></FocusList>
			</view>
			<Takeout :recommendHouseData="recommendHouseData" :loadingTxt="loadingTxt" ref="recommend"></Takeout>
		</view>
		<chatSuspension></chatSuspension>
	</view>
</template>

<script>
	
	import FocusList from '@/components/delicacy/delicacy.vue';
	import Takeout from '@/components/delicacy/list.vue';
	import chatSuspension from '@/components/home/chatSuspension.vue'; //悬浮按钮
	
	var _self, page = 1, timer = null, query, animation;//timer延迟期
	
	export default {
		components:{
			FocusList,
			Takeout,
			chatSuspension
		},
		data() {
			return {
				arealist:[],
				pricelist:[],
				houseProperty:[],
				familyData:[],
				areaData:[],
				levelData:[],
				statusReData:[],//状态
				loadingTxt:"加载更多",
				recommendHouseData:[],
				cate:"",
				keyword:"",
				isNum:1,
				isFix:false,
			}
		},
		onShow:function(){
			this.cate = "";
			this.getRes();
		},
		onLoad:function(e){
			_self = this;
		
			uni.setNavigationBarTitle({
				title:e.tit
			})
			
			if (e.a !=undefined) {
				_self.cate = e.a;
			}
			if (e.keyword !=undefined) {
				this.keyword = e.keyword;
				_self.cate = e.keyword;
			}
			this.getRes();
		},
		onPullDownRefresh:function(){//上滑获取数据
			this.getRecommendHouseData();
		},
		onReachBottom:function(){//下滑获取数据
			this.getMoreRecommend();
			if (timer!=null){
				clearTimeout(timer);
			}
			timer = setTimeout(function(){
				_self.getMoreRecommend();
			},500);
		},
		methods: {
			poll(){
				if (this.isNum==1) {
					this.isFix = true;
					this.isNum=2;
				}
			},
			touchMe(val) { //子组件向父组件传值，接收值
				this.isFix = false;
				_self.cate = val;
				_self.getRecommendHouseData();
			},
			getRes(){
				this.getSortlist();
				this.getPricelist();
				this.getHouseType();
				this.getMoreData();
				this.getRecommendHouseData();
			},
			getRecommendHouseData() {
				page = 1;
				uni.showNavigationBarLoading();
				if (_self.cate == "init") {
					return false;
				}
				var url = this.baseUrl+'/api/second/houseList?'
				if (this.keyword !="") {
					url = _self.baseUrl+'/api/second/houseList?keyword='+_self.cate
				}
				if (_self.cate != "") {
					url = _self.baseUrl+'/api/second/houseList?a='+_self.cate;
				}
				_self.fun.getReq(url)
				.then((res)=>{
					_self.isNum=1;
					uni.hideNavigationBarLoading();
					uni.stopPullDownRefresh();
					if (res[1].data.data.lists.data ==0 && page==1) {
						_self.loadingTxt = '已经加载全部'
						_self.recommendHouseData = [];
						_self.getLoad();
						return false;
					}
					uni.setNavigationBarTitle({
						title:res[1].data.data.setSeo.seo_title
					})
					_self.loadingTxt = '加载更多'
					var newsList = res[1].data.data.lists.data;
					_self.recommendHouseData = newsList;
					_self.getLoad();
					page++;
				})
			},
			getMoreRecommend(){//加载更多
				if (_self.loadingTxt == '已经加载全部'){
					return false;
				}
				_self.loadingTxt = '加载中';
				uni.showNavigationBarLoading();
				var url = this.baseUrl+'/api/second/houseList?a='+_self.cate+'&page='+page;
				if (this.cate == "") {
					url = this.baseUrl+'/api/second/houseList?page='+page;
				}
				this.fun.getReq(url).then((res)=>{
					uni.hideNavigationBarLoading();
					if (res[1].data.data.lists.data.length ==0) {
						_self.loadingTxt = '已经加载全部'
						_self.getLoad();
						return false;
					}
					var newsList = res[1].data.data.lists.data;
					_self.recommendHouseData = _self.recommendHouseData.concat(newsList);
					uni.stopPullDownRefresh();
					_self.loadingTxt = '加载更多';
					_self.getLoad();
					page++;
				})
			},
			getLoad(){
				this.$refs.recommend.childMethod(_self.recommendHouseData,_self.loadingTxt)
			},
			getSortlist(){//获取区域
				uni.getStorage({
					key:_self.fun.area,
					success:function(res){
						_self.arealist = res.data
					},
					fail:function(){
						_self.fun.getReq(_self.baseUrl+'/api/second/getAreaByCityId',{"city_id":39}).then((res)=>{
							_self.arealist = res[1].data.data;
							_self.setStore(_self.fun.area,res[1].data.data);
						});
					}
				})
			},
			getPricelist(){//获取价格
				uni.getStorage({
					key:_self.fun.price,
					success:function(res){
						_self.pricelist = res.data
					},
					fail:function(){
						_self.fun.getReq(_self.baseUrl+'/api/second/getSecondPrice').then((res)=>{
							_self.pricelist = res[1].data.data;
							_self.setStore(_self.fun.price,res[1].data.data);
						});
					}
				})
			},
			getHouseType(){//户型
				uni.getStorage({
					key:_self.fun.room,
					success:function(res){
						_self.familyData = res.data
					},
					fail:function(){
						_self.fun.getReq(_self.baseUrl+'/api/second/getRoom').then((res)=>{
							_self.familyData = res[1].data.data;
							_self.setStore(_self.fun.room,res[1].data.data)
						});
					}
				})
			},
			getMoreData(){
				uni.getStorage({
					key:_self.fun.houseProperty,
					success:function(res){
						_self.houseProperty = res.data
					},
					fail:function(){
						_self.fun.getReq(_self.baseUrl+'/api/second/houseType',{"id":26}).then((res)=>{
							_self.houseProperty = res[1].data.data;
							_self.setStore(_self.fun.houseProperty,res[1].data.data);
						});
					}
				})
				
				uni.getStorage({
					key:_self.fun.areaData,
					success:function(res){
						_self.areaData = res.data
					},
					fail:function(){
						_self.fun.getReq(_self.baseUrl+'/api/second/getAcreage').then((res)=>{
							_self.areaData = res[1].data.data;
							_self.setStore(_self.fun.areaData,res[1].data.data);
						});
					}
				})
				
				uni.getStorage({
					key:_self.fun.levelData,
					success:function(res){
						_self.levelData = res.data
					},
					fail:function(){
						_self.fun.getReq(_self.baseUrl+'/api/second/houseType',{"id":25}).then((res)=>{
							_self.levelData = res[1].data.data;
							_self.setStore(_self.fun.levelData,res[1].data.data);
						});
					}
				})
				
				uni.getStorage({
					key:_self.fun.statusData,
					success:function(res){
						_self.statusReData = res.data
					},
					fail:function(){
						_self.fun.getReq(_self.baseUrl+'/api/second/houseType',{"id":27}).then((res)=>{
							_self.statusReData = res[1].data.data;
							_self.setStore(_self.fun.statusData,res[1].data.data);
						});
					}
				})
			},
			//存缓存
			setStore(key,val){
				uni.setStorage({
					key:key,
					data:val
				})
			},
		},
	}
</script>

<style scoped>
	/* #ifdef MP-WEIXIN */
		.topSty{
			position: fixed;
			/* margin-top: 90upx; */
			width: 100%;
			/* top: 90upx; */
			z-index: 1111;
			background: #fff;
		}
	/* #endif */
	
	/* #ifdef APP-PLUS */
	.topSty{
		position: fixed;
		margin-top: 0;
		width: 100%;
		top: 0;	
		z-index: 1111;
		background: #fff;
	}
	/* #endif */
	
	.fix{
		position: fixed;
		height: 100%;
		overflow: hidden;
		width: 100%;
	}
</style>