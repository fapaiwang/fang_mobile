<template>
	<view class="recommendHouseView" v-if="">
		<view class="recommendHouseTitleItem">
			房源情况
		</view>
		<scroll-view class="scv" scroll-x="true" scroll-with-animation="true" :scroll-left="scrollLeft">
			<view :class="index === TabCur ? 'text-red' : ' cur' " v-for="(item,index) in tabList" :key="index" :id="index" @tap="tabChange(index,$event)">
				{{item.name}}
				<text class="scv_line"></text>
			</view>
		</scroll-view>
		<view class="selectHouse">
			<swiper class="quickTabSwiper" :current="TabCur" duration="300" @change="swiperChange">
				<block v-for="(item, index) in tabList" :key="index">
					<swiper-item class="quickTabSwiperItem">
						<block v-for="(housItem, indexs) in houseData(TabCur)" :key="indexs" v-if="index<3">
						  <text class="quickTabItem">{{housItem}}</text>
						</block>
						<view @click="moreLock" class="more IndexMore" v-if="index==2">点击查看更多</view>
						<!-- 瑕疵 -->
						<block v-for="(housItem, indexs) in defectData" :key="indexs" v-if="index==3  && userRule==4">
						  <view style="width: 100%;display: block;font-size: 17px;">{{housItem}}</view>
						</block>
						<!-- 成交记录 -->
						<block v-for="(housItem, indexs) in recordingLogData" :key="indexs" v-if="index==4 && userRule==4">
							<view style="width: 100%;display: block;font-size: 16px;display: flex;justify-content: space-between;flex-direction: row;margin-bottom: 10px;">
								<text>{{housItem.tit}}</text>
							</view>
							<view style="width: 100%;display: block;font-size: 16px;display: flex;justify-content: space-between;flex-direction: row;margin-bottom: 10px;">
								<text>{{housItem.time}}</text>
							</view>
							<view style="width: 100%;display: block;font-size: 16px;display: flex;justify-content: space-between;flex-direction: row;margin-bottom: 10px;border-bottom: 1px solid #e3e3e3;padding-bottom: 10px;">
								<text>{{housItem.price}}</text>
							</view>
						</block>
						<block v-for="(housItem, indexs) in recordingData" :key="indexs" v-if="index==4 && indexs<1 && bmrs">
							<view style="width: 100%;display: block;font-size: 16px;display: flex;justify-content: space-between;flex-direction: row;margin-bottom: 10px;">
								<text style="width: 33%;">{{housItem.complate_time}}</text>
								<text style="width: 33%;">{{housItem.title}}</text>
								<text style="width: 33%;">{{housItem.chaoxiang}}</text>
							</view>
							<view style="width: 100%;display: block;font-size: 16px;display: flex;justify-content: space-between;flex-direction: row;margin-bottom: 10px;border-bottom: 1px solid #e3e3e3;padding-bottom: 10px;">
								<text style="width: 33%;">{{housItem.acreage}}平米</text> 
								<text style="width: 33%;">成交价:{{housItem.price}}</text>
								<text style="width: 33%;">{{housItem.cjprice}}元/㎡</text>
							</view>
							<view @click="more" class="more">点击查看更多</view>
						</block>
					</swiper-item>
				 </block>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		//周边 交通 拍卖 欠费瑕疵 成交记录
		props:["surroundingData","trafficData","announcementData","defectData","recordingData","estateId","recordingLogData","detailId"],
		data() {
			return {
				TabCur: 0,
				bmrs:false,
				userRule: -1,
				tabList: [{ name: '周边情况' }, { name: '交通出行' },{ name: '拍卖公告' },{ name: '欠费瑕疵' },{ name: '成交记录' }],
			}
		},
		computed: {
		    scrollLeft() {
		        return (this.TabCur - 1) * 60;
		    }
		},
		created:function(){
			var _self = this;
			uni.getStorage({
				key:_self.fun.userInfo,
				success:function(res){
					_self.bmrs = true;
					_self.userRule = res.data.model;
				},
				fail:function(){
					_self.bmrs = true; //cheng jiao ji lv
					_self.userRule = -1;
				}
			})
		},
		methods: {
			swiperChange(e) {
				var index=e.target.current || e.detail.current;
				this.TabCur = index;
			},
			tabChange(index) {
			    this.TabCur = index;
			},
			more(){
				this.fun.navTo(`/pages/detail/recording?id=${this.estateId}`)
			},
			moreLock(){
				this.fun.navTo(`/pages/detail/single?id=${this.detailId}`)
			},
			houseData(tabIndex){
				switch(tabIndex){
					case 0:
					return this.surroundingData;
					case 1:
					return this.trafficData;
					case 2:
					return this.announcementData;
					// case 3:
					// return this.defectData;
					// case 4:
					// return this.recordingData;
				}
			},
		}
	}
</script>

<style scoped>
	@import url("./css/housingSituation.css");
	.more{
		width:100%;
		height:88upx;
		background:rgba(247,247,247,1);
		border-radius:10upx;
		text-align: center;
		line-height: 88upx;
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(222,55,49,1);
	}
	.IndexMore{
		margin-top: 10upx;
		margin-bottom: 20upx;
	}
</style>
