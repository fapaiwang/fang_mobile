<template>
	<view>
		<view class="banner">
			<image :src="imgSrc" mode="" class="swiper-item"></image>
		</view>
		<view class="desc_con">
			{{con}}
		</view>
		<view class="recommendHouseTitleItem">
			为您推荐
		</view>
		<view class="house_list">
			<block v-for="(housItem, indexs) in houseData" :key="indexs">
				<navigator :url="detail(housItem.id)" class="quickTabSwiperItem">
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
	</view>
</template>

<script>
	var _self;
	export default {
		data() {
			return {
				imgSrc:'',
				houseData:[],
				con:'',
			}
		},
		onLoad:function(e){
			_self = this;
			if (e.tit == undefined) {
				uni.setNavigationBarTitle({
					title:"房拍网"
				})
			} else {
				uni.setNavigationBarTitle({
					title:e.tit
				})
			}
			if (e.id == undefined || !e.id) {
				setTimeout(function(){
					uni.switchTab({
					    url: '/pages/index/index'
					});
				},500)
			} 
			this.getRes(e.tit);
			this.getList(e.id);
		},
		methods: {
			trimTime(timeStr){
				return timeStr.trim();
			},
			getRes(tit){
				this.fun.getReq(this.baseUrl+'/api/second/characteristic_house_info',{name:tit}).then((res)=>{
					console.log(res[1].data,222);
					if (res[1].data.data !=null) {
						_self.con = res[1].data.data.info;
						_self.imgSrc = this.getImgUrl(res[1].data.data.img);
					}
				})
			},
			getList(param){
				this.fun.getReq(this.baseUrl+'/api/second/houseList',{a:param}).then((res)=>{
					_self.houseData = res[1].data.data.lists.data;
				})
			},
			getImgUrl(ImgSrc){
				return this.fun.getImgSrc(ImgSrc);
			},
			detail(index){
				return '/pages/detail/index?id='+index;
			},
		}
	}
</script>

<style scoped>
	@import url("./css/house.css");
	@import url("@/components/common/css/base/item.css");
	.banner{
		width:750upx;
		height:350upx;
	}
	.swiper-item{
		width:750upx;
		height:350upx;
	}
</style>