<template>
	<view>
		<view class="taxes_warp payment" v-if="Search">
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
							<text>{{resItem.name}}</text>{{resItem.val}}
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
	import qualification from "@/components/common/js/qualification_info.js";
	export default {
		props:["Search"],
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
			this.showCon = qualification[this.index].title;
			this.paymentData = qualification[this.index].option;
			this.brief = qualification[this.index].brief;
		},
		methods: {
			onPay(name,nextId){
				this.paymentData = qualification[nextId].option;
				this.tips = qualification[nextId].tips;
				this.showCon = qualification[nextId].title
				this.fllowData.push({key:this.brief,val:name});
				this.brief = qualification[nextId].brief
				if (!qualification[nextId].option) {
					this.showRes = true;
					this.showCon = "测试结果";
					this.isShow = true;
					this.getVal(nextId)
				}
			},
			getVal(nextId){//数字与文字描述分离
				var res = qualification[nextId].title.split(';');
				var _val = "";
				if (res.length > 1) {
					_val= res[1]
				}
				this.resData.push({name:res[0],val:_val})
			}
		}
	}
</script>

<style scoped>
@import url("./css/qulification.css");
</style>
