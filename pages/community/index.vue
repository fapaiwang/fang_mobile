<template>
	<view >
		<banner :bannerdata="bannerdata"></banner>
		<view class="container">
			<view class="focusList_warp">
				<view @click="poll()">
					<FocusList :arealist="arealist" :pricelist="pricelist" :familyData="familyData" :houseProperty="houseProperty" :areaData="areaData" :levelData="levelData" id="boxFixed" :class="{'is_fixed' : isfixed}" @myEvent="touchMe"></FocusList>
				</view>
				<Takeout :recommendHouseData="recommendHouseData" :loadingTxt="loadingTxt" ref="recommend"></Takeout>
			</view>
		</view>
	</view>
</template>

<script>
	import banner from '@/components/base/banner.vue'; //
	import FocusList from '@/components/community/delicacy.vue';
	import Takeout from '@/components/community/takeout.vue';
	var _self, page = 1, timer = null;//timer延迟期
	
	export default {
		components:{
			banner,
			FocusList,
			Takeout
		},
		data() {
			return {
				bannerdata: [],
				isfixed: false,
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
				cate:""
			}
		},
		onLoad:function(){
			_self = this;
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
		mounted:function() {
			const query = uni.createSelectorQuery().in(this);
			query.select('#boxFixed').boundingClientRect(data => {
				this.topdata = data.top;
				this.menuData = data.top;
			}).exec();
		},
		methods: {
			getRes() {
				this.getSortlist();
				this.getPricelist();
				this.getHouseType();
				this.getMoreData();
				this.getRecommendHouseData();
				this.getBannerData();
			},
			touchMe(val){
				_self.cate = val;
				_self.getRecommendHouseData();
			},
			getRecommendHouseData() {
				page = 1;
				uni.showNavigationBarLoading();
				var url = this.baseUrl+'/api/second/houseList';
				if (_self.cate != "") {
					url = _self.baseUrl+'/api/second/houseList?a='+_self.cate;
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
				uni.request({
					url:this.baseUrl+'/api/second/getAreaByCityId',
					method:'GET',
					data:{"city_id":39},
				}).then((res)=>{
					this.arealist = res[1].data.data
				})
			},
			getPricelist(){
				this.fun.getReq(this.baseUrl+'/api/estate/average_price').then((res)=>{
					this.pricelist = res[1].data.data;
				});
			},
			getHouseType(){//类型
				this.fun.getReq(this.baseUrl+'/api/second/houseType?id=9').then((res)=>{
					this.familyData = res[1].data.data;
				});
			},
			getMoreData(){
				var _res = []
				uni.request({
					url:this.baseUrl+'/api/second/houseType',
					method:'GET',
					data:{"id": 26},
				}).then((res)=>{
					this.houseProperty = res[1].data.data
				})
				
				uni.request({
					url:this.baseUrl+'/api/second/getAcreage',
					method:'GET',
				}).then((res)=>{
					this.areaData = res[1].data.data
				})
				uni.request({
					url:this.baseUrl+'/api/second/houseType',
					method:'GET',
					data:{"id": 25},
				}).then((res)=>{
					this.levelData = res[1].data.data
				})
			},
			getBannerData() {
				uni.request({
					url: this.baseUrl+'/api/banner/index', 
					data:{"space_id":25},
					success: (res) => {
						this.bannerdata = res.data.data
					}
				})
			},
			poll(){//回到顶部
				uni.pageScrollTo({
					scrollTop:this.topdata+2,
					duration:100
				})
				
			}
		},
		// 监听页面滚动距离
		onPageScroll(e) {
			this.rect = e.scrollTop
		}
	}

</script>

<style scoped>
.container{
	padding: 0 30upx;
}
</style>
