<template>
	<view>
		<view class="prefer-posi">
			<!-- 刷选区 -->
			<view class="delica-view">
				<view class="delica-list" @click="multiple()">
					区域
					<image src="../../static/img/delicacy/bottom.png" class="withFix"></image>
				</view>
				<view class="delica-list" @click="getMoney()">
					价格
					<image src="../../static/img/delicacy/bottom.png" class="withFix"></image>
				</view>
				<view class="delica-list" @click="getHouse()">
					户型
					<image src="../../static/img/delicacy/bottom.png" class="withFix"></image>
				</view>
				<view class="delica-list" @click="getMore()">
					更多
					<image src="../../static/img/delicacy/bottom.png" class="withFix"></image>
				</view>
				<view class="delica-list" @click="getSortItem()">
					<image src="../../static/img/delicacy/sort.png" class="withFix sort"></image>
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
						<text @click="soureSort()">确定</text>
					</view>
				</view>
			</view>
			<!--均价排序刷选   -->
			<view class="sortlist srotlitetle avgList" v-if="avgPrice">
				<view class="checkMoreRes">
					<block v-for="(priceItem,index) in pricelist" :key="index">
						<text :class="{'activeb': index == avgNum}" @tap="sortClick(index,priceItem.name,2)">{{priceItem.name}}</text>
					</block>
				</view>
				<view class="sortlist-bottom">
					<view class="customize">
						<view class="customize_tit">自定义价格</view>
						<view>
							<input class="start" type="number" v-model="def_start"/>
						</view>
						<view class="customize_line">-</view>
						<view class="end">
							<input class="start" type="number" v-model="def_end"/>万
						</view>
					</view>
					<view class="sure">
						<text @click="soureSort()">确定</text>
					</view>
				</view>
			</view>
			<!--户型排序刷选-->
			<view class="sortlist srotlitetle avgList" v-if="house">
				<view class="checkMoreRes">
					<block v-for="(item,index) in familyData" :key="index">
						<text :class="{'activeb': fSelect.indexOf(index)!=-1}" @tap="sortHouse(index,item.name)">{{item.name}}</text>
					</block>
				</view>
				<view class="sortlist-bottom">
					<view class="area_list_clear">
						<text @click="clearSearch(2)">清除条件</text>
					</view>
					<view class="area_list_btn">
						<text @click="soureSort()">确定</text>
					</view>
				</view>
			</view>
			<!--更多排序刷选-->
			<view class="sortlist moreList moreSort" v-if="more">
				<view class="checkMoreRes area_list">
					<view>
						<view class="check_tit">类型</view>
						<view class="check_more areaCon">
							<block v-for="(itemHouse,houseIndex) in houseProperty" :key="houseIndex">
								<text :class="{'activeb': houseIndex == typeNum}" @tap="sortClick(houseIndex,itemHouse.id,3)">{{itemHouse.name}}</text>
							</block>
						</view>
					</view>
					<view>
						<view class="check_tit">面积</view>
						<view class="check_more areaCon">
							<block v-for="(itemArea,areaKey) in areaData" :key="areaKey">
								<text :class="{'activeb': areaKey == areaNum}" @tap="sortClick(areaKey,itemArea.value,4)">{{itemArea.name}}</text>
							</block>
						</view>
						<view class="customize_pm">
							<view class="customize_tit">自定义平米</view>
							<view>
								<input class="start" type="number" v-model="cust_begin"/>
							</view>
							<view class="customize_line">-</view>
							<view class="end">
								<input type="number" v-model="cust_end"/>平米
							</view>
						</view>
					</view>
					<view>
						<view class="check_tit">阶段</view>
						<view class="check_more areaCon">
							<block v-for="(itemLevel,LevelKey) in levelData" :key="LevelKey">
								<text :class="{'activeb': LSelect.indexOf(LevelKey)!=-1}" @tap="sortLevel(LevelKey,itemLevel.name)">{{itemLevel.name}}</text>
							</block>
						</view>
					</view>
				</view>
				<view class="sortlist-bottom last">
					<view class="area_list_clear">
						<text @click="clearSearch(3)">清除条件</text>
					</view>
					<view class="area_list_btn">
						<text @click="soureSort()">确定</text>
					</view>
				</view>
			</view>
			<!-- 默认排序 -->
			<view class="sortlist sortitem" v-if="defaultMore">
				<view :class="{'activeb': key == sortNum}" v-for="(item,key) in defaultData" :key="key" @click="onSort(key,item.value)">
					{{item.name}}
					<image mode="" :src="getImg(key,item.value)"></image>
				</view>
			</view>
		</view>
		<!-- 透明背景 -->
		<view class="mark" v-if="mark"></view>
	</view>
</template>

<script>
	export default {
		props:["arealist","pricelist","familyData","houseProperty","areaData","levelData","dateFor"],
		data() {
			return {
				drop: false,
				num:0,
				avgNum:0,
				keyPrice:0,
				def_start:"",//自定义价格 起始
				def_end:"",//自定义价格 结束
				mark: false,
				avgPrice: false,
				house: false,
				more: false,
				defaultMore:false,
				isShow:false,
				defaultData:[{name: "默认排序",value:""}, {name: "最新发布", value : "m7"}, {name: "房屋总价",value:"m1" }, {name: "房屋面积",value:"m5"}],
				defaultVal:"",
				sortNum:0,
				synthesize: '',//区域
				avgMoney: '',//价格
				houseTypeName: '',//类型
				rSelect:'',
				fSelect:[],//户型
				fSelectVal:"",
				LSelect:[],//阶段
				LSelectVal:"",
				areaNum:0,//面积
				areaVal:'',
				typeNum:0,
				typeVal:"",
				param:"",
				cust_begin:"",//自定义平米
				cust_end:"",
			}
		},
		mounted:function(){
			// this.bus.$on("click",function(e){
			// 	console.log(1111);
			// });
		},
		onNavigationBarButtonTap(e) {
			this.hiddenAll();
		},
		methods: {
			multiple(){
				this.drop = true;
				this.avgPrice = false;
				this.house = false;
				this.more =false;
				this.defaultMore = false;
				this.backOne();
			},
			onSort(index,val){
				this.sortNum = index;
				this.defaultVal = val;
				this.$emit("myEvent",this.synthesize+this.rSelect+this.fSelectVal+this.typeVal+this.areaVal+this.LSelectVal+val);
				this.hiddenAll();
			},
			sortClick(index,name,posi){
				if (posi==1) {//区域
					this.num = index;
					this.synthesize = "a"+this.arealist[name].id;
				}
				if (posi==2) {//价格
					this.avgNum = index;
					this.rSelect = name;
				}
				if (posi==3) {//更多 类型
					this.typeNum = index;
					this.typeVal = `f${name}`;
				}
				if (posi==4) {//更多 面积
					this.areaNum = index;
					this.areaVal = `d${index}`;////面积
				}
			},
			sortHouse(index,name){//户型
				var _self = this
				if (this.fSelect.indexOf(index) == -1) {
					if (index <1 ){
						_self.familyData.forEach(function(value,key){
							_self.fSelect.push(key);//选中添加到数组里
						})
					} else {
						this.fSelect.push(index);//选中添加到数组里
					}
				} else {
					if (index <1 ) {
						_self.fSelect = [];
					} else {
						_self.fSelect.splice(_self.fSelect.indexOf(index), 1); //取消
					}
				}
			},
			sortLevel(index,name){//更多 阶段
				if (this.LSelect.indexOf(index) == -1) {
					this.LSelect.push(index);//选中添加到数组里
				} else {
					this.LSelect.splice(this.fSelect.indexOf(index), 1); //取消
				}
			},
			getMoney(){
				this.avgPrice = true;
				this.drop = false;
				this.house = false;
				this.more =false;
				this.defaultMore = false;
				this.backOne();
			},
			getHouse(){
				this.house = true;
				this.more =false;
				this.avgPrice = false;
				this.drop = false;
				this.defaultMore = false;
				this.backOne();
			},
			getMore(){
				this.more = true;
				this.avgPrice = false;
				this.drop = false;
				this.house = false;
				this.defaultMore = false;
				this.backOne();
			},
			getSortItem(){
				this.defaultMore = true
				this.more = false;
				this.avgPrice = false;
				this.drop = false;
				this.house = false;
				this.backOne();
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
				if (index ==2) { //户型
					this.fSelect = [];
					this.fSelectVal = "";
				}
				if (index ==3) { //户型
					this.LSelectVal = '';
					this.LSelect = [];
					this.LSelectVal = '';
					this.LSelect = [];
					this.areaVal = "";
					this.areaNum =0;
					this.typeVal = "";
					this.typeNum = 0;
					this.cust_begin = "";
					this.cust_end = "";
				}
			},
			soureSort(){
				var _self = this;
				if (this.def_start !="" || this.def_end!="") {//价格
					//t最低价格 u最高价格
					if (this.def_start =="") {
						this.rSelect = "t0u"+this.def_end
					} else if (this.def_end =="") {
						this.rSelect = "t"+this.def_start+"u0";
					} else {
						this.rSelect = "t"+this.def_start+"u"+this.def_end;
					}
				} else{
					if (this.rSelect !="") {
						this.rSelect = "c"+this.avgNum;
					}
				}
				if (this.cust_begin != "" || this.cust_end != "" ) {//自定义平米
					if (this.cust_begin =="") {
						this.areaVal = "v0w"+this.cust_end
					} else if (this.cust_end =="") {
						this.areaVal = "v"+this.cust_begin+"w0";
					} else {
						this.areaVal = "v"+this.cust_begin+"w"+this.cust_end;
					}
				} 
			
				if (_self.fSelect.length >= 1) {//户型
					this.fSelectVal = "e"+_self.fSelect.join("e");
					console.log(this.fSelectVal);
				}
				if (this.LSelect.length >= 1) {//阶段
					this.LSelectVal = "g"+this.LSelect.join("g");
				}
				
				this.$emit("myEvent",this.synthesize+this.rSelect+this.fSelectVal+this.typeVal+this.areaVal+this.LSelectVal+this.defaultVal);
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
			getImg(index,val){
				if (index == this.sortNum && val !=0 ) {
					return '../../static/img/delicacy/top.png';
				} 
				return val == '' ? "" : '../../static/img/delicacy/jt_bottom.png'
			},
		}
	}
</script>

<style scoped>
	.prefer-posi{
		position: absolute;
		left: 0;
		right: 0;
		width: 100%;
		z-index: 99;
		background: #fff;
	}
	.delica-view{
		padding: 28upx 0;
		border-bottom: 1upx solid #EBEBEB;
		width: 92%;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
	}
	.withFix{
		width: 16upx;
		height: 16upx;
		margin-left: 8upx;
		display: inline-block;
	}
	.sort{
		width: 36upx;
		height: 36upx;
	}
	.delica-list{
		font-size:28upx;
		font-family:PingFang SC;
		font-weight:400;
		color:#333;
		line-height:60upx;
		width: 25%;
		display: inline-block;
		float: left;
	}
	.delica-list:first-child{
		width:20% !important;
	}
	.delica-list:nth-child(2){
		text-indent: 36upx;
	}
	.delica-list:nth-child(3){
		text-indent: 54upx;
		width: 25% !important;
	}
	.delica-list:nth-child(4){
		text-align: right;
		width: 30% !important;
	}
	.delica-list .sort{
		float: right;
		margin-top: 1px;
	}
	.delica-list:last-child{
		float: right;
		text-align: right;
		width:22% !important;
	}
	.sortlist{
		background: #fff;
	}
	.srotlitetle text{
		padding: 0 15upx;
		display: block;
		font-size: 30upx;
		height: 70upx;
		line-height: 70upx;
		border-top: 1upx solid #ededed;
		text-align: center;
	}
	.moreSort text{
		font-size: 30upx;
		height: 70upx;
		line-height: 70upx;
		border-top: 1upx solid #ededed;
		text-align: center;
	}
	.activeb{
		color: #C73126 !important;
	}
	.mark{
		background: rgba(0,0,0,0.5); 
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1;
	}
	
	/* 更多 */
	.check_more{
		display: flex;
		flex-flow:row wrap;
	}
	.checkMoreRes{
		width: 95%;
		height: 700upx;
		position: relative;
		overflow: hidden;
		overflow-y: scroll;
		margin: 0 auto;
	}
	.check_tit{
		height:50upx;
		font-size:28upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:#333;
		line-height:50upx;
		display: block;
		width: 100%;
		padding-top: 30upx;
		text-indent: 16upx;
	}
	.choice{
		height:60upx;
		line-height:60upx;
		background:#F1F1F1;
		border-radius:5upx;
		text-align: center;
		color: #333;
		font-size:24upx;
		font-family:PingFang SC;
		font-weight:500;
		margin-top: 15upx;
		display: block;
		width: 23%;
		margin-left: 5.2px;
	}
	.check_active{
		background: #C73126 !important;
		color: #FFF !important;
	}
	.sortlist-bottom{
		width:100%;
		height:96upx;
		background:#FFF;
		box-shadow:0px 5px 6px 0px #231815;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.sortlist-bottom view{
		flex-grow: 1;
		text-align: center;
	}
	.avgList text{
		border-top:none ;
	}
	.areaList{
		display: flex;
		flex-flow: row wrap;
		justify-content:space-between;
		background: #F7F7F7;
	}
	.areaList view{
		width: 50%;
		text-align: center;
	}
	.areaList view text {
		background: #fff;
	}
	.sortitem view{
		height:60upx;
		font-size:28upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#666;
		line-height:60upx;
		text-align: center;
		margin-top: 30upx;
	}
	.sortitem view image{
		width: 24upx;
		height: 24upx;
		margin-left: 14upx;
		margin-top: 16upx;
		display: inline-block;
	}
	.start{
		height:44upx;
		background:#F1F1F1;
		border-radius:5upx;
		line-height: 44upx;
		font-size:28upx;
		font-family:PingFang SC;
		font-weight:500;
		color: #333;
		display: inline-block;
		width: 80upx;
		margin-top: 8upx;
	}
	
	.end input{
		height:44upx;
		background:#F1F1F1;
		border-radius:5upx;
		line-height: 44upx;
		font-size:28upx;
		font-family:PingFang SC;
		font-weight:500;
		color: #333;
		display: inline-block;
		width: 80upx;
		float: left;
		margin-top: 8upx;
	}
	.customize{
		font-size:24upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:60upx;
		height: 60upx;
		display: flex;
		flex-flow: row wrap;
		justify-content:space-evenly;
		margin-right: 95upx;
		margin-left: 30upx;
	}
	.customize_pm{
		font-size:24upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:60upx;
		height: 60upx;
		display: flex;
		flex-flow: row wrap;
		justify-content:end;
		margin-left: 12upx;
		font-size: 24upx;
		margin-top: 12upx;
	}
	.customize_pm view:first-child{
		margin-right: 20upx;
	}
	.customize_pm input:first-child{
		margin-right: 10upx;
	}
	.customize_line{
		width:25upx;
		height:3upx;
		font-size:24upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:60upx;
	}
	.customize_tit{
		height: 60upx;
	}
	.sure{
		background:#C73126;
		color: #fff;
		height: 96upx;
	}
	.sure text{
		height: 96upx;
		line-height: 96upx;
	}
	.area_list{
		padding-bottom: 30upx;
	}
	.area_list_btn{
		justify-content: center;
	}
	.area_list_btn text{
		background:#C73126;
		color: #fff;
		border-radius:5upx;
		width:220upx;
		height:66upx;
		display: inline-block;
	}
	.area_list_clear {
		justify-content: center;
	}
	.area_list_clear text{
		width:220upx;
		height:66upx;
		background:#F1F1F1;
		border-radius:5upx;
		display: inline-block;
	}
	.areaCon text{
		height:60upx;
		line-height:60upx;
		background:#F1F1F1;
		border-radius:5upx;
		text-align: center;
		color: #333;
		font-size:24upx;
		font-family:PingFang SC;
		font-weight:500;
		margin-top: 15upx;
		display: block;
		width: 23%;
		margin-left: 5.2px;
	}
	.last{
		position: unset;
	}
</style>
