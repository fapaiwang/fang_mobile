<template>
	<view>
		<view class="taxes_warp payment" v-if="isPay">
			<view class="loc">
				当前城市：<text>北京</text>
			</view>
			<view class="taxes_con">
				<view class="taxes_tit">
					<text style="color:#E02E24">{{showCon}}</text>
				</view>
				<view class="payment_list">
					<view class="res" v-if="isShow">
						<view v-for="(resItem,resKey) in resData" :key="resKey">
							{{resItem.name}}<text>{{resItem.val}}</text>
						</view>
					</view>
					<text v-for="(item,key) in paymentData" :key="key" @click="onPay(item.name,item.next_id)" class="paymentItem">
						{{item.name}}
					</text>
				</view>
				<view class="payment_list" v-if="showRes">
					<view v-for="(fllowItem,fllowKey) in fllowData" :key="fllowKey" class="selectItem">
						<text class="fllowKey">{{fllowItem.key}}</text>:{{fllowItem.val}}
					</view>
				</view>
				<text class="tips">
					{{tips}}
				</text>
			</view>
		</view>
	</view>
</template>

<script>
	import downpayment from "../../common/js/downpayment_info.js";
	export default {
		props:["isPay"],
		data() {
			return {
				index:1,
				paymentData:[],
				showCon:"",
				tips:"",
				fllowData:[],//测试条件
				showRes:false,
				resData:[],
				isShow:false,
				brief:"",
			}
		},
		created:function(){
			this.showCon = downpayment[this.index].title;
			this.paymentData = downpayment[this.index].option;
			this.brief = downpayment[this.index].brief;
		},
		methods: {
			onPay(name,nextId){
				this.paymentData = downpayment[nextId].option;
				this.tips = downpayment[nextId].tips;
				this.showCon = downpayment[nextId].title
				this.fllowData.push({key:this.brief,val:name});
				this.brief = downpayment[nextId].brief
				if (downpayment[nextId].option.length < 1) {
					this.showRes = true;
					this.showCon = "测试结果";
					this.isShow = true;
					this.getVal(nextId)
				}
			},
			getVal(nextId){//数字与文字描述分离
				var that = this;
				var res = downpayment[nextId].title.split(';');
				res.forEach(function(value,key){
					var p = value.split('|')
					var _val = "";
					if (p.length > 1) {
						_val= p[1]
					}
					that.resData.push({name:p[0],val:_val})
				});
			}
		}
	}
</script>

<style scoped>
.payment .taxes_con{
	border-bottom: none;
	width:650upx;
	height:780upx;
	background:#FFF;
	box-shadow:0upx 0px 29upx 3upx rgba(224,46,36,0.04);
	border-radius:20upx;
	margin: 72upx auto 0;
	display: flex;
	justify-content: end;
	flex-flow: column;
}
.taxes_tit{
	width: 90%;
	text-align: center;
	border-bottom: 1px solid #EBEBEB;
	margin: 0 auto;
}
.taxes_tit text{
	height:27upx;
	font-size:28upx;
	font-family:PingFang SC;
	font-weight:500;
}
.taxes_warp{
	padding: 0 30upx;
}
.taxes_con{
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	line-height: 98upx;
	font-size:32upx;
	font-family:PingFang SC;
	font-weight:bold;
	color:#333;
	border-bottom: 1px solid #EBEBEB;
}

.payment_list{
	width: 100%;
	text-align: center;
}
.paymentItem{
	height: 78upx;
	background: #FFFFFF;
	border: 1px solid #EBEBEB;
	line-height: 78upx;
	border-radius: 19px;
	font-size: 32upx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #333333;
	display: inline-block;
	width: 80%;
	margin-top: 50upx;
}
.tips{
	padding: 0 40upx;
	font-size: 24upx;
	color: #b0b3b4;
	line-height:52upx;
}
.selectItem{
	height:23upx;
	font-size:24upx;
	font-family:PingFang SC;
	font-weight:500;
	color:#333;
	line-height: 23upx;
	text-align: left;
	margin-bottom: 23upx;
	margin-left: 30upx;
}
.fllowKey{
	color:#666;
}
.loc{
	width:100%;
	height:31upx;
	font-size:32upx;
	font-family:PingFang SC;
	font-weight:bold;
	color:#333;
	line-height: 31upx;
	margin: 40upx 0 45upx 20upx;
}
.loc text{
	font-weight:normal;
}
.res{
	margin-top: 86upx;
	margin-bottom: 99upx;
	
}
.res view{
	height:31upx;
	font-size:32upx;
	font-family:PingFang SC;
	font-weight:800;
	color:#333;
	width: 100%;
	line-height: 31upx;
	text-align: center;
}
.res view:first-child{
	margin-bottom: 40px;
}
.res text{
	color: #E02E24 !important;
}
</style>
