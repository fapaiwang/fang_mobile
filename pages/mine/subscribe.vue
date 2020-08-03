<template>
	<view>
		<view class="house_list" v-if="houseData.length > 0">
			<block v-for="(houseItem,key) in houseData" :key="key">
				<navigator :url="getDetail(houseItem.id)" class="quickTabSwiperItem">
					<view class="houseItemView" >
					<view class="houseItemImg">
						<image :src="getImg(houseItem.img)" mode=""></image>
					</view>
					<view class="houseItem">
						<view class="itemTitle">
							<text>{{houseItem.title}}</text>
						</view>
						<view class="itemInfo">
							<text>{{`${houseItem.toilet} | ${houseItem.acreage}㎡ | ${houseItem.orientations}`}}</text>
						</view>
						<view class="itemPrice">
							<view>
								<text>起拍价</text>
								<text class="redPrice">{{houseItem.qipai}}万</text>
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
		data() {
			return {
				houseData:[],
			}
		},
		onShow:function(){
			this.getRes();
		},
		onLoad:function(){
			this.getRes();
		},
		methods: {
			getRes(){
				this.getStoreHouse();
			},
			getStoreHouse() {//预约房源
				// this.fun.getReq(this.baseUrl+'/api/banner/index?space_id=28')
				// .then((res)=>{
				// 	this.bannerdata = res[1].data.data
				// });
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
@import url("./css/history.css");
</style>
