<template>
	<view>
		<Banner :bannerdata="bannerdata"></Banner>
		<view class="container">
		<scroll-view class="scv" scroll-x="true" scroll-with-animation="true" :scroll-left="scrollLeft">
			<view :class="index === TabCur ? 'text-red' :''" v-for="(item,index) in tabList" :key="index" :id="index" @tap="tabChange(index,$event)">
				{{item.name}}
			</view>
		</scroll-view>
		<view>
			<view @click="poll()">
				<FocusList :arealist="arealist" :pricelist="pricelist" :familyData="familyData" :houseProperty="houseProperty" :areaData="areaData" :levelData="levelData" id="boxFixed" :class="{'is_fixed' : isfixed}" @myEvent="touchMe" :isShow.sync="isShow"></FocusList>
			</view>
			<Takeout :recommendHouseData="recommendHouseData" :loadingTxt="loadingTxt" ref="recommend" :isShow.sync="isShow"></Takeout>
		</view>
		</view>
	</view>
</template>

<script>
	import Banner from '@/components/base/banner.vue'; //
	import FocusList from '@/components/delicacy/delicacy.vue';
	import Takeout from '@/components/delicacy/list.vue';
	
	var _self, page = 1, timer = null;//timer延迟期
	
	export default {
		components:{
			Banner,
			FocusList,
			Takeout
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
				this.$refs.recommend.childMethod(_self.recommendHouseData,_self.loadingTxt)
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
					key:"houseProperty",
					success:function(res){
						_self.houseProperty = res.data
					},
					fail:function(){
						_self.fun.getReq(_self.baseUrl+'/api/second/houseType',{"id":26}).then((res)=>{
							_self.houseProperty = res[1].data.data;
							_self.setStore("houseProperty",res[1].data.data);
						});
					}
				})
				
				uni.getStorage({
					key:"areaData",
					success:function(res){
						_self.areaData = res.data
					},
					fail:function(){
						_self.fun.getReq(_self.baseUrl+'/api/second/getAcreage').then((res)=>{
							_self.areaData = res[1].data.data;
							_self.setStore("areaData",res[1].data.data);
						});
					}
				})
				
				uni.getStorage({
					key:"levelData",
					success:function(res){
						_self.levelData = res.data
					},
					fail:function(){
						_self.fun.getReq(_self.baseUrl+'/api/second/houseType',{"id":25}).then((res)=>{
							_self.levelData = res[1].data.data;
							_self.setStore("levelData",res[1].data.data);
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
				uni.pageScrollTo({
					scrollTop:this.topdata,
					duration:100
				})
				this.isShow = true;
				this.$refs.recommend.childMethod(_self.recommendHouseData,_self.loadingTxt)
			},
			//存缓存
			setStore(key,val){
				uni.setStorage({
					key:key,
					data:val
				})
			}
		},
		// 监听页面滚动距离
		onPageScroll(e) {
			this.rect = e.scrollTop
		},
	}

</script>

<style scoped>
	@import url("./css/index.css");
</style>
