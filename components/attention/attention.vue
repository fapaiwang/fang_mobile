<template>
	<view>
		<view class="total">
			<text>我关注的小区</text>
		</view>
		<view class="xiaoquList">
			<block v-for="(houseItem,key) in communityData" :key="key">
				<navigator :url="getDetail(houseItem.id)" class="quickTabSwiperItem">
					<view class="item">
					<view class="img">
					  <image :src="getImg(houseItem.img)" mode=""></image>
					</view>
					<view class="titleinfoView">
						<view class="titleView">
							<text>{{houseItem.title}}</text>
						</view>
						<view class="titleInfo">
							<text>周边房源<text style="color: #DF2D23">20</text>套</text>
						</view>
						<view class="price">
							<text style="color: #DF2D23">{{houseItem.average_price}}元/㎡</text>
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
		props:["communityData"],
		data() {
			return {
				
			};
		},
		methods:{
			getImg(imgSrc){
				return this.fun.getImgSrc(imgSrc);
			},
			getDatime(time){
				return this.fun.getDate(time);
			},
			getDetail(index){
				return '/pages/community/community?id='+index;
			}
		}
	}
</script>

<style scoped>
	@import url("./css/attention.css");
</style>
