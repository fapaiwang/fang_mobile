<template>
	<view class="deal">
		<view class="header_img">
			<image src="../../static/img/deal/deal.png"></image>
		</view>
		<block v-for="(dealStory, indexs) in info" :key="indexs">
			<view class="con">
				<view class="con_header">
					<view class="house">
						<image :src="imgList(dealStory.img)" mode="scaleToFill" class="swiper-item"></image>
					</view>
					<view class="deal_info">
						<!-- <text class="tit">{{dealStory.customer_name}}</text> -->
						<view class="yuanjiao">
							<text>成交时间 </text><text class="chengjiaotime">{{dealStory.cjtime}}</text>
						</view>
						<view class="loupan">
							<text class="yuanjiao_label">购买楼盘 ：</text><text class="loupan_info">{{dealStory.community}}</text>
						</view>
						<view class="loupan">
							<text>法拍经理 ：</text><text class="loupan_info">{{dealStory.fapai_manager}}</text>
						</view>
						<view class="loupan">
							<text>成交价：</text><text class="chengjiao">{{dealStory.price}}</text>万
						</view>
						<view class="loupan">
							<text>低于市场价：</text><text class="chengjiao">{{dealStory.save_money}}</text>万
						</view>
					</view>
				</view>
				<view class="con_body">
					<text class="con_body_text" :class="isShow ? 'con_body_a' : 'con_body_h' ">
						{{dealStory.description}}
					</text>
					<view class="bottom" @click="show">
						<image :src="getImg()"></image>
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
				isShow: false,
				info: [],
			}
		},
		onLoad: function() {
			this.getRes();
		},
		methods: {
			getRes() {
				this.fun.getReq(this.baseUrl + '/api/article/dealStory')
					.then((res) => {
						this.info = res[1].data.data;
					})

			},
			show() {
				if (this.isShow) {
					this.isShow = false;
				} else {
					this.isShow = true;
				}
			},
			getImg() {
				return this.isShow ? '../../static/img/delicacy/top.png' : '../../static/img/deal/body_bottom.png';
			},
			imgList(url) {
				return this.fun.getImgSrc(url);
			}
		}
	}
</script>

<style scoped>
	page {
		width: 100%;
		height: 100%;
		background: linear-gradient(162deg, #FF895F, #FF715D);
		opacity: 0.88;
	}

	.header_img {
		width: 100%;
		height: 296upx;
	}

	.header_img image {
		width: 750upx;
		height: 296upx;
		display: inline-block;
		margin: 0 auto;
	}

	.con {
		width: 654upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 10upx;
		margin: 0 auto;
		overflow: hidden;
	}

	.con_header {
		height: 295upx;
		width: 100%;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		padding: 20upx 0 0 20upx;
		box-sizing: border-box;
		margin-bottom: 25upx;
	}

	.house {
		width: 360upx;
		height: 275upx;
		background: rgba(237, 159, 159, 1);
	}

	.house image {
		width: 360upx;
		height: 275upx;
		display: inline-block;
	}

	.deal_info {
		float: right;
		width: calc(100% - 360upx);
		padding-left: 20upx;
		box-sizing: border-box;
	}

	.tit {
		width: 100%;
		text-align: left;
		height: 31upx;
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		line-height: 31upx;
		margin-top: 6upx;
		display: inline-block;
		float: left;
		margin-bottom: 6upx;
	}

	.yuanjiao {
		width: 100%;
		height: 32upx;
		font-size: 20upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		line-height: 32upx;
		background: #F7F7F7 url(../../static/img/deal/yuanjiao.png) no-repeat left top;
		background-size: 112upx 32upx;
		text-indent: 2upx;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
		margin-bottom: 13upx;
		display: inline-block;
	}

	.chengjiaotime {
		font-size: 20upx;
		color: #333 !important;
		margin-left: 20%;
	}

	.loupan {
		width: 100%;
		height: 23upx;
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
		line-height: 23upx;
		margin-top: 19upx;
		overflow: hidden;
		display: flex;
	}

	.loupan_info {
		/* padding: 30upx; */
		color: rgba(153, 153, 153, 1) !important;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: calc(100% - 114upx);
	}

	.yuanjiao_label {
		width: 114upx;
	}

	.chengjiao {
		color: #DF2D23 !important;
	}

	.con_body {
		float: left;
		width: 100%;
		padding: 20upx;
		box-sizing: border-box;
		border-top: 1upx solid #F1F1F1;
	}

	.con_body_text {
		width: 100%;
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333;
		height: 90upx;
		overflow: hidden;
		line-height: 40upx;
		display: inline-block;
	}

	.con_body_h {
		height: 90upx;
	}

	.con_body_a {
		height: auto;
	}

	.bottom {
		display: flex;
		flex-flow: row;
		justify-content: center;
		margin-bottom: 33upx;
		margin-top: 33upx;
	}

	.bottom image {
		width: 32upx;
		height: 16upx;
	}
</style>
