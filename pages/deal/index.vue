<template>
	<view class="deal">
		<view class="header_img">
			<image src="../../static/img/deal/deal.png"></image>
		</view>
		<view class="con">
			<view class="con_header">
				<view class="house">
					<image></image>
				</view>
				<view class="deal_info">
					<text class="tit">张女士</text>
					<view class="yuanjiao">
						成交时间：<text class="chengjiaotime">2012</text>
					</view>
					<view class="loupan">
						购买楼盘：<text class="loupan_info">珠江骏景北区</text>
					</view>
					<view class="loupan">
						法拍经理：：<text class="loupan_info">111</text>
					</view>
					<view class="loupan">
						成交价：<text class="chengjiao">111</text>万
					</view>
					<view class="loupan">
						低于市场价：<text class="chengjiao">111</text>万
					</view>
				</view>
			</view>
			<view class="con_body">
				<text class="con_body_text" :class="isShow ? 'con_body_a' : 'con_body_h' ">
					客户张女士是通过朋友介绍了解的金铂顺昌房拍网，张女士的朋友通过房拍网成功拍下低于市场价115万的海淀区某房源，张女士听到后非常震惊并且兴奋，张女士想海淀区的房源都是抢手的，她的朋友不但拍到了而且还低于市场价100多万！真是赚到了！因为张女士正准备用手里的闲散资金进行购房当做投资，随后张女士通过朋友的引荐来到公司进行咨询，法拍冯经理进行了接待，并耐心听取了张女士的需求，并找了4套适合的房源推荐给张女士，张女士选择了其中两套准备尝试，结果首次就竞拍成功珠江骏景北区某房源，成交价835万，市场价1000万，低于市场价165万！张女士非常激动，第二天把感谢的锦旗送到了公司。责接待林先生的是法拍经理刘伟刚，刘经理的自信心、专业大方的态度、以
				</text>
				<view class="bottom" @click="show">
					<image :src="getImg()"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow:false,
				resData:[],
			}
		},
		onLoad:function(){
			this.getRes();
		},
		methods: {
			getRes(){
				this.fun.getReq(this.baseUrl+'/api/estate/transactionRecord')
				.then((res)=>{
					console.log(res[1]);
					this.bannerdata = res[1].data.data;
				})
				
			},
			show(){
				if (this.isShow) {
					this.isShow = false;
				} else {
					this.isShow = true;
				}
			},
			getImg(){
				return this.isShow ? '../../static/img/delicacy/top.png' : '../../static/img/deal/body_bottom.png';
			}
		}
	}
</script>

<style scoped>
	page{
		width:100%;
		height: 100%;
		background:linear-gradient(162deg,#FF895F,#FF715D);
		opacity:0.88;
	}
	.header_img{
		width: 100%;
		height: 296upx;
	}
	.header_img image{
		width: 750upx;
		height: 296upx;
		display: inline-block;
		margin: 0 auto;
	}
	.con{
		width:654upx;
		background:rgba(255,255,255,1);
		border-radius:10upx;
		margin: 0 auto;
		overflow: hidden;
	}
	.con_header{
		height:295upx;
		width: 100%;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		padding: 20upx 0 0 20upx;
		box-sizing: border-box;
		margin-bottom: 25upx;
	}
	.house{
		width:360upx;
		height:275upx;
		background:rgba(237,159,159,1);
	}
	.house image{
		width:360upx;
		height:275upx;
		display: inline-block;
	}
	.deal_info{
		float: right;
	}
	.tit{
		width:100%;
		text-align: left;
		height:31upx;
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		line-height:31upx;
		margin-top:6upx;
		display: inline-block;
		float: left;
		margin-bottom: 6upx;
	}
	.yuanjiao{
		width: 100%;
		height: 32upx;
		font-size:20upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
		line-height:32upx;
		background:#F7F7F7 url(../../static/img/deal/yuanjiao.png) no-repeat left top;
		background-size: 112upx 32upx;
		text-indent: 2upx;
		font-weight:500;
		color:rgba(255,255,255,1);
		margin-bottom: 13upx;
		display: inline-block;
	}
	.chengjiaotime{
		color:#333 !important;
	}
	.loupan{
		width:100%;
		height:23upx;
		font-size:24upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		line-height:23upx;
		margin-top: 19upx;
	}
	.loupan_info{
		color:rgba(153,153,153,1) !important
	}
	.chengjiao{
		color: #DF2D23 !important;
	}
	.con_body{
		float: left;
		width: 100%;
		padding: 20upx;
		box-sizing: border-box;
		border-top: 1upx solid #F1F1F1;
	}
	.con_body_text{
		width:100%;
		font-size:24upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#333;
		height: 90upx;
		overflow: hidden;
		line-height:40upx;	
		display: inline-block;
	}
	.con_body_h{
		height: 90upx;
	}
	.con_body_a{
		height: auto;
	}
	.bottom {
		display: flex;
		flex-flow: row;
		justify-content: center;
		margin-bottom: 33upx;
		margin-top: 33upx;
	}
	.bottom image{
		width: 32upx;
		height: 16upx;
	}
</style>
