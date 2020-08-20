<template>
	<view :class="isFix ? 'fix' : 'fix1' ">
		<view class="container">
			<view @tap="poll()" class="topSty">
				<FocusList :arealist="arealist" :pricelist="pricelist" :familyData="familyData" :houseProperty="houseProperty" :areaData="areaData" :levelData="levelData" :statusReData="statusReData" @myEvent="touchMe" :tabCur="tabCur" :backVal="backVal" :search="keyword"></FocusList>
			</view>
			<Takeout :recommendHouseData="recommendHouseData" :loadingTxt="loadingTxt" ref="recommend"></Takeout>	
		</view>
	</view>
</template>

<script>
	import FocusList from '@/components/all/delicacy.vue';
	import Takeout from '@/components/all/list.vue';
	
	var _self, page = 1, timer = null, query;//timer延迟期
	
	export default {
		components:{
			FocusList,
			Takeout
		},
		data() {
			return {
				rect:'',
				topdata:'',
				menuData: '',
				arealist:[],
				pricelist:[],
				houseProperty:[],
				familyData:[],
				areaData:[],
				levelData:[],
				loadingTxt:"加载更多",
				recommendHouseData:[],
				statusReData:[],
				cate:"",
				keyword:"",
				isNum:1,
				isFix:false,
				tabCur:999,
				backVal:"",
				getRe:true,
			}
		},
		onLoad:function(e){
			uni.setNavigationBarTitle({
				title:e.tit
			})
			_self = this;
			if (e.a !=undefined) {
				_self.cate = e.a;
				_self.backVal = e.a;
			}
			if (e.keyword !=undefined) {
				this.keyword = e.keyword;
				_self.cate = e.keyword;
			}
			if (e.tabCur !=undefined) {
				_self.TabCur = Number(e.tabCur);
			} else {
				_self.TabCur = 999;
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
			this.getRe = true;
		},
		mounted:function() {
			query = uni.createSelectorQuery().in(this);
			query.select('#boxFixed').boundingClientRect(data => {
				this.topdata = data.top;
				this.menuData = data.top;
			}).exec();
		},
		methods: {
			touchMe(val) { //子组件向父组件传值，接收值
				_self.isNum = 2;
				_self.cate = val;
				this.isFix = false;
				this.getRe = true;
				_self.getRecommendHouseData();
			},
			getRes(){
				this.getSortlist();
				this.getPricelist();
				this.getHouseType();
				this.getMoreData();
				this.getRecommendHouseData();
				this.getBannerData();
			},
			getRecommendHouseData() {
				if (this.getRe) {
					page = 1;
					uni.showNavigationBarLoading();
					var url = '';
					if (this.TabCur !=999 && this.keyword !="") {
						url = this.baseUrl+'/api/second/houseList?keyword='+_self.cate
					} else if (this.keyword !="") {
						url = this.baseUrl+'/api/second/houseList?keyword='+this.keyword;
					} else {
						url = this.baseUrl+'/api/second/houseList?a='+_self.cate;
					}
					_self.fun.getReq(url)
					.then((res)=>{
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh();
						if (res[1].data.data.lists.data ==0 && page==1) {
							_self.loadingTxt = '已经加载全部'
							_self.recommendHouseData = [];
							_self.getLoad();
							return false;
						}
						_self.loadingTxt = '加载更多'
						uni.setNavigationBarTitle({
							title:res[1].data.data.setSeo.seo_title
						})
						var newsList = res[1].data.data.lists.data;
						_self.recommendHouseData = newsList;
						_self.getLoad();
						page++;
					})
					this.getRe = false;
				}
			},
			getMoreRecommend(){//加载更多
				if (this.getRe) {
					if (_self.loadingTxt == '已经加载全部'){
						return false;
					}
					_self.loadingTxt = '加载中';
					uni.showNavigationBarLoading();
					
					var url = '';
					console.log(_self.cate);
					if (_self.keyword !="") {
						url = this.baseUrl+'/api/second/houseList?keyword='+_self.keyword+'&page='+page;
					} else {
						url = this.baseUrl+'/api/second/houseList?a='+_self.cate+'&page='+page;;
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
					this.getRe = false;
				}
			},
			getLoad(){
				this.$refs.recommend.childMethod(_self.recommendHouseData,_self.loadingTxt);
			},
			getSortlist(){//获取区域
				uni.getStorage({
					key:"area",
					success:function(res){
						_self.arealist = res.data
					},
					fail:function(){
						_self.fun.getReq(_self.baseUrl+'/api/second/getAreaByCityId',{"city_id":39}).then((res)=>{
							_self.arealist = res[1].data.data;
							_self.setStore("area",res[1].data.data);
						});
					}
				})
			},
			getPricelist(){//获取价格
				uni.getStorage({
					key:"price",
					success:function(res){
						_self.pricelist = res.data
					},
					fail:function(){
						_self.fun.getReq(_self.baseUrl+'/api/second/getSecondPrice').then((res)=>{
							_self.pricelist = res[1].data.data;
							_self.setStore("price",res[1].data.data);
						});
					}
				})
			},
			getHouseType(){//户型
				uni.getStorage({
					key:"room",
					success:function(res){
						_self.familyData = res.data
					},
					fail:function(){
						_self.fun.getReq(_self.baseUrl+'/api/second/getRoom').then((res)=>{
							_self.familyData = res[1].data.data;
							_self.setStore("room",res[1].data.data)
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
			getBannerData() {
				this.fun.getReq(this.baseUrl+'/api/banner/index',{"space_id":22}).then((res)=>{
					this.bannerdata = res[1].data.data;
				});
			},
			poll(){//回到顶部
				if (this.isNum==1) {
					this.isFix = true;
					this.isNum = 2;
				}
				this.$refs.recommend.childMethod(_self.recommendHouseData,_self.loadingTxt)
			},
			//存缓存
			setStore(key,val){
				uni.setStorage({
					key:key,
					data:val
				})
			},
		},
		// 监听页面滚动距离
		onPageScroll(e) {
			// console.log(e.scrollTop);
			this.rect = e.scrollTop
		},
	}

</script>

<style scoped>
	@import url("./css/index.css");
	/* #ifdef MP-WEIXIN */
		.topSty{
			position: fixed;
			margin-top: 0;
			width: 100%;
			top: 90upx;	
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
