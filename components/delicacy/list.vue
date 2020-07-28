<template>
	<view>
		<view class="recommendHouseView" :class="isShow ? focuscur : ''">
			<block v-for="(housItem, indexs) in recommendHouseData" :key="indexs">
				<navigator :url="detail(housItem.id)" class="quickTabSwiperItem">
					<view class="houseItemView">
					<view class="houseItemImg">
						<image :src="getImgUrl(housItem.img)" mode=""></image>
						<view class="tag">
							<text>自由购</text>
							<text>一拍</text>
						</view>
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
									开拍时间：{{housItem.kptime}}
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
		props:{
			focuscur:{
				type: String,
				default() {
				    return 'focusBan';
				}
			}
		},
		data() {
			return {
				recommendHouseData:[],
				loadingTxt:"",
				isShow:false,
			}
		},
		mounted:function(){
			this.bus.$on("click",function(e){
			})
		},
		methods: {
			moveHandle(){
				return false;
			},
			childMethod(val,tit,show){
				this.isShow = show;
				console.log(111,show);
				this.recommendHouseData = val;
				this.loadingTxt = tit;
			},
			getImgUrl(icon){
				return this.baseUrl+`/${icon}`;
			},
			detail(index){
				return '/pages/detail/index?id='+index;
			},
			getDate(dates) {
				if (dates) {
					var date = new Date(dates);
					var Y = date.getFullYear() + '-';
					var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
					var D = date.getDate() + ' ';
					var h = date.getHours() + ':';
					var m = date.getMinutes() + ':';
					var s = date.getSeconds();
					return Y+M+D+h+m+s
				} else {
					return "";
				}
			}
		}
	}
</script>

<style>
	.recommendHouseView {
		padding-top: 160upx;
	},
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
		margin-top: 26upx;
		background:rgba(199,49,38, 0.15);
		border-radius: 10upx;
		display: flex;
		flex-direction: row;
		text-align: center;
	},
	.createIimeIconinfo {
		font-size: 24upx;
		color: #E02E24;
		line-height: 44upx;
	},
	.createIimeIcon {
	},
	.createIimeIcon image {
		width: 24upx;
		height: 24upx;
		margin-left: 12upx;
		margin-right: 7upx;
	}
	.navigator-hover,.navigator-hover:hover{
		background: none;
		cursor: pointer;
	}
	.navigator-hover{
		opacity: unset;
	}
	.loading{
		line-height: 2em;
		text-align: center;
		color: #888;
		font-size: 20upx;
		margin-top: 20upx;
	}
	
	.tag{
		display: flex;
		flex-flow: row;
		justify-content: space-between;
		width: 100%;
		margin-top: 20upx;
	}
	.tag text{
		width:114upx;
		height:50upx;
		background:#F5F3EA;
		border-radius:5upx;
		font-size:24upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#C8A96A;
		line-height:50upx;
		text-align: center;
	}
	.tag text:last-child{
		background:#E4EFFD !important;
		color: #4297FF !important;
	}
</style>
