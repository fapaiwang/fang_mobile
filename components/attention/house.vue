<template>
	<view>
		<view class="total">
			<text>我关注的房源</text>
		</view>
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
							<text>{{`${houseItem.room}室${houseItem.living_room}厅 | ${houseItem.acreage}㎡ | ${houseItem.orientations_name} | ${houseItem.types_name}`}}</text>
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
		props:["houseData"],
		data() {
			return {
				
			}
		},
		methods: {
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
</style>
