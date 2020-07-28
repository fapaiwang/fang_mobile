<template>
	<view class="recommendHouseView">
		<view class="recommendHouseTitleItem">
			房源情况
		</view>
		<scroll-view class="scv" scroll-x="true" scroll-with-animation="true" :scroll-left="scrollLeft">
			<view :class="index === TabCur ? selectClass + ' cur':''" v-for="(item,index) in tabList" :key="index" :id="index" @tap="tabChange(index,$event)">
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
						<!-- 瑕疵 -->
						<block v-for="(housItem, indexs) in defectData" :key="indexs" v-if="index==3  && bmrs">
						  <view style="width: 100%;display: block;font-size: 17px;">{{housItem}}</view>
						</block>
						<!-- 成交记录 -->
						<block v-for="(housItem, indexs) in recordingLogData" :key="indexs" v-if="index==4 && bmrs">
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
							<view @click="more">更多</view>
						</block>
					</swiper-item>
				 </block>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			selectClass: {
			    type: String,
			    default() {
			        return 'text-red';
			    }
			},
			textFlex: {
			    type: Boolean,
			    default() {
			        return false;
			    }
			},
			surroundingData: {//周边
				type: String,
				default() {
				    return '';
				}
			},
			trafficData: {//交通
				type: String,
				default() {
				    return '';
				}
			},
			announcementData: {//拍卖
				type: String,
				default() {
				    return '';
				}
			},
			defectData: {//欠费瑕疵
				type: Array,
				default() {
				    return [];
				}
			},
			recordingData: {//成交记录
				type: Array,
				default() {
				    return [];
				}
			},
			estateId:{
				type: Number,
				default() {
				    return 0;
				}
			},
			recordingLogData:{
				type: Array,
				default() {
				    return [];
				}
			}
		},
		data() {
			return {
				TabCur: 0,
				bmrs:false,
				tabList: [{ name: '周边情况' }, { name: '交通出行' },{ name: '拍卖公告' },{ name: '欠费瑕疵' },{ name: '成交记录' }],
			}
		},
		computed: {
		    scrollLeft() {
		        return (this.TabCur - 1) * 60;
		    }
		},
		created:function(){
			uni.getStorage({
				key:"user",
				success:function(res){
					this.bmrs = true;
				},
				fail:function(){
					this.bmrs = true;
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
				this.fun.navTo(`../../pages/detail/recording?id=${this.estateId}`)
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
	.recommendHouseTitleItem {
		margin-top: 43upx;
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
		font-size:40upx;
		font-weight:800;
		color:#333;
		margin-bottom: 30upx;
	}
	.houseItemView {
		display: flex;
		flex-direction: row;
	}
	.houseItemImg {
		width: 240upx;
		height: 149upx;
		border-radius:10upx;
	}
	.houseItemImg image {
		width: 100%;
		height: 100%;
	}
	.houseItem {
		flex: 1;
		margin-left: 25upx;
	}
	.itemTitle{
		font-size:30upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		overflow: hidden;
		text-overflow: ellipsis;
		display:-webkit-box; //作为弹性伸缩盒子模型显示。
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
	}
	.itemInfo {
		font-size: 24upx;
		color: #666;
	}
	.itemPrice {
		display: flex;
		flex-direction: row;
		color: #333333;
		justify-content: space-between;
		font-size: 20upx;
	}
	.redPrice {
		margin-left: 10upx;
		color: #E02E24;
		font-size: 26upx;
	}
	.grayPrice {
		margin-left: 10upx;
		color: #333;
		font-size: 26upx;
	}
	.createIime {
		margin-top: 20upx;
		height: 44upx;
		background:rgba(199,49,38, 0.15);
		/* opacity:0.06; */
		border-radius: 10upx;
		display: flex;
		flex-direction: row;
		text-align: center;
	},
	.createIimeIconinfo {
		font-size: 26upx;
		color: #E02E24;
		line-height: 44upx;
	},
	
	.createIimeIcon image {
		width: 24upx;
		height: 24upx;
		margin-left: 12upx;
		margin-right: 7upx;
	}
	
	.scv{
		flex-wrap: nowrap;
		white-space: nowrap;
	}
	.scv view{
		display: inline-block;
		height:31upx;
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:500;
		line-height:60upx;
		margin-left: 49upx;
		color: #999;
	}
	.scv view:first-child{
		margin-left: 30upx !important;
	}
	.scv_line{
		border:4upx solid #fff;
		display: flex;
		margin: 0 auto;
		width:47upx;
	}
	.text-red{
		color: #000 !important;
	}
	.text-red text{
		background:rgba(224,46,36,1);
		border:4upx solid rgba(224,46,36,1);
	}
	.quickTabSwiper{
		padding: 0 32upx;
	}
	.quickTabSwiperItem{
		overflow-y: auto;
	}
	.quickTabSwiperItem text{
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#333;
		line-height:44upx;
	}
</style>
