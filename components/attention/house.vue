<template>
	<view>
		<view class="total">
			<text>我关注的房源</text>
		</view>
		<view class="house_list">
			<view class="houseItemView">
				<view class="houseItemImg">
					<image src="" mode=""></image>
				</view>
				<view class="houseItem">
					<view class="itemTitle">
						<text>通州区 新海南里187号楼-1至2 层1单元102（天鹅堡）</text>
					</view>
					<view class="itemInfo">
						<text>2室1厅 | 86.16㎡ | 南北 | 住宅</text>
					</view>
					<view class="itemPrice">
						<view>
							<text>起拍价</text>
							<text class="redPrice">6100万</text>
						</view>
						<view>
							<text>市场价</text>
							<text class="grayPrice">200万</text>
						</view>
					</view>
					<view class="createIime">
						<view class="createIimeIcon">
							<image src="../../static/img/home/item@2x.png" mode=""></image>
						</view>
						<view class="createIimeIconinfo">
							<text>
								开拍时间：1111
							</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="houseItemView">
				<view class="houseItemImg">
					<image src="" mode=""></image>
				</view>
				<view class="houseItem">
					<view class="itemTitle">
						<text>通州区 新海南里187号楼-1至2 层1单元102（天鹅堡）</text>
					</view>
					<view class="itemInfo">
						<text>2室1厅 | 86.16㎡ | 南北 | 住宅</text>
					</view>
					<view class="itemPrice">
						<view>
							<text>起拍价</text>
							<text class="redPrice">6100万</text>
						</view>
						<view>
							<text>市场价</text>
							<text class="grayPrice">200万</text>
						</view>
					</view>
					<view class="createIime">
						<view class="createIimeIcon">
							<image src="../../static/img/home/item@2x.png" mode=""></image>
						</view>
						<view class="createIimeIconinfo">
							<text>
								开拍时间：1111
							</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.total{
		background: #F3F0F1;
		width: 100%;
		height:31upx;
		ine-height: 31upx;
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#333;
		padding: 35upx 0 35upx 30upx;
	}
	.house_list{
		padding:30upx;
		background: #fff;
	}
	/* .house_list .houseItemView:first-child{
		padding-top: 30upx;
	} */
	.house_list .houseItemView:last-child{
		margin-bottom: 0;
	}
	.houseItemView {
		display: flex;
		flex-direction: row;
		margin-bottom: 69upx;
	}
	.houseItemImg {
		width: 240upx;
		height: 149upx;
		border-radius:10upx;
	}
	.houseItemImg image {
		width: 100%;
		height: 100%;
		background: #ccc;
		border-radius:10upx;
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
		margin: 10upx 12upx 7upx 9upx;
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
	}
</style>
