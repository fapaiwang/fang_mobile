<template>
	<view style="container">
		<navSearch></navSearch>
		<banner :bannerdata="bannerdata"></banner>
		<HomeMenu :homeMenuData="homeMenuData"></HomeMenu>
		<auctionMenu :auctionData="auctionData"></auctionMenu>
		<infoScroll :todayAddData="todayAddData"></infoScroll>
		<SelectHouse></SelectHouse>
		<centerBanner :centerBannerdata='centerBannerdata'></centerBanner>
		<featured :qualityEstateData='qualityEstateData'></featured>
		<getrecommendHouse></getrecommendHouse>
		<!-- <chatSuspension>
			<template>
				<view class="chat_xuanfu">
					<image src="../../static/img/base/chat_mobile.png" class="chat_xuanfu_img" @click="chat_xuanfu_img_click"></image>
				</view>
			</template>
		</chatSuspension> -->
		<view v-if="showUpdate" class="showUpdate">
			<text class="version_num">1.1.1</text>
			<text class="version_tit">1.1.1</text>
			<view class="updateCon">
				<text>
					1、优化分析
				</text>
				<text>
					2、优化性能
				</text>
				<text>
					3、优化修复bug
				</text>
			</view>
			<button @click="update()" class="update">抢先体验</button>
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
	// import chatSuspension from '@/components/home/chatSuspension.vue';//悬浮按钮
	import RequestUrl from '@/components/common/js/requests.js';
	
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
			SelectHouse,
			// chatSuspension
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
				showUpdate:false,
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
		// 启动热更新
		onLaunch:function() {
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid,(wgtinfo)=>{
				// 请求接口 获取最新版本号
				// _self.fun.getReq(RequestUrl.homeMenu).then((res)=>{
					
				// });
				if (101 > wgtinfo.version.split('.').join('')) {
					this.showUpdate = true;
				}
			})
			// #endif
		},
		methods: {
			// chat_xuanfu_img_click(){
			// 	this.fun.navTo("/pages/detail/kefu")
			// },
			update(){
				
			},
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
		.chat_xuanfu{
	
			display: block;
			position: fixed;
			bottom: 9%;
		    left: 85%;
		}
		.chat_xuanfu .chat_xuanfu_img{
			width: 80upx;
			height: 80upx;
		}
		.showUpdate{
			position: fixed;
			background: #ccc;
			width: 70%;
			height: 500upx;
			z-index: 1;
			top: 30%;
			left: 15%;
		}
		.version_num,.version_tit{
			color: #FFFFFF;
			font-size: 40upx;
			width: 100%;
			display: inline-block;
			padding-left: 30upx;
			margin-top: 20upx;
			font-weight: bold;
			line-height: 40upx;
		}
		.updateCon{
			padding-left: 30upx;
		}
		.updateCon text{
			width: 100%;
			font-size: 28upx;
			display: inline-block;
		}
		.update{
			width: 100%;
			text-align: center;
		}
@import url("./css/index.css");
</style>
