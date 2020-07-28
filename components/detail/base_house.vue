<template>
	<view class="base_house_con">
		<view class="house_tag">
			<block v-for="(tagName,tagKey) in detial.house_tag" :key="tagKey">
				<text v-if="tagName != '' ">{{tagName}}</text>
			</block>
		</view>
		<view class="house_tit">
			<text>{{houseTit}}</text>
		</view>
		<view class="price">
			<view class="start">
				<text>起拍价：</text>
				<text class="sTime">{{detial.qipai}}万</text>
			</view>
			<view class="market">
				<text>市场价：</text>
				<text class="sTime">{{detial.price}}万</text>
			</view>
		</view>
		<view class="countdown">
			<view class="start_time">
				开拍截止倒计时：<text class="sTime">{{countDownList}}</text>
			</view>
			<view class="people">
				<view class="join"><text class="sTime">{{bmrs ? detial.bmrs == "" ? 0 :detial.bmrs : '*'}}</text>人报名</view>
				<view><text class="sTime">{{detial.weiguan}}</text>人围观</view>
			</view>
		</view>
		<view class="house_base">
			<view class="house_base_top">
				<view>{{detial.toilet}}</view>
				<view>{{detial.orientations}}</view>
				<view>{{detial.acreage}}</view>
			</view>
			<view class="house_base_bottom">
				<view>{{detial.floor}}层/共{{detial.total_floor}}层</view>
				<view>{{houseType}}</view>
				<view>{{buildYear}}年</view>
			</view>
		</view>
		<view class="auction_info">
			<view class="auction_info_l">
				<view>拍卖形式：<text>{{detial.jieduan_name}}</text></view>
				<view class="bianhao">拍卖编号：<text>{{detial.bianhao}}</text></view>
				<view>小区名称：<text>{{communityName}}</text></view>
			</view>
			<view class="auction_info_r">
				<view>保证金：<text>{{detial.baozheng}}万</text></view>
				<view>拍卖阶段：<text>{{detial.jieduan_name}}</text></view>
			</view>
		</view>
		
		<view class="featuredtTitleView">
			<view class="titleText" @click="getOther(detial.id)">
				<view>其他：<text class="desc">产权号、土地证、欠费...</text></view>
			</view>
			<view class="tieleImg">
					>
			</view>
		</view>
		<view class="featuredtTitleView" @click="taxes(detial.id,detial.qipai)">
			<view class="titleText">
				<view>税费：<text class="desc">产权号、土地证、欠费......</text></view>
			</view>
			<view class="tieleImg">
				>
			</view>
		</view>
		<view class="featuredtTitleView">
			<view class="titleText">
				<view>开拍时间：<text class="sTime">{{detial.kptime}}</text></view>
			</view>
		</view>
	</view>
</template>

<script>
	var int;
	var TimeStrs;
	var TimeStr;
	var Deadline;
	var Deadlineb;
	export default {
		name: "baseHouse",
		props: ["detial","houseType","buildYear","houseTit","communityName","countDownList"],
		data() {
			return {
				bmrs:false
			};
		},
		created:function(){
			uni.getStorage({
				key:"user",
				success:function(res){
					this.bmrs = true;
				},
				fail:function(){
					this.bmrs = true;
				}
			})
		},
		methods:{
			getOther(id) {
				this.fun.navTo(`/pages/detail/other?id=${id}`);
			},
			taxes(id,price) {
				this.fun.navTo(`/pages/detail/taxes?id=${id}&qp=${price}`);
			},
		}
	}
</script>

<style scoped>
	.base_house_con{
		padding: 0 30upx;
		padding-top: 40upx;
	},
	.house_tag{
		height: 56upx;
	}
	.house_tag text{
		padding: 9upx 17upx 8upx 16upx;
		background:#F7D6D6;
		border-radius:5px;
		font-size:24upx;
		font-family:PingFang SC;
		font-weight:500;
		color: #CC0000;
		margin-right: 12upx;
	}
	.house_tag text:nth-child(2){
		background:#E1EEFF;
		color: #4297FF;
	}
	.house_tag text:nth-child(3){
		background: #FFEBDC;
		color: #FF8126;
	}
	.house_tit{
		width:100%;
		font-size:36upx;
		font-weight:800;
		color:#333;
		margin-top: 30upx;
	}
	.price{
		display: flex;
		flex-flow: row wrap;
		margin:30upx 0 29upx 0;
	}
	.start,.market{
		height:31upx;
		font-size:28upx;
		font-weight:500;
		color:#33
	}
	.market{
		margin-left: 49upx;
	}
	.countdown{
		width:100%;
		height:80upx;
		background:#F5F5F5;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
	}
	.start_time{
		font-size:28upx;
		font-weight:800;
		display:-moz-box;
		-moz-box-pack:center;
		-moz-box-align:center;
		display:-webkit-box;
		-webkit-box-pack:center;
		-webkit-box-align:center;
		display:box;
		box-pack:center;
		box-align:center;
		padding-left: 30upx;
	}
	.people{
		height:23upx;
		font-size:24upx;
		font-weight:800;
		color:#333;
		padding-right: 30upx;
	}
	.join{
		margin-top: 9upx;
	}
	.sTime{
		color:#CC0000;
	}
	.house_base{
		border-bottom: 1px solid #EBEBEB;
		border-top: 1px solid #EBEBEB;
		margin-top: 30upx;
	}
	.house_base_top,.house_base_bottom{
		display: flex;
		flex-flow: row wrap;
		align-items:center;
	}
	.house_base_top view,.house_base_bottom view{
		display: flex;
		width: 33%;
		text-align: center;
		flex-direction: column;
		justify-content: center;
		font-family:PingFang SC;
		line-height:60upx;
	}
	.house_base_top view,{
		color: #333;
		font-weight:bold;
		font-size:32upx;
	}
	.house_base_bottom view{
		color: #666;
		font-size:28upx;
		font-weight:500;
	}
	.auction_info{
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		margin-top: 49upx;
	}
	.auction_info_l{
		display: flex;
		flex-flow: column;
		width: 50%;
	}
	.auction_info_l view,.auction_info_r view{
		width: 100%;
		font-size:28upx;
		font-family:PingFang SC;
		/* font-weight:500; */
		color:#333;
		line-height:60upx;
	}
	.auction_info_r view{
		display: inline-block;
		float: left;
	}
	.auction_info_r {
	    width: 46%;
	}
	.featuredtTitleView {
		height: 60upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.titleText{
		font-size:28upx;
		color: #333333;
	},
	.tieleImgView {
		height: 60upx;
		width: 32upx;
	}
	.tieleImg{
		height: 60upx;
		width: 32upx;
		color: #999;
	}
	.desc{
		color: #6C8BC7;
	}
	.bianhao{
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.bianhao text{
		float: right;
		text-align: left;
		width: 59%;
		text-overflow: ellipsis;
		overflow: hidden;
	}
</style>