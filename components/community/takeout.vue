<template>
	<view>
		<view class="recommendHouseView">
			<block v-for="(housItem, indexs) in recommendHouseData" :key="indexs">
				<navigator :url="detail(housItem.id)" class="quickTabSwiperItem">
				<view class="houseItemView">
					<view class="houseItemImg">
						<image :src="getImgUrl(housItem.img)" mode=""></image>
					</view>
					<view class="houseItem">
						<view class="itemTitle">
							<text>{{housItem.title}}</text>
						</view>
						<view class="itemTitle">
							房源
							<text class="redPrice">{{housItem.second_total}}</text>
							套
						</view>
						<view class="itemTitle">
							<text class="redPrice">{{housItem.price}}元/㎡</text>
						</view>
					</view>
				</view>
				</navigator>
			</block>
		</view>
		<view class="loading">{{loadingTxt}}</view>
	</view>
</template>
<script>
	
	export default {
		props:[],
		data() {
			return {
				recommendHouseData:[],
				loadingTxt:""
			}
		},
		methods: {
			childMethod(val,tit){
				this.recommendHouseData = val;
				this.loadingTxt = tit;
			},
			getImgUrl(icon){
				return this.fun.getImgSrc(icon);
			},
			detail(index){
				return '/pages/community/community?id='+index;
			},
			getDate(dates) {
				return this.fun.getDate(dates);
			}
		}
	}
</script>

<style scoped>
	@import url("./css/takeout.css");
</style>
