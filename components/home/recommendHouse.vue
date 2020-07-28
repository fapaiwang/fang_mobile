<template>
	<view class="recommendHouseView">
		<view class="recommendHouseTitleView">
			<view class="recommendHouseTitleItem">
				为您推荐
			</view>
			<scroll-view class="scv" scroll-x="true" scroll-with-animation="true">
				<view :class="index === TabCur ? selectClass + ' cur':''" v-for="(item,index) in tabList" :key="index" :id="index" @tap="tabChange(index,$event)">
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
											<image src="../../static/img/home/item@2x.png" mode=""></image>
										</view>
										<view class="createIimeIconinfo">
											<text>
												开拍时间：{{getDate(housItem.create_time)}}
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
		props: {
			selectClass: {
			    type: String,
			    default() {
			        return 'text-red';
			    }
			},
			tabIndex:{
				type: Number,
				default() {
				    return 0;
				}
			},
			recommendHouseData:{
				type: Array,
				default() {
				    return [];
				}
			},
			restrictHouseData:{
				type: Array,
				default() {
				    return [];
				}
			}
		},
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
				if (dates) {
					var date = new Date(dates * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
					var Y = date.getFullYear() + '-';
					var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
					var D = date.getDate() + ' ';
					var h = date.getHours() + ':';
					var m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':';
					var s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
					return Y+M+D+h+m+s;
				} else {
					return "";
				}
			},
			swiperChange(e) {
				var index=e.target.current || e.detail.current;
				this.TabCur = index;
			},
		}
	}
</script>

<style scoped>
	.recommendHouseView {
		margin-top: 43upx;
		padding: 0 30upx;
	},
	.recommendHouseTitleView {
		height: 117upx;
		display: flex;
		flex-direction: row;
		align-items: center;
	},
	.recommendHouseTitleItem {
		flex: 1;
		font-size:40upx;
		font-family:PingFang SC;
		font-weight:800;
		color:rgba(51,51,51,1);
		margin-bottom: 25px;
	}
	.houseItemView {
		display: flex;
		height: 280upx;
		flex-direction: row;
	}
	.houseItemImg {
		width: 240upx;
		height: 149upx;
		border-radius:10upx;
	}
	.houseItemImg image {
		width: 100%;
		height: 100%;
	}
	.houseItem {
		flex: 1;
		margin-left: 25upx;
	}
	.itemTitle{
		height:80upx;
		font-size:30upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:#333;
		overflow: hidden;
		text-overflow: ellipsis;
		display:-webkit-box; //作为弹性伸缩盒子模型显示。
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
	}
	.itemInfo {
		font-size: 24upx;
		color: #666;
		margin: 3upx 0;
	}
	.itemPrice {
		display: flex;
		flex-direction: row;
		color: #333333;
		justify-content: space-between;
		font-size: 20upx;
	}
	.redPrice {
		margin-left: 10upx;
		color: #E02E24;
		font-size: 26upx;
	}
	.grayPrice {
		margin-left: 10upx;
		color: #333;
		font-size: 26upx;
	}
	.createIime {
		margin-top: 20upx;
		background:rgba(199,49,38, 0.15);
		/* opacity:0.06; */
		border-radius: 10upx;
		display: flex;
		flex-direction: row;
		text-align: center;
		height: 44upx;
	},
	.createIimeIcon{
		width: 24upx;
		height: 24upx;
		margin: 10upx 0 7upx 9upx;
	}
	.createIimeIcon image {
		width: 24upx;
		height: 24upx;
		float: left;
	}
	.createIimeIconinfo {
		font-size: 26upx;
		color: #E02E24;
		line-height: 44upx;
	},
	
	.navigator-hover,.navigator-hover:hover{
		background: none;
		cursor: pointer;
	}
	.navigator-hover{
		opacity: unset;
	}
	.scv{
		flex-wrap: nowrap;
		white-space: nowrap;
		margin: 0 auto;
		width: 50%;
		margin-bottom: 40upx;
	}
	.scv view{
		display: inline-block;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		color: #999;
		font-size:28upx;
		width: 50%;
		text-align: center;
	}
	.scv_line{
		border:4upx solid #fff;
		display: flex;
		margin: 0 auto;
		width:47upx;
	}
	.text-red{
		color: #000 !important;
	}
	.text-red text{
		background:rgba(224,46,36,1);
		border:4upx solid rgba(224,46,36,1);
	}
	.quickTabSwiperItem{
		display: inline-block;
	}
</style>
