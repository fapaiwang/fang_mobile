<template>
	<view>
		<scroll-view class="scv" scroll-x="true" scroll-with-animation="true" :scroll-left="scrollLeft">
			<view :class="index === TabCur ? selectClass + ' cur':''" v-for="(item,index) in tabList" :key="index" :id="index" @tap="tabChange(index,$event)">
				{{item.name}}
				<text class="scv_line"></text>
			</view>
		</scroll-view>
		<!-- 房贷计算 -->
		<Mortgage :mort="mort"></Mortgage>
		<!-- 税费计算 -->
		<Pickers :tax="tax"></Pickers>
		<!-- 首付成数测试 -->
		<Payment :isPay="isPay"></Payment>
		<!-- 资质查询 -->
		<Qualification :Search="Search"></Qualification>
	</view>
</template>

<script>
	import Mortgage from "@/components/taxes/mortgage.vue";//房贷计算
	import Pickers from "@/components/taxes/taxes.vue"; //税费计算
	import Payment from "@/components/taxes/payment.vue"; //首付成数测试
	import Qualification from "@/components/taxes/qualification.vue";
	
	export default {
		components: {Pickers,Payment,Qualification,Mortgage},
		props: {
			defClass: {
			    type: String,
			    default() {
			        return 'checkred';
			    }
			},
			selectClass: {
			    type: String,
			    default() {
			        return 'text-red';
			    }
			},
			selectBar: {
			    type: String,
			    default() {
			        return 'hot-red';
			    }
			},
			textFlex: {
			    type: Boolean,
			    default() {
			        return false;
			    }
			}
		},
		data() {
			return {
				tabList: [{name:"房贷计算"}, {name: "税费计算"}, {name: "首付成数测试"}, {name: "资质查询"}],
				TabCur:0,
				index: 0,
				mort:true,//房贷计算
				tax:false,//还款方式
				isPay:false,//首付成数
				Search:false,//资质查询
			}
		},
		computed: {
		    scrollLeft() {
		        return (this.TabCur - 1) * 60;
		    }
		},
		methods: {
			tabChange(index) {//tab切换
			    this.TabCur = index;
				if (index==0) {
					this.mort =true;//房贷计算
					this.tax =false;//还款方式
					this.isPay =false;//首付成
					this.Search =false;//资质查询
				}
				if (index==1) {
					this.mort =false;//房贷计算
					this.tax =true;//还款方式
					this.isPay =false;//首付成
					this.Search =false;//资质查询
				}
				if (index==2) {
					this.mort =false;//房贷计算
					this.tax =false;//还款方式
					this.isPay =true;//首付成
					this.Search =false;//资质查询
				}
				if (index==3) {
					this.mort =false;//房贷计算
					this.tax =false;//还款方式
					this.isPay =false;//首付成
					this.Search =true;//资质查询
				}
			},
		}
	}
</script>

<style scoped>
@import url("./css/taxes.css");
</style>
