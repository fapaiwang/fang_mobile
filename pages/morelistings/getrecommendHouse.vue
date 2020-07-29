<template>
	<view class="recommendHouseView">
		<block v-for="(items, indexs) in recommendHouseData" :key="indexs">
			<view class="houseItemView">
				<view class="houseItemImg">
					<image :src="getImgUrl(items.img)" mode=""></image>
				</view>
				<view class="houseItem">
					<view class="itemTitle">
						<text>{{items.title}}</text>
					</view>
					<view class="itemInfo">
						<text>{{`${items.room}室${items.living_room}厅 | ${items.acreage}㎡ | ${items.orientations} | ${items.toilet}`}}</text>
					</view>
					<view class="itemPrice">
						<view>
							<text>起拍价</text>
							<text class="redPrice">{{items.qipai}}万</text>
						</view>
						<view>
							<text>市场价</text>
							<text class="grayPrice">{{items.toilet}}万</text>
						</view>
					</view>
					<view class="createIime">
						<view class="createIimeIcon">
							<image src="../../static/img/home/item@2x.png" mode=""></image>
						</view>
						<view class="createIimeIconinfo">
							<text>
								开拍时间：{{getDate(items.create_time)}}
							</text>
						</view>
					</view>
				</view>
			</view>
		</block>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		props:[
			'recommendHouseData',
		],
		methods: {
			getImgUrl(icon){
				return this.fun.getImgSrc(icon);
			},
			getDate(dates) {
				return this.fun.getDate(dates);
			}
		}
	}
</script>

<style>
	@import url("./css/getrecommendHouse.css");
</style>
