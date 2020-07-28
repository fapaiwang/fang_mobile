<template>
	<view>
		<banner :bannerdata="bannerdata"></banner>
		<view class="container">
		<scroll-view class="scv" scroll-x="true" scroll-with-animation="true" :scroll-left="scrollLeft">
			<view :class="index === TabCur ? selectClass + ' cur':''" v-for="(item,index) in tabList" :key="index" :id="index" @tap="tabChange(index,$event)">
				{{item.name}}
			</view>
		</scroll-view>
		<view :class="isShow? focus:''">
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
	import FocusList from '@/components/delicacy/delicacy.vue';
	import Takeout from '@/components/delicacy/list.vue';
	
	var _self, page = 1, timer = null;//timer延迟期
	
	export default {
		components:{
			banner,
			FocusList,
			Takeout
		},
		props: {
			selectClass: {
			    type: String,
			    default() {
			        return 'text-red';
			    }
			},
			focus:{
				type: String,
				default() {
				    return 'focusList_warp';
				}
			},
		},
		computed: {
		    scrollLeft() {
		        return (this.TabCur - 1) * 60;
		    }
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
				cate:"",
				tabList: [{name : "重点推荐" ,val:"y1"}, {name : "自由购", val:"m10"}, {name: "6折房源", val:"y2"}, {name : "一口价", val:"g163"}],
				TabCur:0,
				keyword:"",
				isShow:true,
			}
		},
		onLoad:function(e){
			uni.setNavigationBarTitle({
				title:e.tit
			})
			_self = this;
			if (e.a !=undefined) {
				_self.cate = e.a;
			}
			if (e.keyword !=undefined) {
				this.keyword = e.keyword;
				_self.cate = e.keyword;
			}
			this.getRes();
			this.isShow = false;
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
			tabChange(index) {
				this.TabCur = index;
				this.getRes();
			},
			touchMe(val) { //子组件向父组件传值，接收值
				_self.cate = val;
				this.isShow = false;
				_self.getRecommendHouseData();
			},
			getRes(){
				this.getSortlist();
				this.getPricelist();
				this.getHouseType();
				this.getMoreData();
				this.getBannerData();
				this.getRecommendHouseData();
			},
			getRecommendHouseData() {
				page = 1;
				uni.showNavigationBarLoading();
				var url = this.baseUrl+'/api/second/houseList?a='+_self.tabList[this.TabCur].val;
				if (this.keyword !="") {
					url = this.baseUrl+'/api/second/houseList?keyword='+_self.cate
				}
				if (_self.cate != "") {
					url = _self.baseUrl+'/api/second/houseList?a='+_self.cate+_self.tabList[this.TabCur].val;
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
				var url = this.baseUrl+'/api/second/houseList?a='+_self.cate+_self.tabList[this.TabCur].val+'&page='+page;
				if (this.cate == "") {
					url = this.baseUrl+'/api/second/houseList?a='+_self.tabList[this.TabCur].val+"&page="+page;
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
				this.isShow = false;
				this.$refs.recommend.childMethod(_self.recommendHouseData,_self.loadingTxt,this.isShow)
			},
			getSortlist(){//获取区域
				this.fun.getReq(this.baseUrl+'/api/second/getAreaByCityId',{"city_id":39}).then((res)=>{
					this.arealist = res[1].data.data;
				});
			},
			getPricelist(){
				this.fun.getReq(this.baseUrl+'/api/second/getSecondPrice').then((res)=>{
					this.pricelist = res[1].data.data;
				});
			},
			getHouseType(){//户型
				this.fun.getReq(this.baseUrl+'/api/second/getRoom').then((res)=>{
					this.familyData = res[1].data.data;
				});
			},
			getMoreData(){
				var _res = []
				this.fun.getReq(this.baseUrl+'/api/second/houseType',{"id":26}).then((res)=>{
					this.houseProperty = res[1].data.data;
				});
				this.fun.getReq(this.baseUrl+'/api/second/getAcreage').then((res)=>{
					this.areaData = res[1].data.data;
				});
				this.fun.getReq(this.baseUrl+'/api/second/houseType',{"id":25}).then((res)=>{
					this.levelData = res[1].data.data;
				});
			},
			getBannerData() {
				this.fun.getReq(this.baseUrl+'/api/banner/index',{"space_id":22}).then((res)=>{
					this.bannerdata = res[1].data.data;
				});
			},
			poll(){//回到顶部
				uni.pageScrollTo({
					scrollTop:this.topdata,
					duration:100
				})
				this.isShow = true;
				this.$refs.recommend.childMethod(_self.recommendHouseData,_self.loadingTxt,this.isShow)
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
		padding: 40upx 30upx 0 30upx;
	}
	.scv{
		flex-wrap: nowrap;
		white-space: nowrap;
	}
	.scv view{
		display: inline-block;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		color: #999;
		font-size:28upx;
		margin-right: 71upx;
	}
	.text-red{
	  color:#DF2D23 !important;
	  font-weight:800;
	  font-family:PingFang SC;
	  color: #fff !important;
	  background:linear-gradient(90deg,rgba(245,111,111,1),rgba(221,84,74,1));
	  border-radius:25upx;
	  padding: 0 10px;
	}
	
	
	.focusList_warp{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 0 30upx;
	}
</style>
