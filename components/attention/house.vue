<template>
	<view>
		<view class="total">
			<text>我关注的房源</text>
		</view>
		<view class="house_list recommendHouseView" v-if="houseData.length > 0">
			<block v-for="(houseItem,key) in houseData" :key="key">
				<navigator :url="getDetail(houseItem.id)" class="quickTabSwiperItem">
					<view class="houseItemView">
						<view class="houseItemImg">
							<view class="house_status">
								<text class="house_status_red" v-if="houseItem.fcstatus === '169' ">{{houseItem.fcstatus_name}}</text>
								<text class="house_status_blue" v-else-if="houseItem.fcstatus === '170' ">{{houseItem.fcstatus_name}}</text>
								<text class="house_status_ash" v-else>{{houseItem.fcstatus_name}}</text>
							</view>
							<image :src="getImg(houseItem.img)" mode=""></image>
							<view class="tag">
								<text>{{houseItem.jieduan_name}}</text>
								<text v-if="houseItem.is_free!='' " class="tag_label_2">自由购</text>
								<text v-if="houseItem.house_type =='48'" class="tag_label_2">社会委托</text>
								<text v-if="showCon(houseItem.characteristic_name) == true" class="tag_label_1">{{houseItem.characteristic_name}}</text>
							</view>
						</view>
						<view class="houseItem">
							<view class="itemTitle">
								<text>{{houseItem.title}}</text>
							</view>
							<view class="itemInfo">
								<text>{{`${houseItem.room}室${houseItem.living_room}厅 | ${houseItem.acreage}㎡ | ${houseItem.orientations_name} | ${houseItem.types_name}`}}</text>
							</view>
							<view class="itemPrice">
								<view>
									<text v-if="houseItem.fcstatus== 175 ">成交价</text>
									<text v-if="houseItem.fcstatus!=175 ">起拍价</text>
									<text class="redPrice" v-if="houseItem.fcstatus!=175 ">{{houseItem.qipai}}万</text>
									<text class="redPrice" v-if="houseItem.fcstatus== 175 ">{{houseItem.cjprice}}万</text>
								</view>
								<view>
									<text>市场价</text>
									<text class="grayPrice">{{houseItem.price}}万</text>
								</view>
							</view>
							<view class="createIime">
								<view class="createIimeIcon">
									<image src="../../static/img/home/item@2x.png" mode=""></image>
								</view>
								<view class="createIimeIconinfo">
									<text>
										开拍时间：{{houseItem.kptime}}
									</text>
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
	export default {
		props:["houseData"],
		data() {
			return {
				
			}
		},
		methods: {
			showCon(housItem){
				if (housItem =='' || housItem==undefined) {
					return false;
				} else {
					return true;
				}
			},
			getImg(imgSrc){
				return this.fun.getImgSrc(imgSrc);
			},
			getDetail(index){
				return `/pages/detail/index?id=${index}&like=1`;
			}
		}
	}
</script>

<style scoped>
	@import url("./css/house.css");
	@import url("@/components/all/css/list.css");
	@import url("@/components/common/css/base/item.css");
</style>
