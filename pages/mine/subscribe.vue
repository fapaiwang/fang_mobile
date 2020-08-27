<template>
	<view class="">
		<view class="recommendHouseView" v-if="houseData.length > 0">
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
	import Takeout from '@/components/all/list_data.vue';
	export default {
		components:{
			Takeout
		},
		data() {
			return {
				houseData:[],
				userId:-1,
			}
		},
		onShow:function(){
			this.getRes();
		},
		onLoad:function(){
			
			this.getRes();
		},
		methods: {
			showCon(housItem){
				if (housItem =='' || housItem==undefined) {
					return false;
				} else {
					return true;
				}
			},
			getUserInfo(){
				var _self = this;
				uni.getStorage({
					key:_self.fun.userInfo,
					success:function(res){
						_self.userId = res.data.id;
					},
					fail:function(){
						uni.navigateBack({
							delta:1
						})
					}
				})
			},
			getRes(){
				this.getUserInfo();
				this.getStoreHouse();
			},
			getStoreHouse() {//预约房源
				this.fun.getReq(this.baseUrl+'/api/user/subscribeHouse',{user_id:this.userId})
				.then((res)=>{
					this.houseData = res[1].data.data.lists.data;
				});
			},
			getImg(imgSrc){
				return this.fun.getImgSrc(imgSrc);
			},
			getDetail(index){
				return `/pages/detail/index?id=${index}&like=1`;
			},
			getEstateDetail(index){
				return `/pages/community/community?id=${index}&like=1`;
			}
		}
	}
</script>

<style>
	@import url("@/components/all/css/list.css");
	@import url("@/components/common/css/base/item.css");
</style>
