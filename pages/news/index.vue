<template>
	<view class="container">
		<banner :bannerdata="bannerdata">
		</banner>
		<view class="search" v-if="isShow">
			<view class="input-wrap">
				<image class="iconfangdajing" src='../../static/img/base/searchIcon@2x.png'></image>
				<input
					step="" 
					placeholder="输入关键词" 
					autocomplete="off" 
					type="search"
					v-model="keyword">
			</view>
			<view class="user-wrap" @click="goUserClick">
				  搜索
			</view>
		</view>
		<scroll-view class="scv" scroll-x="true" scroll-with-animation="true" :scroll-left="scrollLeft">
			<view :class="index === TabCur ? 'text-red' :''" v-for="(item,index) in tabList" :key="index" :id="index" @tap="tabChange(index,item.id,$event)">
				{{item.name}}
			</view>
		</scroll-view>
		<view class="front_cove_nav_list">
			<view class="hot_ans" v-if="isShow">
				<text v-for="(hotItem,hotKey) in hotAns" :class="hotKey === hotBar ? 'hot-red':''" :key="hotKey" :id="hotKey" @tap="hotChange(hotKey,$event)">
					{{hotItem.name}}
				</text>
			</view>
			<view class="front_cove_list">
				<block v-for="(items, indexs) in frontList" :key="indexs">
					<view class="front_cove_about" @click="getTargetUrl(items.id)">
						<view class="front_cove_img">
							<image :src="getImgSrc(items.img)"></image>
						</view>
						<view class="front_cove_info">
							<text class="front_cove_tit">{{items.title}}</text>
							<text class="front_cove_desc">{{items.description}}</text>
							<view class="front_cove_time">
								<view class="release_time">
									<view class="createIimeIcon">
										<image src="../../static/img/news/new_time.png"></image>
									</view>
									<view class="createIimeIconinfo">
										<text>
											{{items.create_time_date}}
										</text>
									</view>
								</view>
								<view class="look_num">
									<view class="createIimeIcon">
										<image src="../../static/img/news/new_look.png"></image>
									</view>
									<view class="createIimeIconinfo">
										<text>
											{{items.hits}}
										</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		<!-- <view class="loading">{{loadingTxt}}</view> -->
	</view>
</template>

<script>
	var _self, page = 1, timer = null;//timer延迟期
	import banner from '@/components/base/banner.vue'; // banner
	import navMenu from '@/components/news/navMenu.vue';

	export default {
		components:{
			navMenu,
			banner
		},
		data() {
			return {
				loadingTxt: '加载更多',
				bannerdata: [],
				tabList: [],
				frontList : [],
				TabCur: 0,
				cate:0 ,
				hotBar: 0,
				hotAns: [{name: '热门问题', val:"hot"}, {name: '最新问题',val:""}],
				hotVal:"",
				keyword:"",
				isShow: false,
				tabName:'',
			}
		},
		onLoad:function(option){
			_self = this;
			if (option.id !=null || option.id !=undefined) {
				_self.TabCur = option.id;
			}
			this.getHomeData();
		},
		onPullDownRefresh:function(){//上滑获取数据
			this.getNews();
		},
		onReachBottom:function(){//下滑获取数据
			this.getMoreNews();
			if (timer!=null){
				clearTimeout(timer);
			}
			timer = setTimeout(function(){
				_self.getMoreNews();
			},500);
		},
		computed: {
		    scrollLeft() {
		        return (this.TabCur - 1) * 60;
		    }
		},
		methods: {
			goUserClick(){
				if (this.keyword =="") {
					this.fun.showMsg("关键词不能为空");
					return false;
				}
				this.getNews();
			},
			tabChange(index,name) {//tab切换
			    this.TabCur = index;
				this.isShow = index == 2 ? true : false;
				this.cate = index;
				if (index <1) {
					this.tabName = 0;
				} else {
					this.tabName = name;
				}
				
				this.getNews()
			},
			hotChange(index) {
				this.hotBar = index;
				this.hotVal = this.hotAns[index].val;
				this.getNews()
			},
			getHomeData(){
				this.getMenu();
				this.getNews();
				this.getBannerData();
			},
			getBannerData() {
				this.fun.getReq(this.baseUrl+'/api/banner/index?space_id=24').then((res)=>{
					this.bannerdata = res[1].data.data
				})
			},
			getMenu(){//法拍导航栏
				this.fun.getReq(this.baseUrl+'/api/article/cate').then((res)=>{
					if (Number(res[1].code) !=0) {
						this.tabList = res[1].data.data
					}
				})
			},
			getNews(){//初始化数据
				page = 1;
				uni.showNavigationBarLoading();
				var url = this.baseUrl+'/api/article/index?cate='+this.tabName+'&page='+page;
				if (this.TabCur == 2 && this.hotVal !="") {
					url = url+'&hits='+this.hotVal;
				}
				if (this.TabCur == 2 && this.keyword != "") {
					url = url+"&keyword="+this.keyword
				}
				this.fun.getReq(url).then((res)=>{
					uni.hideNavigationBarLoading();
					uni.stopPullDownRefresh();
					if (res[1].data.data.data.length ==0 && page==1) {
						_self.frontList = [];
						_self.loadingTxt = '已经加载全部'
						return false;
					}
					_self.loadingTxt = '加载更多'
					var newsList = res[1].data.data.data;
					_self.frontList = newsList;
					page++;
				})
			},
			getMoreNews(){//加载更多
				if (_self.loadingTxt == '已经加载全部'){
					return false;
				}
				_self.loadingTxt = '加载中';
				uni.showNavigationBarLoading();
				var url = this.baseUrl+'/api/article/index?cate='+this.cate+'&page='+page;
				if (this.TabCur == 2 && this.hotVal !="") {
					url = url+'&hits='+this.hotVal;
				}
				if (this.TabCur == 2 && this.keyword != "") {
					url = url+"&keyword="+this.keyword
				}
				this.fun.getReq(url).then((res)=>{
					uni.hideNavigationBarLoading();
					if (res[1].data.data.data.length ==0 || res[1].data== null) {
						_self.loadingTxt = '已经加载全部'
						return false;
					}
					var newsList = res[1].data.data.data;
					_self.frontList = _self.frontList.concat(newsList);
					uni.stopPullDownRefresh();
					_self.loadingTxt = '加载更多'
					page++;
				});
			},
			getImgSrc(imgSrc){//获取图片路径
				return this.fun.getImgSrc(imgSrc);
			},
			getTargetUrl(index){ //跳转页面
				this.fun.navTo(`/pages/news/detail?id=${index}`);
			}
		}
	}
</script>

<style scoped>
	@import url("./css/index.css");
</style>
