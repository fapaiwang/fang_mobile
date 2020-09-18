<template>
	<view class="recommendList">
		<view class="recommendHouseView">
			<block v-for="(housItem, indexs) in recommendHouseData" :key="indexs">
				<navigator :url="detail(housItem.id)" class="quickTabSwiperItem">
					<view class="houseItemView">
						<view class="houseItemImg">
							<view class="house_status">
								<text class="house_status_red" v-if="housItem.fcstatus == '169' ">{{housItem.fcstatus_name}}</text>
								<text class="house_status_blue" v-else-if="housItem.fcstatus == '170' ">{{housItem.fcstatus_name}}</text>
								<text class="house_status_ash" v-else>{{housItem.fcstatus_name}}</text>
							</view>
							<image :src="getImgUrl(housItem.img)" mode=""></image>
							<view class="tag">
								<text  v-if="housItem.house_type !=48 ">{{housItem.jieduan_name}}</text>
								<text v-if="housItem.is_free!='' " class="tag_label_2">自由购</text>
								<text v-if="housItem.house_type =='48'" class="tag_label_2">社会委托</text>
								<text v-if="characteristic(housItem.characteristic_name)"  class="tag_label_1">{{housItem.characteristic_name}}</text>
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
									<text v-if="housItem.fcstatus== 175 ">成交价</text>
									<text v-if="housItem.fcstatus!=175 ">起拍价</text>
									<text class="redPrice" v-if="housItem.fcstatus!=175 ">{{housItem.qipai}}万</text>
									<text class="redPrice" v-if="housItem.fcstatus== 175 ">{{housItem.cjprice}}万</text>
								</view>
								<view>
									<text>市场价</text>
									<text class="grayPrice">{{housItem.price}}万</text>
								</view>
							</view>
							<view class="createIime">
								<view class="createIimeIcon">
									<image src="../../static/img/home/item@2x.png" mode=""></image>
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
		</view>
		<view class="loading" v-if="isShow">{{recommendHouseData.length>0 ? loadingTxt : '暂无数据'}}</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				recommendHouseData: [],
				loadingTxt: "",
				isShow:true,
			}
		},
		mounted: function() {
			this.bus.$on("click", function(e) {})
		},
		onLoad:function(){
		},
		methods: {
			// moveHandle(){
			// 	return false;
			// },
			childMethod(val, tit) {
				this.recommendHouseData = val;
				this.loadingTxt = tit;
				this.isShow = true;
				var _sefl = this;
				if (tit == '加载更多' || tit=='已经加载全部' || tit == '加载中') {
					setTimeout(function(){
						_sefl.isShow = false;
					},500);
				}
			},
			characteristic(con){
				if (con == "" || con == undefined) {
					return false;
				} else {
					return true;
				}
			},
			getImgUrl(icon) {
				return this.fun.getImgSrc(icon);
			},
			detail(index) {
				return '/pages/detail/index?id=' + index;
			},
			getDate(dates) {
				return this.fun.getDate(dates);
			}
		}
	}
</script>

<style scoped>
	@import url("./css/list.css");
	@import url("@/components/common/css/base/item.css");
</style>
