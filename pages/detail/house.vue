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
						<image :src="getImgUrl(housItem.img)" mode=""></image>
					</view>
					<view class="houseItem">
						<view class="itemTitle">
							<text>{{housItem.title}}</text>
						</view>
						<view class="itemInfo">
							<text>{{`${housItem.room}室${housItem.living_room}厅 | ${housItem.acreage}㎡ | ${housItem.orientations} | ${housItem.toilet}`}}</text>
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
			this.getRes(e.tit);
			this.getList(e.id);
			uni.setNavigationBarTitle({
				title:e.tit
			})
		},
		methods: {
			getRes(tit){
				this.fun.getReq(this.baseUrl+'/api/second/characteristic_house_info',{name:tit}).then((res)=>{
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
				if (ImgSrc == null || ImgSrc == "" ) {
					return "../../static/img/base/default.png";
				}
				if (ImgSrc.substr(0,4) == "http") {
					return ImgSrc;
				} else if (ImgSrc.substr(0,1) == "/") {
					return this.baseUrl+`${ImgSrc}`;
				} else {
					return this.baseUrl+`/${ImgSrc}`;
				}
			},
			detail(index){
				return '/pages/detail/index?id='+index;
			},
		}
	}
</script>

<style scoped>
	@import url("./css/house.css");
</style>