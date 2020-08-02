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
		
		
		<view class="xiaoquList" v-if="estateData.length > 0">
			<block v-for="(houseItem,key) in estateData" :key="key">
				<navigator :url="getEstateDetail(houseItem.id)" class="quickTabSwiperItem">
					<view class="item">
					<view class="img">
					  <image :src="getImg(houseItem.img)" mode=""></image>
					</view>
					<view class="titleinfoView">
						<view class="titleView">
							<text>{{houseItem.title}}</text>
						</view>
						<view class="titleInfo">
							<text>周边房源<text style="color: #DF2D23">{{houseItem.second_total}}</text>套</text>
						</view>
						<view class="price">
							<text style="color: #DF2D23">{{houseItem.price}}元/㎡</text>
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
				estateData:[]
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
				this.getStoreEstate();
			},
			getStoreHouse() {//浏览房源
				var _self = this;
				uni.getStorage({
					key:_self.fun.historyHouse,
					success:function(res){
						console.log(res,22222)
						_self.houseData = res.data;
					},
				})
			},
			getStoreEstate() {//浏览小区
				var _self = this;
				uni.getStorage({
					key:_self.fun.historyEstate,
					success:function(res){
						console.log(res,3333)
						_self.estateData = res.data;
					},
				})
			},
			getImg(imgSrc){
				return this.fun.getImgSrc(imgSrc);
			},
			getDetail(index){
				return `/pages/detail/index?id=${index}&like=1`;
			},
			getDatime(time){
				return this.fun.getDate(time);
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
