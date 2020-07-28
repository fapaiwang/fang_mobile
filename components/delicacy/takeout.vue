<template>
	<view>
		<view class="recommendHouseView">
			<block v-for="(housItem, indexs) in recommendHouseData" :key="indexs">
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
									开拍时间：{{housItem.kptime}}
								</text>
							</view>
						</view>
					</view>
				</view>
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
				return this.baseUrl+`/${icon}`;
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
		margin-top: 20upx;
		background:rgba(199,49,38, 0.15);
		/* opacity:0.06; */
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
</style>
