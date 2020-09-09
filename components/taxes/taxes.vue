<template>
	<view>
		<view class="house_warp" v-if="tax">
			<view class="house_con" @click="showPic(1)">
				<view class="house_tit">
					<view class="house_small_tit">
						房屋类型
					</view>
					<text v-model="familVal">{{houseType}}</text>
				</view>
				<view class="house_symbol">></view>
			</view>
			<view class="house_con" @click="showPic(2)">
				<view class="house_tit">
					<view class="house_small_tit">
						住宅类型
					</view>
					<text v-model="flatVal">{{flatType}}</text>
				</view>
				<view class="house_symbol">></view>
			</view>
			<view class="house_con" @click="showPic(5)">
				<view class="house_tit">
					<view class="house_small_tit">
						买方家庭
					</view>
					<text v-model="buyVal">{{buyFamil}}</text>
				</view>
				<view class="house_symbol">></view>
			</view>
			<view class="house_con">
				<view class="house_tit">
					<view class="house_small_tit">
						房屋面积
					</view>
					<input type="text" class="input" v-model="houseArea"/>
				</view>
				<view class="house_symbol">平米</view>
			</view>
			<view class="house_con">
				<view class="house_tit">
					<view class="house_small_tit">
						房屋总价
					</view>
					<input type="text" class="input" v-model="housePirce"/>
				</view>
				<view class="house_symbol">万元</view>
			</view>
			<!-- 8 -->
			<view class="house_con" v-if="showOriginal">
				<view class="house_tit">
					<view class="house_small_tit">
						房屋原值
					</view>
					<input type="text" class="input" v-model="originalProce"/>
				</view>
				<view class="house_symbol">万元</view>
			</view>
			<view class="house_con" v-if="showBuy" @click="showPic(9)">
				<view class="house_tit">
					<view class="house_small_tit">
						原购买方式
					</view>
					<text v-model="buyV">{{buyType}}</text>
				</view>
				<view class="house_symbol">></view>
			</view>
			<view class="house_con" v-if="showArea" @click="showPic(10)">
				<view class="house_tit">
					<view class="house_small_tit">
						所在区域
					</view>
					<text v-model="areaVal">{{Area}}</text>
				</view>
				<view class="house_symbol">></view>
			</view>
			<view class="house_con" v-if="showTime" @click="showPic(11)">
				<view class="house_tit">
					<view class="house_small_tit">
						购买时间
					</view>
					<text v-model="timeVal">{{buyTime}}</text>
				</view>
				<view class="house_symbol">></view>
			</view>
			<view>
				<button class="sub_btn" @click="getPrice">开始计算</button>
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
					{{itemCon.name}}
					</view>
				</picker-view-column>
			</picker-view>
		</view>
	</view>
</template>
<!-- 税费计算 -->
<script>
	import secondhandtax from "@/components/common/js/secondhandtax_info.js";
	
	export default {
		props:["tax"],
		data() {
			return {
				isShow:false,
				pickerTit:"",
				currentNum:1,
				selectNum:0,
				houseData:[],
				houseType:"",//房屋类型
				flatType:"",//住宅类型
				flatVal:"",
				buyFamil:"",//买房家庭
				buyVal:"",
				houseArea:"",//房屋面积
				housePirce:"",//房屋总价
				originalProce:"",//房屋原值
				buyType:"",//购买方式
				buyV:"",
				Area:"",//所在区域
				areaVal:"",
				buyTime:"",//购买时间
				timeVal:"",
				showOriginal:false,
				showArea:false,
				showBuy:false,
				showTime:false,
				value:[0],
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`
			}
		},
		created:function(){
			this.houseType = secondhandtax[1].option[this.selectNum].name;
			this.familVal = secondhandtax[1].option[this.selectNum].value;
			this.flatType = secondhandtax[2].option[this.selectNum].name;
			this.flatVal = secondhandtax[2].option[this.selectNum].value;
			this.buyFamil = secondhandtax[5].option[this.selectNum].name;
			this.buyVal = secondhandtax[5].option[this.selectNum].value;
		},
		methods: {
			onClick(){
				this.isShow = false;
			},
			onSure(){
				if (this.currentNum ==1) {//房屋类型
					this.houseType = secondhandtax[this.currentNum].option[this.selectNum].name;
					this.familVal = secondhandtax[this.currentNum].option[this.selectNum].value;
					if (this.selectNum ==1) {
						if (!this.showTime) {
							this.showTime = true;
						}
					}
					if (this.selectNum ==3) {
						this.showBuy = true;
						this.showTime = true;
					}
					if (this.selectNum <1 || this.selectNum==2) {
						this.showBuy = false;
						this.showTime = false;
					}
				}
				if (this.currentNum ==5) {//买房家庭
					this.buyFamil = secondhandtax[this.currentNum].option[this.selectNum].name;
					this.buyVal = secondhandtax[this.currentNum].option[this.selectNum].value;
					if (this.selectNum ==1) {
						this.showOriginal = true;
					} else {
						this.showOriginal = false;
					}
				}
				if (this.currentNum ==2) {//住宅类型
					this.flatType = secondhandtax[this.currentNum].option[this.selectNum].name;
					this.flatVal = secondhandtax[this.currentNum].option[this.selectNum].value;
					if (this.selectNum <1) {
						this.showOriginal = false;
						this.showArea = false;
					}
				} 
				if (this.currentNum ==9) {//原购买方式
					this.buyType = secondhandtax[this.currentNum].option[this.selectNum].name;
					this.buyV = secondhandtax[this.currentNum].option[this.selectNum].value;
				}
				if (this.currentNum ==10) {//所在区域
					this.Area = secondhandtax[this.currentNum].option[this.selectNum].name;
					this.areaVal = secondhandtax[this.currentNum].option[this.selectNum].value;
				}
				if (this.currentNum ==11) {//购买时间
					this.buyTime = secondhandtax[this.currentNum].option[this.selectNum].name;
					this.timeVal = secondhandtax[this.currentNum].option[this.selectNum].value;
				}
				this.selectNum = 0;
				this.isShow = false;
			},
			showPic(tarBar){
				this.houseData = secondhandtax[tarBar].option
				this.isShow = true;
				this.currentNum = tarBar;
				if (this.currentNum ==2) {//住宅类型
					if (!this.showOriginal) {//房屋原值"
						this.showOriginal = true;
					}
					if (!this.showArea) {//所在区域
						this.showArea = true;
					}
					this.pickerTit = "住宅类型";
				}
				if (this.currentNum ==1) {//房屋类型
					this.pickerTit = "房屋类型";
				}
				if (this.currentNum ==5) {//房屋类型
					this.pickerTit = "买房家庭";
				}
				if (this.currentNum ==9) {//房屋类型
					this.pickerTit = "原购买方式";
				}
				if (this.currentNum ==10) {//房屋类型
					this.pickerTit = "所在区域";
				}
				if (this.currentNum ==11) {//购买时间
					this.pickerTit = "购买时间";
				}
			},
			onchange(e){
				this.selectNum = e.detail.value[0];
			},
			getPrice(){
				if (this.houseArea == "") {
					this.fun.showMsg("请填写房屋面积");
					return false;
				}
				if (this.housePirce == "") {
					this.fun.showMsg("请填写房屋总价");
					return false;
				}
				if (this.flatVal == 201 && this.originalProce == "") {
					this.fun.showMsg("请填写房屋房屋原值");
					return false;
				}
				// console.log("商品房",this.familVal)
				// console.log("住宅类型",this.flatVal)
				// console.log("买房家庭",this.buyVal)
				// console.log("房屋总价",this.housePirce)
				// console.log("房屋面积",this.houseArea)
				// console.log("房屋原值",this.originalProce)
				// console.log("购买时间",this.timeVal)
				// console.log("所在区域",this.areaVal)
				// console.log("原购买方式",this.buyV)
				
				//房屋总价 房源面积  已购房产数  房屋类型 原购买方式 房屋原值 住宅类型 购买时间  所在区域
				var _url= "../../pages/detail/taxes_res?p="+this.housePirce
				+"&a="+this.houseArea+"&by="+this.buyVal+"&fv="+this.familVal
				+"&v="+this.buyV+"&op="+this.originalProce+"&f="+this.flatVal
				+"&t="+this.timeVal+"&area="+this.areaVal
				this.fun.navTo(_url)
			}//
		},
	}
</script>

<style scoped>
	@import url("./css/taxes.css");
</style>
