<template>
	<view>
		<view class="circle_warp">
			<view class="circle">
				<view><text style="color:#E02E24">{{qishui_price}}</text>元</view>
				<view>
					契税
				</view>
			</view>
		</view>
		<view class="desc_warp">
			<view class="desc">
				<text>首付：</text>{{shoufu}}元
			</view>
			<view class="desc">
				<text>契税：</text>{{qishui_price}}元
			</view>
			<view class="desc">
				<text>贷款金额：</text>{{dakuan_price}}元
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self;
	var canvaRing=null;
   
	export default {
		data() {
			return {
				qishui_price:0,
								shoufu:0,
								dakuan_price:0
			}
		},
		onLoad(option) {
			_self = this;
			this.getServerData(option.p,option.a,option.by,option.fv,option.v,option.op,option.f,option.t,option.area);
		},
		methods: {
			getServerData(listing,area,first_house,building_type,trans_type,trans_price,house_type,time,location){
				this.fun.getReq(this.baseUrl+'/api/secondhand_tax',{
					house_price_listing:listing,
					house_area:area,
					first_house:first_house,
					building_type:building_type,
					last_trans_type:trans_type,
					last_trans_price:trans_price,
					house_type:house_type,
					buy_time:time,
					location:location,
				}).then((res)=>{
					var _res = res[1].data.taxs.deed_tax;
					this.qishui_price = _res.value
						// this.shoufu = _res.shoufu;
						// this.dakuan_price =_res.dakuan_price;
				});
			}
		}
	}
</script>

<style>
.circle_warp{
		width: 100%;
		text-align: center;
		padding-top: 63upx;
		margin: 0 auto;
		height:480upx;
	}
	.circle{
		width:360upx;
		height:360upx;
		border:60upx solid rgba(77,166,255,1);
		border-radius:50%;
		margin: 0 auto;
	}
	.circle view:first-child{
		margin-top: 149upx;
		font-size:32upx;
		font-family:Arial;
		font-weight:bold;
	}
	.circle view:last-child{
		margin-top: 31upx;
		color: #999;
		font-size:24upx;
		font-family:PingFang SC;
		font-weight:500;
	}
.desc_warp{
	margin-top: 77upx;
}
.desc{
	width:100%;
	height:27upx;
	font-size:28upx;
	font-family:PingFang SC;
	font-weight:500;
	color:#333333;
	line-height:27upx;
	margin-bottom: 30upx;
	text-align: center;
}
.desc text{
	color: #999;
}
</style>