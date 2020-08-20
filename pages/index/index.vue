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
		<getrecommendHouse></getrecommendHouse>
		<view class="moreView">
			<view @click="goMore" class="moreViewBtn">
				<text>更多推荐房源</text>
			</view>
		</view>
	</view>
</template>

<script>
	var _self, timer = null;//timer延迟期
	
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
				this.getTit();
			},
			getHomeMenuData() {
				var _self = this;
				uni.getStorage({
					key:_self.fun.HomeMenu,
					success:function(res){
						_self.homeMenuData = res.data
					},
					fail:function(){
						_self.fun.getReq(RequestUrl.homeMenu).then((res)=>{
							_self.homeMenuData = res[1].data.data;
							_self.setStore(_self.fun.HomeMenu,res[1].data.data);
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
				var _self = this;
				uni.getStorage({
					key:_self.fun.auction,
					success:function(res){
						_self.auctionData = res.data
					},
					fail:function(){
						_self.fun.getReq(RequestUrl.homeSearch).then((res)=>{
							_self.auctionData = res[1].data.data;
							_self.setStore(_self.fun.auction,res[1].data.data);
						});
					}
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
			getTit() { // 获取标题
				this.fun.getReq(this.baseUrl+'/api/getTdk',{"type":"index"})
				.then((res)=>{
					if (res[1].data.code == 10000) {
						uni.setNavigationBarTitle({
							title:res[1].data.data[0].seo_title
						})
					}
				})
			},
			goMore() {//加载更多
				if (this.tabIndex == 0 ){
					this.fun.navTo("/pages/all/index?a=y1")
				} else {
					this.fun.navTo("/pages/all/index?a=m10")
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
