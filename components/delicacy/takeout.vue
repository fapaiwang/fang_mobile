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
									成交时间：{{housItem.kptime}}
								</text>
							</view>
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
				return '/pages/detail/index?id='+index;
			},
			getDate(dates) {
				return this.fun.getDate(dates);
			}
		}
	}
</script>

<style>
	@import url("./css/takeout.css");
</style>
