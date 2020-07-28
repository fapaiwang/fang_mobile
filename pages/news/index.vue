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
			<view :class="index === TabCur ? selectClass + ' cur':''" v-for="(item,index) in tabList" :key="index" :id="index" @tap="tabChange(index,$event)">
				{{item.name}}
			</view>
		</scroll-view>
		<view class="front_cove_nav_list">
			<view class="hot_ans" v-if="isShow">
				<text v-for="(hotItem,hotKey) in hotAns" :class="hotKey === hotBar ? selectBar + ' cur':''" :key="hotKey" :id="hotKey" @tap="hotChange(hotKey,$event)">
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
		props: {
			selectClass: {
			    type: String,
			    default() {
			        return 'text-red';
			    }
			},
			selectBar: {
			    type: String,
			    default() {
			        return 'hot-red';
			    }
			},
			textFlex: {
			    type: Boolean,
			    default() {
			        return false;
			    }
			}
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
				isShow: false
			}
		},
		onLoad:function(){
			_self = this;
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
			tabChange(index) {//tab切换
			    this.TabCur = index;
				this.isShow = index == 2 ? true : false;
				this.cate = index;
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
				uni.request({
					url: this.baseUrl+'/api/banner/index', 
					data:{"space_id":24},
					success: (res) => {
						this.bannerdata = res.data.data
					}
				})
			},
			getMenu(){//法拍导航栏
				uni.request({
					url: this.baseUrl+'/api/article/cate',
					success: (res) => {
						if (Number(res.code) !=0) {
							this.tabList = res.data.data
						}
					}
				})
			},
			getNews(){//初始化数据
				page = 1;
				uni.showNavigationBarLoading();
				var url = this.baseUrl+'/api/article/index?cate='+this.cate+'&page='+page;
				if (this.TabCur == 2 && this.hotVal !="") {
					url = url+'&hits='+this.hotVal;
				}
				if (this.TabCur == 2 && this.keyword != "") {
					url = url+"&keyword="+this.keyword
				}
				uni.request({
					url:url,
					success: (res) => {
						uni.hideNavigationBarLoading();				
						uni.stopPullDownRefresh();
						if (res.data.data.data.length ==0 && page==1) {
							_self.frontList = [];
							_self.loadingTxt = '已经加载全部'
							return false;
						}
						_self.loadingTxt = '加载更多'
						var newsList = res.data.data.data;
						_self.frontList = newsList;
						page++;
					}
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
				uni.request({
					url:url,
					success: (res) => {
						uni.hideNavigationBarLoading();
						if (res.data.data.data.length ==0 || res.data== null) {
							_self.loadingTxt = '已经加载全部'
							return false;
						}
						var newsList = res.data.data.data;
						_self.frontList = _self.frontList.concat(newsList);
						uni.stopPullDownRefresh();
						_self.loadingTxt = '加载更多'
						page++;
					}
				})
			},
			getImgSrc(imgSrc){//获取图片路径
				return this.baseUrl+imgSrc;
			},
			getTargetUrl(index){ //跳转页面
				uni.navigateTo({
					url:`../../pages/news/detail?id=${index}`
				})
			}
		}
	}
</script>

<style scoped>
	.front_cove_list {
		margin: 0 auto;
		padding: 0 30upx;
	},
	.recommendHouseTitleView {
		height: 117upx;
		display: flex;
		flex-direction: row;
		align-items: center;
	},
	.recommendHouseTitleItem {
		flex: 1;
	}
	.recommendHouseTitleItem text {
		font-size:40upx;
		font-family:PingFang SC;
		font-weight:800;
		color:rgba(51,51,51,1);
	}
	.front_cove_about{
		display: flex;
		flex-flow: row;
		justify-content: space-between;
		margin-top: 60upx;
		box-sizing: content-box;
	}
	.front_cove_about:first-child{
		margin-top: 30upx;
	}
	.front_cove_img {
		width:260upx;
		height:178upx;
		background:#F1F1F1;
		border-radius:10px;
	}
	.front_cove_img image {
		width:260upx;
		height:178upx;
	}
	.front_cove_info{
		flex: 1;
		margin-left: 30upx;
		min-width: 0;
	}
	.front_cove_tit {
		height:90upx;
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:#333;
		overflow: hidden;
		text-overflow: ellipsis;
		display:-webkit-box; //作为弹性伸缩盒子模型显示。
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
	}
	.front_cove_desc{
		width:100%;
		font-size:24upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#666;
		margin-top: 19upx;
		margin-bottom: 18upx;
		min-width: 0;
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		display:-webkit-box; //作为弹性伸缩盒子模型显示。
		-webkit-box-orient:vertical;
		-webkit-line-clamp:1;
	}
	.front_cove_time {
		width: 100%;
		font-size:20upx;
		font-family:PingFang SC;
		font-weight:400;
		color:#999;
	},
	.release_time{
		width: 50%;
		float: left;
	}
	.createIimeIcon,.createIimeIcon image {
		width: 24upx;
		height: 24upx;
		float: left;
	}
	.createIimeIconinfo{
		height:16upx;
		font-size:20upx;
		font-family:PingFang SC;
		font-weight:400;
		color:#999;
	}
	.loading{
		line-height: 2em;
		text-align: center;
		color: #888;
		font-size: 20upx;
		margin-top: 20upx;
	}
	.uni-padding-wrap{
		margin-top: 0 !important;
	}
	/* 切换 */
	.scv{
		flex-wrap: nowrap;
		white-space: nowrap;
		border-bottom: 1upx solid #EBEBEB;
	}
	.scv view{
		display: inline-block;
		padding: 0 43upx;
		height:60upx;
		font-size:30upx;
		font-family:PingFang SC;
		font-weight:800;
		color:#999;
		line-height:60upx;
		margin: 33upx 0 32upx;
	}
	.text-red{
	  color:#DF2D23 !important;
	  font-weight:800;
	  font-family:PingFang SC;
	}
	.hot_ans{
		display: flex;
		padding: 0 30upx;
		margin-top: 30upx;
	}
	.hot_ans text{
		color: #656565;
		border-radius:25px;
		font-size:24upx;
		font-family:PingFang SC;
		font-weight:500;
		background:rgba(241,241,241,1);
		line-height:60upx;
		width:140upx;
		text-align: center;
	}
	.hot-red{
		background:linear-gradient(90deg,rgba(245,111,111,1),rgba(221,83,73,1)) !important;
		color:#fff !important;
	}
	.hot_ans text:first-child{
		margin-right: 50upx;
	}
	.search{
		position: absolute;
		z-index: 1;
		top: 242upx;
		height:68upx;
		background:rgba(255,255,255,1);
		border-radius:5px;
		width: 80%;
		left: 10%;
	}
	.index-header {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items:center;	    
	},
	.iconfangdajing {
		width: 24upx;
		height: 24upx;
		margin: 18upx 27upx 0 15upx;
	}
	.input-wrap {
		display: flex;
		flex: 1;
		flex-direction: row;
		align-items:center;	    
	    height: 60upx;
		border: 1upx solid #EBEBEB;
	    background-color: #fff;
	    border-radius: 50upx;
		width: 75%;
		display: flex;
		border: none;
		float: left;
	},
	.input-wrap input{
		height: 60upx;
		font-size:24upx;
		line-height: 60upx;
		margin-top: 8upx;
		display: inline-block;
	}
	.user-wrap {
		display: flex;
		align-items:center;
		justify-content:flex-end;
		width:25%;
		height:68upx;
		background:rgba(199,49,38,1);
		line-height: 68upx;
		border-radius:5px;
		text-align: center;
		font-size:24px;
		font-family:PingFang SC;
		font-weight:400;
		color:#fff;
		justify-content: center;
		float: right;
		border: none;
	},
	
	 .user-wrap .userIconfont {
	    width: 44upx;
	    height: 44upx;
	},
	.input-wrap text{
		position: absolute;
		left: 40upx;
		top: -8upx;
		color: #000;
		font-size: 30upx;
	}
</style>
