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
	import downpayment from "@/components/common/js/downpayment_info.js";
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
@import url("./css/payment.css");
</style>
