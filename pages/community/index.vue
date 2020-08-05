<template>
	<view :class="mark ? 'mark' : ''">
		<navSearch></navSearch>
		<banner :bannerdata="bannerdata"></banner>
		<view>
			<view class="container">
				<view @click="poll()" style="width: 100%;">
					<FocusList :arealist="arealist" :pricelist="pricelist" :familyData="familyData" :houseProperty="houseProperty" :areaData="areaData" :levelData="levelData" id="boxFixed" :class="{'is_fixed' : isfixed}" @myEvent="touchMe" ref="deli" :typeNum="typeNum"></FocusList>
				</view>
				<Takeout :recommendHouseData="recommendHouseData" :loadingTxt="loadingTxt" ref="recommend"></Takeout>
			</view>
		</view>
	</view>
</template>

<script>
	import navSearch from '@/components/community/navSearchHeader.vue'; // 搜索框
	import banner from '@/components/community/banner.vue'; //
	import FocusList from '@/components/community/delicacy.vue';
	import Takeout from '@/components/community/takeout.vue';
	var _self, page = 1, timer = null;//timer延迟期
	
	export default {
		components:{
			navSearch,
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
				cate:"",
				mark:false,
				addNum:1,
				typeNum:-1
			}
		},
		onLoad:function(option){
			_self = this;
			if (option.type != undefined) {
				_self.cate = {
					type:option.type
				}
				_self.typeNum = option.type;
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
				_self.$refs.deli.childMethod(false);
				_self.addNum = 2;
				this.mark = false;
				_self.getRecommendHouseData();
			},
			getRecommendHouseData() {
				page = 1;
				uni.showNavigationBarLoading();
				var url = this.baseUrl+'/api/estate/estate_list';
				_self.fun.getReq(url,_self.cate)
				.then((res)=>{
					uni.hideNavigationBarLoading();
					uni.stopPullDownRefresh();
					if (res[1].data.lists.data ==0 && page==1) {
						_self.loadingTxt = '已经加载全部'
						_self.recommendHouseData = [];
						_self.getLoad();
						return false;
					}
					
					_self.loadingTxt = '加载更多'
					var newsList = res[1].data.lists.data;
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
				var url = this.baseUrl+'/api/estate/estate_list?page='+page;
				this.fun.getReq(url,_self.cate).then((res)=>{
					uni.hideNavigationBarLoading();
					if (res[1].data.lists.data.length ==0) {
						_self.loadingTxt = '已经加载全部'
						_self.getLoad();
						return false;
					}
					var newsList = res[1].data.lists.data;
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
				if (this.addNum ==1) {
					uni.pageScrollTo({
						scrollTop:this.topdata,
						duration:300,
					})
					var _sefl = this;
					setTimeout(function(){
						_sefl.mark = true;
					},300);
					this.$refs.deli.childMethod(true);
				}
				this.addNum = 1;
			}
		},
		// 监听页面滚动距离
		onPageScroll(e) {
			this.rect = e.scrollTop
		}
	}

</script>

<style scoped>
.mark{
	position: fixed;
	height: 100%;
	overflow: hidden;
	width: 100%;
}
.container{
	width: 100%;
}
uni-view {
    width: 100%;
}

</style>
