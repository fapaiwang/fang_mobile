<template>
	<view>
		<view class="house_warp" v-if="mort">
			<view class="house_con" @click="show(1)">
				<view class="house_tit">
					<view class="house_small_tit">
						贷款类型
					</view>
					<text v-model="businessVal">{{businessType}}</text>
				</view>
				<view class="taxes_symbol">></view>
			</view>
			<view class="house_con">
				<view class="house_tit">
					<view class="house_small_tit">起拍价</view>
					<input type="text" class="input" v-model="qipai"/>
				</view>
				<view class="taxes_symbol">万</view>
			</view>
			<view class="house_con" @click="show(2)">
				<view class="house_tit">
					<view class="house_small_tit">
						贷款比例
					</view>
					<text v-model="radioVal">{{radioType}}%</text>
				</view>
				<view class="taxes_symbol">></view>
			</view>
			<view class="house_con" @click="show(3)">
				<view class="house_tit">
					<view class="house_small_tit">
						商贷年限
					</view>
					<text v-model="yearVal">{{yearType}}年</text>
				</view>
				<view class="taxes_symbol" >></view>
			</view>
			<view class="house_con" @click="show(4)">
				<view class="house_tit">
					<view class="house_small_tit">商贷利率</view>
					<text v-model="businessRadioVal">{{businessRadio}}</text>
				</view>
				<view class="taxes_symbol">></view>
			</view>
			<view class="house_con" @click="show(5)">
				<view class="house_tit">
					<view class="house_small_tit">还款方式</view>
					<text v-model="wayVal">{{wayType}}</text>
				</view>
				<view class="taxes_symbol" >></view>
			</view>
			<view>
				<button class="sub_btn" @click="houseLoan">开始计算</button>
			</view>
		</view>
		<view class="taxeSel" v-if="isShow">
			<view class="taxeSel_tit">
				<text class="close" @click="onClick">取消</text>
				<text class="tit">{{pickerTit}}</text>
				<text class="sure" @click="onSure">确定</text>
			</view>
			<picker-view class="mpvue-picker-view" :indicator-style="indicatorStyle" :value="value" @change="onchange">
				<picker-view-column>
					<view class="item" v-for="(itemCon,itemKey) in houseData" :key="itemKey">
					{{getUnit(itemCon)}}
					</view>
				</picker-view-column>
			</picker-view>
		</view>
	</view>
</template>
<!-- 房贷计算 -->
<script>
	export default {
		props:["mort"],
		data() {
			return {
				isShow:false,
				pickerTit:"",
				businessType:"",
				businessVal:"",
				qipai:"0",
				radioType:"",
				radioVal:"",
				radioData:[],
				yearType:"",
				yearVal:"",
				yearData:[],
				businessRadioVal:"",
				businessRadio:"",
				wayVal:"",
				wayType:"",
				wayData:["等额本息","等额本金"],
				wayValData:["benxi","benjin"],
				currentNum:1,
				selectNum:0,
				value:[0],
				buinessData:["商业贷"],
				houseData:[],
				businessData:[],
				businessValData:[],
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`
			}
		},
		created:function(){
			this.getResult();
		},
		methods: {
			getResult(){
				this.getRates();
				this.getYear();
				this.getLilv();
				this.businessType = this.buinessData[this.selectNum];
				this.wayType = this.wayData[this.selectNum];
				this.wayVal = this.wayValData[this.selectNum];
			},
			onClick(){
				this.isShow = false;
			},
			getUnit(con){
				if(this.currentNum==2){
					return con+"%";
				}
				if(this.currentNum==3){
					return con+"年";
				}
				return con;
			},
			onSure(){//确定
				if (this.currentNum==1) {
					this.businessType = this.buinessData[this.selectNum];
					this.businessVal = this.buinessData[this.selectNum];
				}
				if (this.currentNum==2) {
					this.radioType = this.businessTypeData[this.selectNum];
					this.radioVal = this.businessTypeData[this.selectNum];
				}
				if (this.currentNum==3) {
					this.yearType = this.yearData[this.selectNum];
					this.yearVal = this.businessTypeData[this.selectNum];
				}
				if (this.currentNum==4) {
					this.businessRadio = this.businessData[this.selectNum];
					this.businessRadioVal = this.businessValData[this.selectNum];
				}
				if (this.currentNum==5) {
					this.wayType = this.wayData[this.selectNum];
					this.wayVal = this.wayValData[this.selectNum];
				}
				this.selectNum = 0;
				this.isShow = false;
			},
			show(index){
				this.currentNum = index;
				if (index ==1) {
					this.pickerTit = "贷款类型";
					this.houseData = this.buinessData;
				}
				if (index ==2) {
					this.pickerTit = "商贷比例";
					this.houseData = this.businessTypeData;
				}
				if (index ==3) {
					this.pickerTit = "商贷年限";
					this.houseData = this.yearData;
				}
				if (index ==4) {
					this.pickerTit = "商贷利率";
					this.houseData = this.businessData;
				}
				if (index ==5) {
					this.pickerTit = "还款方式";
					this.houseData = this.wayData;
				}
				this.isShow = true;
			},
			getBusinessData(){
				this.houseData = this.buinessData;
			},
			getRates(){
				this.fun.getReq(this.baseUrl+'/api/tools/house_loan_bili')
				.then((res)=>{
					this.radioType =res[1].data.data[this.selectNum];
					this.businessTypeData = res[1].data.data;
					this.radioVal = res[1].data.data[this.selectNum]
				})
			},
			getYear(){
				this.fun.getReq(this.baseUrl+'/api/tools/house_loan_years')
				.then((res)=>{
					this.yearData = res[1].data.data;
					this.yearType = res[1].data.data[this.selectNum];
					this.yearVal = res[1].data.data[this.selectNum];
				})
			},
			getLilv(){
				this.fun.getReq(this.baseUrl+'/api/tools/house_loan_lilv')
				.then((res)=>{
					res[1].data.data.dai_lilv.forEach(item=>{
						this.businessData.push(item.describe)
						this.businessValData.push(item.val)
					})
					this.businessRadio = this.businessData[this.selectNum];
					this.businessRadioVal = this.businessValData[this.selectNum];
				})
			},
			houseLoan(){
				if (this.qipai ==0) {
					this.fun.showMsg("请填写起拍价");
					return false;
				}
				var _url= "../../pages/detail/result?q="+this.qipai
				+"&b="+this.radioVal+"&n="+this.yearVal+"&l="+this.businessRadioVal+"&h="+this.wayVal
				this.fun.navTo(_url)
			},
			onchange(e){
				this.selectNum = e.detail.value[0];
			},
		}
	}
</script>

<style scoped>
	.house_warp{
		padding: 0 30upx;
	}
	.house_con{
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		line-height: 98upx;
		height: 98upx;
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:#333;
		border-bottom: 1px solid #EBEBEB;
	}
	.house_small_tit {
		width: 180upx;
		display: inline-block;
		float: left;
	}
	.house_tit{
		height: 98upx;
	}
	.house_tit text{
		line-height: 98upx;
		height: 98upx;
		font-size:28upx;
		font-family:PingFang SC;
		font-weight:500;
	}
	.house_symbol{
		font-size:28upx;
		font-family:PingFang SC;
		color:#999;
		text-align: right;
	}
	.house_symbol:hover{
		cursor: pointer;
	}
	uni-picker-view {
	  display: block;
	}
	uni-picker-view[hidden] {
	  display: none;
	}
	.taxeSel{
		position: absolute;
		bottom: 0;
		z-index: 1;
		width: 100%;
		background: #fff;
	}
	.mpvue-picker-view {
	    width: 100%;
	    height: 500upx;
	    margin-top:20upx;
		background: #fff;
	}
	
	.item {
	     line-height: 100upx;
	     text-align: center;
	}
	.taxeSel_tit {
		height:88upx;
		background:#F6F6F6;
		display: flex;
		justify-content: space-between;
		padding: 0 30upx;
	}
	.taxeSel_tit text{
		margin-top: 31upx;
		height:26upx;
		font-size:28upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#999;
		line-height: 26upx;
	}
	.sure{
		color: #E02E24 !important;
	}
	.tit{
		color: #333333 !important;
		line-height: 88upx !important;
		height: 88upx !important;
		margin: 0 !important;
	}
	.sub_btn{
		width: 90%;
		height:88upx;
		background:#E02E24;
		border-radius:10px;
		margin-top: 60upx;
		color: #fff;
		font-size:28upx;
		font-family:PingFang SC;
		font-weight:500;
		line-height: 88upx;
	}
	.input{
		float: left;
		height: 98upx;
		line-height: 98upx;
	}
</style>
