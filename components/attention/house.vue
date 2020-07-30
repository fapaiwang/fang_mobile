<template>
	<view>
		<view class="total">
			<text>我关注的房源</text>
		</view>
		<view class="house_list">
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
							<text>2室1厅 | 86.16㎡ | 南北 | 住宅</text>
						</view>
						<view class="itemPrice">
							<view>
								<text>起拍价</text>
								<text class="redPrice">6100万</text>
							</view>
							<view>
								<text>市场价</text>
								<text class="grayPrice">200万</text>
							</view>
						</view>
						<view class="createIime">
							<view class="createIimeIcon">
								<image src="../../static/img/home/item@2x.png" mode=""></image>
							</view>
							<view class="createIimeIconinfo">
								<text>
									开拍时间：{{getDatime(houseItem.create_time)}}
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
			getImg(imgSrc){
				return this.fun.getImgSrc(imgSrc);
			},
			getDatime(time){
				return this.fun.getDate(time);
			},
			getDetail(index){
				return '/pages/detail/index?id='+index;
			}
		}
	}
</script>

<style scoped>
	@import url("./css/house.css");
</style>
