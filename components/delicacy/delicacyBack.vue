<template>
	<view>
		<view class="prefer-posi">
			<!-- 刷选区 -->
			<view class="delica-view">
				<view class="delica-list" @click="multiple()">
					区域
					<image src="../../../static/img/delicacy/bottom.png" class="withFix"></image>
				</view>
				<view class="delica-list" @click="getMoney()">
					{{avgMoney}}
					<image src="../../../static/img/delicacy/bottom.png" class="withFix"></image>
				</view>
				<view class="delica-list" @click="getHouse()">
					{{houseTypeName}}
					<image src="../../../static/img/delicacy/bottom.png" class="withFix"></image>
				</view>
				<view class="delica-list" @click="getMore()">
					更多
					<image src="../../../static/img/delicacy/bottom.png" class="withFix"></image>
				</view>
				<view class="delica-list" @click="getSortItem()">
					<image src="../../../static/img/delicacy/sort.png" class="withFix sort"></image>
				</view>
			</view>
			<!--区域排序刷选-->
			<view class="sortlist srotlitetle avgList" v-if="drop">
				<view class="areaList">
					<view class="areaTit">
						<text>区域</text>
					</view>
					<view class="areaCon checkMoreRes area_list">
					<block v-for="(item,index) in arealist" :key="index">
						<text :class="{activeb:index == num}" @click="sortClick(index,item.name)">{{item.name}}</text>
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
			<view class="sortlist srotlitetle avgList avg_list" v-if="avgPrice">
				<view class="areaCon checkMoreRes">
					<block v-for="(item,index) in pricelist" :key="index">
						<text :class="{'activeb': rSelect.indexOf(index)!=-1}" @tap="avgClick(index,item.name)">{{item.name}}</text>
					</block>
				</view>
				<view class="sortlist-bottom">
					<view class="customize">
						<view class="customize_tit">自定义价格</view>
						<view>
							<input class="start" type="number" v-model="start"/>
						</view>
						<view class="customize_line">-</view>
						<view class="end">
							<input type="number" v-model="end"/>万
						</view>
					</view>
					<view class="sure">
						<text @click="soureSort(1)">确定</text>
					</view>
				</view>
			</view>
			<!--类型排序刷选-->
			<view class="sortlist srotlitetle avgList" v-if="house">
				<block v-for="(item,index) in familyData" :key="index">
					<text :class="{'activeb': fSelect.indexOf(index)!=-1}" @tap="sortHouse(index,item.name)">{{item.name}}</text>
				</block>
				<view class="sortlist-bottom">
					<view class="area_list_clear">
						<text @click="clearSearch(2)">清除条件</text>
					</view>
					<view class="area_list_btn">
						<text @click="soureSort(2)">确定</text>
					</view>
				</view>
			</view>
			<!--更多排序刷选-->
			<view class="sortlist checkMoreRes" v-if="more">
				<view class="check_tit">类型</view>
				<view class="check_more">
					<block v-for="(itemHouse,index) in houseProperty" :key="index">
					<text class="check_active choice">{{itemHouse.name}}</text>
					</block>
				</view>
				<view class="check_tit">面积</view>
				<view class="check_more">
					<block v-for="(itemArea,areaKey) in areaData" :key="areaKey">
						<text class="choice">{{itemArea.name}}</text>
					</block>
				</view>
				<view class="check_tit">阶段</view>
				<view class="check_more_level check_more">
					<block v-for="(itemLevel,LevelKey) in levelData" :key="LevelKey">
						<text class="choice">{{itemLevel.name}}</text>
					</block>
				</view>
				<view class="sortlist-bottom">
					<view class="area_list_clear">
						<text @click="clearSearch(3)">清除条件</text>
					</view>
					<view class="area_list_btn">
						<text @click="soureSort(3)">确定</text>
					</view>
				</view>
			</view>
			<view class="sortlist sortitem" v-if="defaultMore">
				<view>默认排序</view>
				<view>开拍时间<image src="../../../static/img/delicacy/jt_bottom.png" mode=""></image></view>
				<view>房屋总价<image src="../../../static/img/delicacy/jt_bottom.png" mode=""></image></view>
				<view>房屋面积<image src="../../../static/img/delicacy/jt_bottom.png" mode=""></image></view>
			</view>
		</view>
		<view class="ying"  v-if="ying"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				drop: false,
				num:0,
				keyPrice:0,
				start:"",//自定义价格 起始
				end:"",//自定义价格 结束
				ying: false,
				avgPrice: false,
				house: false,
				more: false,
				defaultMore:false,
				synthesize: '区域',
				avgMoney: '价格',
				houseTypeName: '类型',
				arealist:[],//区域列表
				pricelist:[],//均价列表
				rSelect:[],
				familyData:[],//房屋户型
				fSelect:[],
				hSelect: [],
				levelData: [],//阶段
				areaData: [],//面积
				houseProperty: [],//房屋类型
				
			}
		},
		created:function(){
			this.getSortlist();
			this.getPricelist();
			this.getHouseType();
			this.getMoreData();
		},
		methods: {
			getSortlist(){//获取区域
				uni.request({
					url:this.baseUrl+'/api/second/getAreaByCityId',
					method:'GET',
					data:{"city_id":39},
				}).then((res)=>{
					this.arealist = res[1].data.data
				}).catch((err)=>{
					console.log(err)
				})
			},
			getPricelist(){
				uni.request({
					url:this.baseUrl+'/api/second/getSecondPrice',
					method:'GET',
				}).then((res)=>{
					this.pricelist = res[1].data.data
				}).catch((err)=>{
					console.log(err)
				})
			},
			getHouseType(){//类型
				this.fun.getReq(this.baseUrl+'/api/second/getRoom').then((res)=>{
					this.familyData = res[1].data.data;
				});
			},
			getMoreData(){
				var _res = []
				uni.request({
					url:this.baseUrl+'/api/second/houseType',
					method:'GET',
					data:{"id": 26},
				}).then((res)=>{
					this.houseProperty = res[1].data.data
				}).catch((err)=>{
					console.log(err)
				})
				
				uni.request({
					url:this.baseUrl+'/api/second/getAcreage',
					method:'GET',
				}).then((res)=>{
					this.areaData = res[1].data.data
				}).catch((err)=>{
					console.log(err)
				})
				
				uni.request({
					url:this.baseUrl+'/api/second/houseType',
					method:'GET',
					data:{"id": 25},
				}).then((res)=>{
					this.levelData = res[1].data.data
				}).catch((err)=>{
					console.log(err)
				})
			},
			multiple(){
				this.drop = true;
				this.avgPrice = false;
				this.house = false;
				this.more =false;
				this.defaultMore = false;
				this.backOne();
			},
			sortClick(index,name){//区域
				this.num = index;
				this.synthesize = name;
			},
			avgClick(index,name){//多选价格
				if (this.rSelect.indexOf(index) == -1) {
			    	    console.log(index)//打印下标
				        this.rSelect.push(index);//选中添加到数组里
			        } else {
				        this.rSelect.splice(this.rSelect.indexOf(index), 1); //取消
				    }
			},
			sortHouse(index,name){//类型
				if (this.fSelect.indexOf(index) == -1) {
					this.fSelect.push(index);//选中添加到数组里
				} else {
					this.fSelect.splice(this.fSelect.indexOf(index), 1); //取消
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
			},
			backOne(){//透明背景
				setTimeout(()=>{
					this.ying = true;
				},310);
			},
			backClick(){//隐藏透明背景
				this.ying= false;
			},
			clearSearch(index){//清除
				if (index ==0) {
					this.num = 0;
				}
			},
			soureSort(index){
				if (index ==0) {//区域
					var _param = {area:this.synthesize};
				}
				if (index ==1) {//价格
					if (this.start != "" || this.end !="") {
						var _param = {id:25};
					} else {
						var _param = {id:25};
					}
				}
				if (index ==1) {//类型
					console.log("3333",index);
				}
				this.fun.getReq(this.baseUrl+'/api/second/houseType',_param)
				.then((res)=>{
					this.levelData = res[1].data.data
				}).catch((err)=>{
					console.log(err)
				})
				this.hiddenAll()
			},
			hiddenAll(){//隐藏全部
				this.avgPrice = false;
				this.drop = false;
				this.house = false;
				this.more =false;
				this.backClick();
			}
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
		padding: 28upx 30upx;
		border-bottom: 1upx solid #EBEBEB;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.withFix{
		width: 16upx;
		height: 16upx;
		margin-left: 8upx;
		display: block;
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
		display: flex;
		align-items: center;
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
	.activeb{
		color: #C73126 !important;
	}
	.ying{
		background: rgba(0,0,0,0.5); position: fixed;top: 0;left: 0;right: 0;bottom: 0;
	}
	
	/* 更多 */
	.check_more{
		display: flex;
		flex-flow:row wrap;
		/* align-items: flex-end; */
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
	.areaCon{
		height: ;
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
	/* 价格 */
	
</style>
