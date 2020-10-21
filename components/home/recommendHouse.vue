<template>
	<view class="recommendHouseView">
		<view class="recommendHouseTitleView">
			<view class="recommendHouseTitleItem">
				为您推荐
			</view>
			<scroll-view class="scv" scroll-x="true" scroll-with-animation="true">
				<view :class="index === TabCur ? 'text-red' : ''" v-for="(item,index) in tabList" :key="index" :id="index" @tap="tabChange(index,$event)">
					{{item.name}}
					<text class="scv_line"></text>
				</view>
			</scroll-view>
		</view>
		<view v-if="showOne">
			<block v-for="(housItem, indexs) in recommendHouseData" :key="indexs">
				<navigator :url="getDetail(housItem.id)" class="quickTabSwiperItem">
					<view class="houseItemView">
						<view class="houseItemImg">
							<view class="house_status">
								<text class="house_status_red" v-if="housItem.fcstatus && housItem.fcstatus === '169' ">{{housItem.fcstatus_name}}</text>
								<text class="house_status_blue" v-else-if="housItem.fcstatus && housItem.fcstatus === '170' ">{{housItem.fcstatus_name}}</text>
								<text class="house_status_ash" v-else>{{housItem.fcstatus_name}}</text>
							</view>
							<image :src="getImgUrl(housItem.img)" mode=""></image>
							<view class="tag">
								<text v-if="housItem.jieduan_name">{{housItem.jieduan_name}}</text>
								<text v-if="housItem.is_free!='' " class="tag_label_2">自由购</text>
								<text v-if="housItem.house_type =='48'" class="tag_label_2">社会委托</text>
								<text v-if="housItem.characteristic_name && housItem.characteristic_name!=''"  class="tag_label_1">{{housItem.characteristic_name}}</text>
							</view>
						</view>
						<view class="houseItem">
							<view class="itemTitle">
								<text>{{housItem.title}}</text>
							</view>
							<view class="itemInfo">
								<text>{{`${housItem.room}室${housItem.living_room}厅 | ${housItem.acreage}㎡ | ${housItem.orientations_name} | ${housItem.types_name}`}}</text>
							</view>
							<view class="itemPrice">
								<view>
									<text>起拍价</text>
									<text class="redPrice">{{housItem.qipai}}万</text>
								</view>
								<view>
									<text>市场价</text>
									<text class="grayPrice">{{housItem.price}}万</text>
								</view>
							</view>
							<view class="createIime">
								<view class="createIimeIcon">
									<image src="../../static/img/home/item@2x.png" mode="heightFix"></image>
								</view>
								<view class="createIimeIconinfo">
									开拍时间：{{housItem.kptime}}
								</view>
							</view>
						</view>
					</view>
				</navigator>
		  </block>
		</view>
		<view v-if="!showOne">
			<block v-for="(housItem, indexs) in restrictHouseData" :key="indexs">
				<navigator :url="getDetail(housItem.id)" class="quickTabSwiperItem">
					<view class="houseItemView">
						<view class="houseItemImg">
							<view class="house_status">
								<text class="house_status_red" v-if="housItem.fcstatus && housItem.fcstatus === '169' ">{{housItem.fcstatus_name}}</text>
								<text class="house_status_blue" v-else-if="housItem.fcstatus && housItem.fcstatus === '170' ">{{housItem.fcstatus_name}}</text>
								<text class="house_status_ash" v-else>{{housItem.fcstatus_name}}</text>
							</view>
							<image :src="getImgUrl(housItem.img)" mode=""></image>
							<view class="tag">
								<text v-if="housItem.jieduan_name">{{housItem.jieduan_name}}</text>
								<text v-if="housItem.is_free!='' " class="tag_label_2">自由购</text>
								<text v-if="housItem.house_type =='48'" class="tag_label_2">社会委托</text>
								<text v-if="housItem.characteristic_name && housItem.characteristic_name!=''"  class="tag_label_1">{{housItem.characteristic_name}}</text>
							</view>
						</view>
						<view class="houseItem">
							<view class="itemTitle">
								<text>{{housItem.title}}</text>
							</view>
							<view class="itemInfo">
								<text>{{`${housItem.room}室${housItem.living_room}厅 | ${housItem.acreage}㎡ | ${housItem.orientations_name} | ${housItem.types_name}`}}</text>
							</view>
							<view class="itemPrice">
								<view>
									<text>起拍价</text>
									<text class="redPrice">{{housItem.qipai}}万</text>
								</view>
								<view>
									<text>市场价</text>
									<text class="grayPrice">{{housItem.price}}万</text>
								</view>
							</view>
							<view class="createIime">
								<view class="createIimeIcon">
									<image src="../../static/img/home/item@2x.png" mode="heightFix"></image>
								</view>
								<view class="createIimeIconinfo">
									开拍时间：{{trimTime(housItem.kptime)}}
								</view>
							</view>
						</view>
					</view>
				</navigator>
		  </block>
		</view>
		<view class="moreView">
			<view @click="goMore" class="moreViewBtn">
				<text>更多推荐房源</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: 0,
				tabList: [{ name: '推荐房源' }, { name: '自由购' }],
				recommendHouseData:[],
				restrictHouseData:[],
				showOne:true,
			}
		},
		created:function(){
			this.getRecommendHouseData();
			this.getFreeHouseData();
		},
		methods: {
			trimTime(timeStr){
				return timeStr.trim();
			},
			goMore() {//加载更多
				if (this.TabCur == 0 ){
					this.fun.navTo("/pages/all/index?a=y1")
				} else {
					this.fun.navTo("/pages/all/index?a=m10")
				}
			},
			tabChange(index) {
				this.showOne = Number(index) == 1 ? false : true;
			    this.TabCur = index;
			},
			getDetail(index) {//跳转到小区详情页面
				return '/pages/detail/index?id='+index;
			},
			getImgUrl(icon){
				return this.baseUrl+`/${icon}`;
			},
			getDate(dates) {
				return this.fun.getDate(dates);
			},
			swiperChange(e) {
				var index=e.target.current || e.detail.current;
				this.TabCur = index;
			},
			getRecommendHouseData() { //推荐房源
				var _self = this;
				let _key = this.fun.listing+""+this.getCurrenTime();
				uni.getStorage({
					key:_key,
					success:function(res){
						if (res.data == "") {
							_self.getStoreRecommendHouse();
						} else {
							_self.recommendHouseData = res.data;
						}
					},
					fail:function(){
						_self.getStoreRecommendHouse();
					}
				})
			},
			getStoreRecommendHouse() {//推荐房源 api
				var _self = this;
				let lastKey = this.fun.freeBuy+""+this.getYesterdayTime();
				let _key = this.fun.listing+""+this.getCurrenTime();
				uni.clearStorage(lastKey);
				_self.fun.getReq(_self.baseUrl+'/api/second/houseList?a=y1&limit=15').then((res)=>{
					_self.recommendHouseData = res[1].data.data.lists.data;
					_self.setStore(_key,res[1].data.data.lists.data);
				});
			},
			getFreeHouseData() { //自由购
				var _self = this;
				let _key = this.fun.freeBuy+""+this.getCurrenTime();
				uni.getStorage({
					key:_key,
					success:function(res){
						if (res.data == "") {
							_self.getStoreFreeHouse()
						} else {
							_self.restrictHouseData = res.data;
						}
					},
					fail:function(){
						_self.getStoreFreeHouse()
					}
				})
			},
			getStoreFreeHouse() {//自由购 api请求
				let lastKey = this.fun.freeBuy+""+this.getYesterdayTime();
				let _key = this.fun.freeBuy+""+this.getCurrenTime();
				var _self = this;
				uni.clearStorage(lastKey);
				_self.fun.getReq(_self.baseUrl+'/api/second/houseList?a=m10&limit=15').then((res)=>{
					_self.restrictHouseData = res[1].data.data.lists.data;
					_self.setStore(_key,res[1].data.data.lists.data);
				});
			},
			//存缓存
			setStore(key,val){
				uni.setStorage({
					key:key,
					data:val
				})
			},
			getCurrenTime(){
				var date = new Date;
				var Y = date.getFullYear();
				var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
				var D = date.getDate();
				return Y+M+D;
			},
			getYesterdayTime() {
				let today = new Date();
				let now = new Date(today.getTime()-86400000);
				let year= now.getFullYear();
				let month= (now.getMonth() + 1).toString();
				let day = now .getDate().toString();
				if (month.length == 1) {
					month= '0' + month;
				}
				if (day .length == 1) {
					day = '0' + day ;
				}
				return year + month+day;
			}
		}
	}
</script>

<style scoped>
	@import url("./css/recommendHouse.css");
	@import url("@/components/common/css/base/item.css");
	.moreView {
		margin-bottom: 20upx;
	},
	.moreViewBtn {
		width: 100%;
		height: 88upx;
		background:rgba(241,241,241,1);
		border-radius:10px;
		display: flex;
		justify-content: center;
		align-items: center;
		color:rgba(102,102,102,1);
		font-size: 28upx;
	}
	.recommendHouseView{
		position: relative;
		height: 100%;
		overflow: hidden;
	}
</style>
