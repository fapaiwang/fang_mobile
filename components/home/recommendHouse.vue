<template>
	<view class="recommendHouseView">
		<view class="recommendHouseTitleView">
			<view class="recommendHouseTitleItem">
				为您推荐
			</view>
			<scroll-view class="scv" scroll-x="true" scroll-with-animation="true">
				<view :class="index === TabCur ? 'text-red' : ''" v-for="(item,index) in tabList" :key="index" :id="index" @tap="tabChange(index,$event)">
					{{item.name}}
					<text class="scv_line"></text>
				</view>
			</scroll-view>
		</view>
		<view>
			<swiper :style="{height:listHeight+'px'}" :current="TabCur" duration="300" @change="swiperChange" class="sss">
				<block v-for="(item, index) in tabList" :key="index">
					  <swiper-item >
						  <block v-for="(housItem, indexs) in houseData(TabCur)" :key="indexs">
							<navigator :url="getDetail(housItem.id)" class="quickTabSwiperItem">
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
											<image src="../../static/img/home/item@2x.png" mode="heightFix"></image>
										</view>
										<view class="createIimeIconinfo">
											<text>
												开拍时间：{{housItem.kptime}}
											</text>
										</view>
									</view>
								</view>
							</view>
							</navigator>
						</block>
					   </swiper-item>
				  </block>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		props:['tabIndex','recommendHouseData','restrictHouseData'],
		data() {
			return {
				TabCur: 0,
				tabList: [{ name: '推荐房源' }, { name: '自由购' }],
				listHeight:690,
				recommend:this.recommendHouseData,
				restrict:this.restrictHouseData,
				currentNum:1,
				ScurrentNum:1
			}
		},
		methods: {
			tabChange(index) {
			    this.TabCur = index;
				this.$emit("update:tabIndex",index)
			},
			childMethod(val1,val2,h){
				this.listHeight = h;
				if ( this.TabCur == 0) {
					this.recommend = val1;
				} else {
					this.restrict = val2;
				}
			},
			houseData(num) {
				if (num == 0) {
					if (this.ScurrentNum ==1){
						this.listHeight = 115*this.recommendHouseData.length;
					}
					return this.currentNum ==1 ? this.recommendHouseData : this.recommend;
					this.currentNum = 2;
				} else {
					if (this.ScurrentNum ==1){
						this.listHeight = 115*this.restrictHouseData.length;
					}
					return this.ScurrentNum ==1 ? this.restrictHouseData : this.restrict;;
					this.ScurrentNum = 2;
				}
			},
			getDetail(index) {//跳转到小区详情页面
				return '/pages/detail/index?id='+index;
			},
			getImgUrl(icon){
				return this.baseUrl+`/${icon}`;
			},
			getDate(dates) {
				return this.fun.getDate(dates);
			},
			swiperChange(e) {
				var index=e.target.current || e.detail.current;
				this.TabCur = index;
			},
		}
	}
</script>

<style scoped>
	@import url("./css/recommendHouse.css");
</style>
