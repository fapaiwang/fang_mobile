<template>
	<view>
		<view class="circle_warp">
			<view class="circle">
				<view><text style="color:#E02E24">{{totalPrice}}</text>元</view>
				<view>
					税费合计
				</view>
			</view>
		</view>
		<view class="desc_warp">
			<!-- <view class="desc">
				<text>首付：</text>{{shoufu}}元
			</view> -->
			<view class="desc">
				<view>
					<text class="tit">契税：</text>{{qishui_price}}元
				</view>
				<view>
					<text class="radio">税费占比：</text>{{qishui_radio}}
				</view>
			</view>
			<!-- <view class="desc">
				<text>贷款金额：</text>{{dakuan_price}}元
			</view> -->
			<view class="desc" v-if="isArea">
				<view>
					<text class="tit">综合地价款：</text>{{areaPrice}}元
				</view>
				<view>
					<text class="radio">税费占比：</text>{{area_radio}}
				</view>
			</view>
			<view class="desc" v-if="isLeft">
				<view>
					<text class="tit">土地出让金：</text>{{leftPrice}}元
				</view>
				<view>
					<text class="radio">税费占比：</text>{{left_radio}}
				</view>
			</view>
			<view class="desc" v-if="isAdd">
				<view>
					<text class="tit">增值税及附加：</text>{{addPrice}}元
				</view>
				<view>
					<text class="radio">税费占比：</text>{{add_radio}}
				</view>
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
				totalPrice:'',
				qishui_price:0,
				qishui_radio:"",//税费占比
				shoufu:0,
				dakuan_price:0,
				isArea:false,//显示综合地价款 一类经济
				areaPrice:"",//显示综合地价款
				isLeft:false,//土地出让金 二类经济
				leftPrice:"",
				left_radio:"",//土地出让金 占比
				isAdd:false,//增值税及附加 住宅类型 为非普通类型    
				addPrice:"",//增值税及附加
				add_radio:"",//增值税及附加 占比
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
					var _res = res[1].data;
					//商品房 普通住宅   税费合计 契税
					//一类经济  税费合计 契税 综合地价款
					if (building_type==101) {
						this.isArea = true;
						this.areaPrice = _res.taxs.gross_land_purchasing_fee.value
						this.area_radio = _res.taxs.gross_land_purchasing_fee.percent+'%'
					}
					//二类经济
					if (building_type==102) {
						this.isLeft = true;
						this.leftPrice = _res.taxs.land_transfer_fee.value
						this.left_radio = _res.taxs.land_transfer_fee.percent+'%'
					}
					//住宅类型
					if (house_type==201) {
						this.isAdd = true;
						this.addPrice = _res.taxs.value_added_tax.value
						this.add_radio = _res.taxs.value_added_tax.percent+'%'
					}
					this.qishui_price = _res.taxs.deed_tax.value;//契税
					this.qishui_radio = _res.taxs.deed_tax.percent+'%'//契税占比
					this.totalPrice = _res.total;//税费合计
				});
			}
		}
	}
</script>

<style>
	@import url("./css/taxes_res.css");
</style>