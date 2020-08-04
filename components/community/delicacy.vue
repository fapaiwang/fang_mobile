<template>
	<view>
		<view class="prefer-posi" :class="isShow ? 't0' : 't1'">
			<!-- 刷选区 -->
			<view class="delica-view">
				<view class="delica-list" @click="multiple()">
					区域
					<image :src="(drop ? '../../static/img/delicacy/top.png' :'../../static/img/delicacy/bottom.png')" class="withFix"></image>
				</view>
				<view class="delica-list" @click="getMoney()">
					均价
					<image :src="(avgPrice ? '../../static/img/delicacy/top.png' :'../../static/img/delicacy/bottom.png')" class="withFix"></image>
				</view>
				<view class="delica-list" @click="getHouse()">
					类型
					<image :src="(house ? '../../static/img/delicacy/top.png' :'../../static/img/delicacy/bottom.png')" class="withFix"></image>
				</view>
				<view class="delica-list" @click="getHot()">
					人气
					<image :src="(hot ? '../../static/img/delicacy/top.png' :'../../static/img/delicacy/bottom.png')" class="withFix"></image>
				</view>
			</view>
			<!--区域排序刷选-->
			<view class="sortlist srotlitetle avgList" v-if="drop">
				<view class="areaList">
					<view class="areaTit">
						<text>区域</text>
					</view>
					<view class="checkMoreRes area_list">
						<block v-for="(item,index) in arealist" :key="index">
							<text :class="{activeb:index == num}" @click="sortClick(index,item.id,1)">{{item.name}}</text>
						</block>
					</view>
				</view>
				<view class="sortlist-bottom">
					<view class="area_list_clear">
						<text @click="clearSearch(0)">清除条件</text>
					</view>
					<view class="area_list_btn">
						<text @click="soureSort(0)">确定</text>
					</view>
				</view>
			</view>
			<!--均价排序刷选   -->
			<view class="sortlist srotlitetle avgList" v-if="avgPrice">
				<view class="checkMoreRes">
					<block v-for="(priceItem,index) in pricelist" :key="index">
						<text :class="{'activeb': index == avgNum}" @tap="sortClick(index,priceItem.value,2)">{{priceItem.name}}</text>
					</block>
				</view>
				<view class="sortlist-bottom">
					<view class="area_list_clear">
						<text @click="clearSearch(1)">清除条件</text>
					</view>
					<view class="area_list_btn">
						<text @click="soureSort(1)">确定</text>
					</view>
				</view>
			</view>
			<!--类型排序刷选-->
			<view class="sortlist srotlitetle avgList" v-if="house">
				<view class="checkMoreRes">
					<block v-for="(item,index) in familyData" :key="index">
						<text :class="{'activeb': index == familyKey}" @tap="sortClick(index,item.id,3)">{{item.name}}</text>
					</block>
				</view>
				<view class="sortlist-bottom">
					<view class="area_list_clear">
						<text @click="clearSearch(2)">清除条件</text>
					</view>
					<view class="area_list_btn">
						<text @click="soureSort(2)">确定</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 透明背景 -->
		<view class="mark"  v-if="mark" @click="onMark"></view>
	</view>
</template>

<script>
	export default {
		props:["arealist","pricelist","familyData","houseProperty","areaData","levelData"],
		data() {
			return {
				drop: false,
				num:0,//区域
				synthesize: '',//区域
				avgNum:0,//价格
				avgMoney: '',
				familyKey:0,//类型
				familyVal:"",
				mark: false,
				avgPrice: false,
				house: false,
				isShow:false,
				param:"",
				sortVal:3,//排序
				hot:false,
			}
		},
		methods: {
			childMethod(option){
				var _seflDe = this;
				setTimeout(function(){
					_seflDe.isShow = option;
				},300);
			},
			multiple(){
				this.drop = true;
				this.avgPrice = false;
				this.house = false;
				this.backOne();
			},
			sortClick(index,name,posi){
				if (posi==1) {//区域
					this.num = index;
					// this.synthesize = "a"+this.arealist[name].id;
					this.synthesize = this.arealist[name].id;
				}
				if (posi==2) {//价格
					this.avgNum = index;
					// this.avgMoney = "t"+name[0]+"u"+name[1];
					this.avgMoney = index
				}
				if (posi==3) {//类型
					this.familyKey = index;
					// this.familyVal = 'i'+name;
					this.familyVal = name;
				}
			},
			getMoney(){
				this.avgPrice = true;
				this.drop = false;
				this.house = false;
				this.backOne();
			},
			getHouse(){
				this.house = true;
				this.avgPrice = false;
				this.drop = false;
				this.backOne();
			},
			getHot(){
				if (this.hot) {
					this.sortVal = 3;
					this.hot = false;
				} else {
					this.sortVal = 4;
					this.hot = true;
				}
				this.isShow = false;
				let _param = {
					area:this.synthesize,
					price:this.avgMoney,
					sort:this.sortVal
				}
				this.$emit("myEvent",_param);
				// this.$emit("myEvent",this.synthesize,this.avgMoney,this.familyVal,this.sortVal);
				this.hiddenAll();
			},
			backOne(){//透明背景
				setTimeout(()=>{
					this.mark = true;
				},310);
			},
			backClick(){//隐藏透明背景
				this.mark= false;
			},
			clearSearch(index){//清除
				if (index ==0) {
					this.num = 0;
					this.synthesize = "";
				}
				if (index ==1) {
					this.avgNum = 0;
					this.avgMoney = "";
				}
				if (index ==2) {
					this.familyKey = 0;
					this.familyVal = "";
				}
			},
			soureSort(index){
				this.isShow = false;
				let _param = {
					area:this.synthesize,
					price:this.avgMoney,
					sort:this.sortVal
				}
				this.$emit("myEvent",_param);
				// this.$emit("myEvent",this.synthesize,this.avgMoney,this.familyVal,this.sortVal);
				this.hiddenAll()
			},
			hiddenAll(){//隐藏全部
				this.avgPrice = false;
				this.drop = false;
				this.house = false;
				this.more =false;
				this.defaultMore = false;
				this.backClick();
			},
			onMark(){
				this.hiddenAll();
			}
		}
	}
</script>

<style scoped>
	@import url("./css/delicacy.css");
	.t0{
		top: 0;
	}
</style>
