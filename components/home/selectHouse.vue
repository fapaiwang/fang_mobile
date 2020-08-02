<template>
	<view class="selectItem">
		<scroll-view class="scv" scroll-x="true" scroll-with-animation="true" :scroll-left="scrollLeft">
			<view :class="index === TabCur ? 'text-red' : '' " v-for="(item,index) in tabList" :key="index" :id="index" @tap="tabChange(index,$event)">
				{{item.name}}
			</view>
		</scroll-view>
		<view class="quickTab">
			<view class="selectHouse">
				<swiper class="quickTabSwiper" :current="TabCur" duration="300">
					<block v-for="(item, index) in tabList" :key="index">
						  <swiper-item class="quickTabSwiperItem">
							  <block v-for="(housItem, indexs) in item.img" :key="indexs">
								   <navigator :url="getDetail(housItem.setting.linkurl,housItem.name)" class="quickTabItemView">
									  <div class="quickTabItem">
										  <image class="quickTabImg" :src="getImg(housItem.setting.fileurl)" mode="heightFix"></image>
									  </div>
								  </navigator>
							  </block>
						   </swiper-item>
					  </block>
				</swiper>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabList: [],
				TabCur:0
			}
		},
		created:function(){
			this.getCombinedResources();
		},
		computed: {
		    scrollLeft() {
		        return (this.TabCur - 1) * 60;
		    }
		},
		methods: {
			tabChange(index) {
				this.TabCur = index;
			},
			getCombinedResources() {//为你选房
				this.fun.getReq(this.baseUrl+"/api/second/characteristic_house").then((res)=>{
					this.tabList = res[1].data.data
				});
			},
			getImg(ImgSrc){
				return this.fun.getImgSrc(ImgSrc);
			},
			getDetail(index,tit) {//详情页面
				return `/pages/detail/house?id=${index}&tit=${tit}`;
			},
		}
	}
</script>

<style scoped>
	@import url("./css/selectHouse.css");
</style>
