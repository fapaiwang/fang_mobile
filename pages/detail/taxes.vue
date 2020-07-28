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
	import Mortgage from "@/components/taxes/mortgage.vue";
	import Pickers from "@/components/taxes/taxes.vue";
	import Payment from "@/components/taxes/payment.vue";
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
.taxes_small_tit {
	width: 160upx;
	display: inline-block;
}
.taxes_tit text{
	height:27upx;
	font-size:28upx;
	font-family:PingFang SC;
	font-weight:500;
}
.taxes_symbol{
	font-size:28upx;
	font-family:PingFang SC;
	color:#999;
	text-align: right;
}
.taxes_symbol:hover{
	cursor: pointer;
}
.uni-title{
	padding: 30upx 30upx 0 30upx;
}
.uni_taxes_con{
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
	line-height: 98upx;
	font-size:32upx;
	font-family:PingFang SC;
	font-weight:bold;
	color:#333;
	border-bottom: 1px solid #EBEBEB;
	text-align: center;
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

/* 切换 */
	.scv{
		flex-wrap: nowrap;
		white-space: nowrap;
		border-bottom: 1upx solid #EBEBEB;
	}
	.scv view:first-child{
		margin-left: 49upx;
	}
	.scv view{
		display: inline-block;
		line-height: 60upx;
		margin-right: 81upx;
		padding: 0 10upx;
		text-align: center;
		color: #999;
		font-size: 30upx;
		font-size:32upx;
	}
	.text-red{
	  color:#DF2D23 !important;
	  font-weight:800;
	  font-family:PingFang SC;
	}
	
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
	.payment .taxes_tit{
		width: 100%;
		text-align: center;
	}
	.payment_list{
		width: 100%;
		text-align: center;
	}
	.payment_list text{
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
		margin-bottom: 50upx;
	}
	.scv_line{
		border:4upx solid #fff;
		display: flex;
		margin: 0 auto;
		width:47upx;
	}
	.text-red{
		color: #000 !important;
	}
	.text-red text{
		background:rgba(224,46,36,1);
		border:4upx solid rgba(224,46,36,1);
	}
</style>
