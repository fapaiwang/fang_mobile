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
	@import url("./css/taxes_res.css");
</style>