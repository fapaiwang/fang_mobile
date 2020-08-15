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
		<view>
			<swiper :style="{height:listHeight+'px'}" :current="TabCur" duration="300" @change="swiperChange" class="sss">
				<block v-for="(item, index) in tabList" :key="index">
					  <swiper-item >
						  <block v-for="(housItem, indexs) in houseData(TabCur)" :key="indexs">
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
										<text v-if="housItem.characteristic_name && housItem.characteristic_name!=''">{{housItem.characteristic_name}}</text>
										<text v-if="housItem.jieduan_name">{{housItem.jieduan_name}}</text>
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
											<text class="grayPrice">{{housItem.toilet}}万</text>
										</view>
									</view>
									<view class="createIime">
										<view class="createIimeIcon">
											<image src="../../static/img/home/item@2x.png" mode="heightFix"></image>
										</view>
										<view class="createIimeIconinfo">
											<text>
												开拍时间：{{housItem.kptime}}
											</text>
										</view>
									</view>
								</view>
							</view>
							</navigator>
						</block>
					   </swiper-item>
				  </block>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: 0,
				tabList: [{ name: '推荐房源' }, { name: '自由购' }],
				listHeight:1550,
				fHeight:1550,
				SistHeight:1550,
				recommendHouseData:[],
				restrictHouseData:[]
			}
		},
		created:function(){
			this.getRecommendHouseData();
			this.getFreeHouseData();
		},
		methods: {
			tabChange(index) {
			    this.TabCur = index;
			},
			houseData(num) {
				return num <1 ? this.recommendHouseData : this.restrictHouseData;
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
				let _key = this.fun.listing+""+this.fun.getCurrenTime;
				uni.getStorage({
					key:_key,
					success:function(res){
						_self.recommendHouseData = res.data;
						_self.fHeight = 115*res.data.length;
					},
					fail:function(){
						_self.fun.getReq(_self.baseUrl+'/api/second/houseList?a=y1&limit=15').then((res)=>{
							_self.recommendHouseData = res.data
							_self.fHeight = 115*res.data.length;
							_self.setStore(_key,res[1].data.data.lists.data);
						});
					}
				})
			},
			getFreeHouseData() { //自由购
				var _self = this;
				let _key = this.fun.freeBuy+""+this.fun.getCurrenTime;
				uni.getStorage({
					key:_key,
					success:function(res){
						_self.restrictHouseData = res.data
						_self.SistHeight = 115*res.data.length;
					},
					fail:function(){
						_self.fun.getReq(_self.baseUrl+'/api/second/houseList?a=m10&limit=15').then((res)=>{
							_self.restrictHouseData = res.data
							_self.SistHeight = 115*res.data.length;
							_self.setStore(_key,res[1].data.data.lists.data);
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
		}
	}
</script>

<style scoped>
	@import url("./css/recommendHouse.css");
	@import url("@/components/common/css/base/item.css");
</style>
