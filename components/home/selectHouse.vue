<template>
	<view class="selectItem">
		<scroll-view class="scv" scroll-x="true" scroll-with-animation="true" :scroll-left="scrollLeft">
			<view :class="index === TabCur ? selectClass + ' cur':''" v-for="(item,index) in tabList" :key="index" :id="index" @tap="tabChange(index,$event)">
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
											<image class="quickTabImg" :src="getImg(housItem.setting.fileurl)" mode=""></image>
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
		props: {
			selectClass: {
			    type: String,
			    default() {
			        return 'text-red';
			    }
			},
		},
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
			getCombinedResources() {
				uni.request({
					url: this.baseUrl+"/api/second/characteristic_house", //为你选房
					success: (res) => {
						this.tabList = res.data.data
					}
				})
			},
			getImg(ImgSrc){
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
			getDetail(index,tit) {//详情页面
				return `/pages/detail/house?id=${index}&tit=${tit}`;
			},
		}
	}
</script>

<style scoped>
	.selectItem{
		padding:0 30upx;
		margin-top: 28upx;
		margin: 28upx 0 18upx 0;
	}
	.scv{
		flex-wrap: nowrap;
		white-space: nowrap;
	}
	.scv view{
		display: inline-block;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		color: #999;
		font-size:28upx;
		margin-right: 71upx;
	}
	.text-red{
	  color:#DF2D23 !important;
	  font-weight:800;
	  font-family:PingFang SC;
	  color: #fff !important;
	  background:linear-gradient(90deg,rgba(245,111,111,1),rgba(221,84,74,1));
	  border-radius:25upx;
	  padding: 0 10px;
	}
	
	.quickTabSwiper {
		height: 506upx;
	},
	.quickTabSwiperItem {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		align-items: center;
	},
	.quickTabItemView {
		margin-top: 20upx;
		width: 49%;
		height: 233upx;
	}
	.quickTabItem {
		width: 100%;
		height: 100%;
		display: inline-block;
	}
	.quickTabImgView{
		height:233upx;
		background:#EBEBEB;
		border-radius:10upx;
	}
	.quickTabImg{
		width: 100%;
		height: 100%;
		border-radius:10upx;
	}
	.tabItem{
		width: 25%;
		float: left;
		font-size: 28upx;
		text-align: center;
		margin-bottom: 30upx;
	}
</style>
