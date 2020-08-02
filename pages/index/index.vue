<template>
	<view>
		<navSearch></navSearch>
		<banner :bannerdata="bannerdata"></banner>
		<HomeMenu :homeMenuData="homeMenuData"></HomeMenu>
		<auctionMenu :auctionData="auctionData"></auctionMenu>
		<infoScroll :todayAddData="todayAddData"></infoScroll>
		<SelectHouse></SelectHouse>
		<centerBanner :centerBannerdata='centerBannerdata'></centerBanner>
		<featured :qualityEstateData='qualityEstateData'></featured>
		<getrecommendHouse ref="recommend" :tabIndex.sync="tabIndex" :recommendHouseData='recommendHouseData' :restrictHouseData='restrictHouseData'></getrecommendHouse>
		<view class="moreView">
			<view @click="goMore" class="moreViewBtn">
				<text>更多推荐房源</text>
			</view>
		</view>
	</view>
</template>

<script>
	var _self, page,freePage = 1;//timer延迟期
	
	import navSearch from '@/components/base/navSearchHeader.vue'; // 搜索框
	import banner from '@/components/home/banner.vue'; // banner
	import HomeMenu from '@/components/home/navSearchHeader.vue'; //快速导航
	import auctionMenu from '@/components/home/auction.vue' // 拍卖
	import infoScroll from '@/components/home/infoScroll.vue' // 今日新增推荐
	import centerBanner from '@/components/home/centerBanner.vue' // 中间广告图
	import featured from '@/components/home/featured.vue' // 精选小区
	import getrecommendHouse from '@/components/home/recommendHouse.vue' // 推荐房源
	import WucTab from '@/components/tab/wuc-tab.vue';
	import SelectHouse from '@/components/home/selectHouse.vue';//为您选房
	import RequestUrl from '@/components/common/js/requests.js'
	
	export default {
		components:{
			navSearch,
			HomeMenu,
			banner,
			auctionMenu,
			infoScroll,
			centerBanner,
			featured,
			getrecommendHouse,
			WucTab,
			SelectHouse
		},
		name: "index",
		data() {
			return {
				homeMenuData: [],
				bannerdata: [],
				auctionData: [],
				todayAddData: [],
				centerBannerdata: [],
				qualityEstateData: [],
				recommendHouseData: [],
				restrictHouseData: [],
				tabIndex:0,
			}
		},
		onShow() {
			_self = this;
			this.getHomeData();
		},
		onLoad:function(){
			_self = this;
			this.getHomeData()
		},
		methods: {
			getHomeData() {
				this.getHomeMenuData();
				this.getBannerData();
				this.getHomeSecondSearch();
				this.getTodayAddData();
				this.getqualityEstateData();
				this.getRecommendHouseData();
			},
			getHomeMenuData() {
				this.fun.getReq(RequestUrl.homeMenu).then((res)=>{
					this.homeMenuData = res[1].data.data;
				})
			},
			getBannerData() {
				this.fun.getReq(RequestUrl.indexBanner,{"space_id":4})
				.then((res)=>{
					this.bannerdata = res[1].data.data;
				})
				this.fun.getReq(RequestUrl.indexBanner,{"space_id":14})
				.then((res)=>{
					this.centerBannerdata = res[1].data.data
				})
			},
			getHomeSecondSearch() {
				this.fun.getReq(RequestUrl.homeSearch)
				.then((res)=>{
					this.auctionData = res[1].data.data
				})
			},
			getTodayAddData() {
				this.fun.getReq(RequestUrl.scrollInfo)
				.then((res)=>{
					this.todayAddData = res[1].data.data
				})
			},
			getqualityEstateData() { // 推荐小区
				this.fun.getReq(RequestUrl.recommendedCommunity)
				.then((res)=>{
					this.qualityEstateData = res[1].data.data
				})
			},
			getRecommendHouseData() { //推荐房源
				this.fun.getReq(RequestUrl.recommendHouse,{"page":page})
				.then((res)=>{
					this.recommendHouseData = res[1].data.data.data
					page++
				})
				this.fun.getReq(RequestUrl.restrictHouse,{"page":freePage})//自由购
				.then((res)=>{
					this.restrictHouseData = res[1].data.data
					freePage++
				})
			},
			getMorequalityEstateData() { // 更多推荐房源
				this.fun.getReq(RequestUrl.recommendHouse,{"page":page})
				.then((res)=>{
					var newsList = res[1].data.data.data;
					_self.recommendHouseData = _self.recommendHouseData.concat(newsList);
					page++;
					this.getLoad()
				})
			},
			getMoreRecommendHouseData() { // 更多自由购
				this.fun.getReq(RequestUrl.restrictHouse,{"page":freePage})
				.then((res)=>{
					var newsList = res[1].data.data;
					_self.restrictHouseData = _self.restrictHouseData.concat(newsList);
					freePage++;
					this.getLoad()
				})
			},
			goMore() {//加载更多
				if (this.tabIndex == 0 ){
					this.getMorequalityEstateData();
				} else {
					this.getMoreRecommendHouseData()
				}
			},
			getLoad() {//更新子组件
				var appendH = 0;
				if (_self.recommendHouseData.length > _self.restrictHouseData.length) {
					appendH = 115*_self.recommendHouseData.length;
				} else {
					appendH = 115*_self.restrictHouseData.length;
				}
				if (page ==1 || freePage==1) {
					appendH+=690
				}
				this.$refs.recommend.childMethod(this.recommendHouseData,this.restrictHouseData,appendH)
			},
			imgUrl(ImgSrc) {
				return this.fun.getImgSrc(ImgSrc);
			},
		}
	}
</script>

<style scoped>
@import url("./css/index.css");
</style>
