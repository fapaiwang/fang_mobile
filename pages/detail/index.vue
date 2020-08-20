<template>
	<view class="container">
		<view v-if="showCon">
			<banner :info="info" :bannerTit="bannerTit" :bannerCol="bannerCol" :detailId="detailId"></banner>
			<baseHouse :communityName="communityName" :detial="detial" :houseType="houseType" :buildYear="buildYear" :houseTit="houseTit" :countDownList="countDownList" :like="like"></baseHouse>
			<grayBox></grayBox>
			<housingSituation :surroundingData='surroundingData' :trafficData='trafficData' :announcementData='announcementData' :defectData='defectData' :recordingData='recordingData' :estateId="estateId" :recordingLogData="recordingLogData" :detailId="detailId"></housingSituation>
			<grayBox></grayBox>
			<recommendPersion :recommendData="recommendData" :detailId="detailId"></recommendPersion>
			<grayBox></grayBox>
			<communityDesc :detial="detial" :communityThumb="communityThumb" :estateData="estateData" :buildYear="buildYear"></communityDesc>
			<grayBox></grayBox>
			<communityMap :marker="marker"  :latitude="latitude" :longitude="longitude" :detailId="detailId"></communityMap>
			<grayBox></grayBox>
			<recommendHosue :qualityEstateData="qualityEstateData"></recommendHosue>
			<advisory :detial="detial" :advisoryName="advisoryName"></advisory>
		</view>
		<view v-if="showCon == false" class="detialTxt">{{detialText}}</view>
		<navigator src="http://live.easyliao.com/live/chat.do?c=11122&g=26881&config=40987&tag=0"></navigator>
	</view>
</template>

<script>
	import banner from "@/components/detail/banner.vue" //banner
	import baseHouse from "@/components/detail/base_house.vue" //房源基础信息
	import housingSituation from "@/components/detail/housingSituation.vue" //房源情况
	import grayBox from "@/components/detail/gray_box.vue" //灰色边框
	import recommendPersion from "@/components/detail/recommend.vue" //法拍专员推荐
	import communityDesc from "@/components/detail/community_desc.vue" //小区介绍
	import communityMap from "@/components/detail/community_map.vue" //小区地图
	import recommendHosue from "@/components/detail/recommend_hosue.vue" //推荐房源
	import advisory from "@/components/detail/advisory.vue" //客服
	
	export default {
		components: {
			banner,
			baseHouse,
			housingSituation,
			grayBox,
			recommendPersion,
			communityDesc,
			communityMap,
			recommendHosue,
			advisory
		},
		data() {
			return {
				info: [{
				}],
				detialText: '',
				showCon:false,
				detial:"",
				houseType: '',
				buildYear: '',
				houseTit: '',
				qualityEstateData: [],
				communityName:[],
				estateData:[],
				communityThumb:'',
				countDownList:'00天00时00分00秒',
				advisoryName: '',
				surroundingData: '',//周边情况
				trafficData: '',
				announcementData: '',
				defectData: [],
				recordingData: [],//成交记录 拍卖成交记录
				recordingLogData: [],//成交记录 
				marker: [],
				latitude: '',
				longitude: '',
				recommendData:[],
				estateId:0,
				bannerTit:'',
				bannerCol:'',
				like:-1,
				HouseKey:'',
				detailId:0,
			}
		},
		onLoad:function(options){
			if (!options.id) {
				this.getHome();
			}
			if (options.like !=undefined) {
				this.like = options.like;
			}
			this.detailId = options.id;
			this.getRecommendPersion(options.id)
			this.getHouseKey();
			this.fun.getReq(this.baseUrl+"/api/second/houseDetail",{"id":options.id})
			.then((res)=>{
				uni.setNavigationBarTitle({
					title:res[1].data.data.seo.title
				})
				if (Number(res[1].data.code) == 20000) {
					this.getHome();
				} else {
					this.showCon = true
					
					this.getResult(res[1].data.data);
					this.getStoreHouse(res[1].data.data);
				}
			}).catch((err)=>{
				console.log(err,11)
				// this.getHome();
			})
			
			// uni.clearStorage(this.fun.historyHouse)
			// uni.clearStorage(this.fun.houseKeys)
		},
		methods: {
			getStoreHouse(detailData) {//浏览房源
				var _self = this;
				var houseList = new Array();
				uni.getStorage({
					key:_self.fun.historyHouse,
					success:function(res) {
						houseList = res.data;
						if (_self.HouseKey.indexOf(detailData.id) == -1) {
							houseList.push(detailData)
							_self.setHouseStore(houseList);
							_self.setHouseKey(detailData.id);
						}
					},
					fail:function(){
						var house = [];
						house.push(detailData)
						_self.setHouseStore(house);
						_self.setHouseKey(detailData.id);
					}
				})
			},
			setHouseStore(houseList){
				var _self = this;
				uni.setStorage({
					key:_self.fun.historyHouse,
					data:houseList
				})
			},
			getHouseKey() {
				var _self = this;
				uni.getStorage({
					key:_self.fun.houseKeys,
					success:function(ops){
						_self.HouseKey = ops.data;
					},
				})
			},
			setHouseKey(id){
				var _self = this;
				_self.HouseKey = _self.HouseKey+" "+id;
				uni.setStorage({
					key:_self.fun.houseKeys,
					data:_self.HouseKey
				})
			},
			getResult(_res){
				this.detial = _res;
				this.info = this.detial.file;
				this.houseType = this.detial.xsname;
				this.buildYear = this.detial.estate.years;
				this.houseTit = this.detial && this.detial.title;
				this.communityName = this.detial.estate && this.detial.estate.title;
				this.qualityEstateData = this.detial.recommend_house;
				this.estateData = this.detial.estate.data;
				this.communityThumb = this.detial.estate.img
				this.countDown(this.detial.jieduan,this.detial.kptime,this.detial.bianetime)
				this.advisoryName = this.detial.pinglun.user_name
				this.surroundingData = this.detial.rim;
				this.trafficData = this.detial.traffic;
				this.announcementData = this.detial.info;
				if (_res.is_free ==1) {
					this.bannerTit = "自由购";
					this.bannerCol= '#CEA85F';
				}
				if (_res.house_type ==48) {
					this.bannerTit = "社会委托";
					this.bannerCol= '#4cc7a4';
				}
				var qianfeiInfo = [];
				if (this.detial.qianfei_status==1) {
					qianfeiInfo.push('欠费:有')
				}
				if (this.detial.xiaci_status==1) {
					qianfeiInfo.push('瑕疵:有')
				}
				this.defectData = qianfeiInfo;
				var recordingLog = [];
				if (this.detial.jieduan ==162) {
					//this.recordingData = '成交记录';
					recordingLog.push({
						tit:"一拍流拍",
						time:`二拍结束时间：${this.detial.twoetime}`,
						price:`流拍价格：${this.detial.twoprice}万`
					})
					this.recordingLogData = recordingLog;
					//业务为4展示拍卖成交记录
				}
				if (this.detial.jieduan ==163) {
					//this.recordingData = '成交记录';
					recordingLog.push({
						tit:"二拍流拍",
						time:`二拍结束时间：${this.detial.twoetime}`,
						price:`流拍价格：${this.detial.twoprice}万`
					})
					recordingLog.push({
						tit:"一拍流拍",
						time:`一拍结束时间：${this.detial.oneetime}`,
						price:`流拍价格：${this.detial.oneprice}万`
					})
					this.recordingLogData = recordingLog;
					// 判断是否是业务   所有业务都是4    拍卖成交记录
				}
				this.estateId = this.detial.estate_id;//拍卖成交记录
				this.getdealHouse();
				this.longitude = this.detial.lng
				this.latitude = this.detial.lat
				var lng = this.longitude;
				var lat = this.latitude;
				this.marker = [{
					longitude:lng,
					latitude:lat,
					iconPath: '',
					callout:{//自定义标记点上方的气泡窗口 点击有效
						content:this.houseTit,//文本
						color:'#3A6385',//文字颜色
						fontSize:14,//文本大小
						borderRadius:2,//边框圆角
						bgColor:'#7ABBCB',//背景颜色
						display:'ALWAYS',//常显
						iconPath: '',
					},
				}];
			},
			getHome() {
				this.detialText = '没有内容'
				this.showCon = false
				setTimeout(function(){
					uni.switchTab({
					    url: '/pages/index/index'
					});
				},500)
			},
			getdealHouse(){//成交记录
				this.fun.getReq(this.baseUrl+"/api/estate/dealHouse",{"estate_id":this.estateId})
				.then((res)=>{
					this.recordingData = res[1].data.data;
				})
			},
			countDown(level,kptime,bianetime) {
				var TimeStrs = level;
				var TimeStr= kptime;
				var Deadline;
				var Deadlineb;
				if (TimeStrs==175) {
					this.countDownList = "成交";
					return false;
				}
				if (TimeStrs==175) {
					this.countDownList = "暂缓";
					return false;
				}
				if (TimeStrs==173) {
					this.countDownList = "撤回";
					return false;
				}
				if (TimeStrs==172) {
					this.countDownList = "终止";
					return false;
				}
				if (TimeStrs==171) {
					this.countDownList = "已结束";
					return false;
				}
				//即将拍卖/进行中  169 170
				if (TimeStrs==163) {
					var TimeStrb = bianetime
					var fullDateb = TimeStrb.split(" ")[0].split("-");
					var fullTimeb = TimeStrb.split(" ")[1].split(":");
					Deadlineb = this.getDeadline(fullDateb,fullTimeb)
				}
				var fullTime = TimeStr.split(" ");
				var fullDate = fullTime[0].split("-");
				var fullTime = fullTime[1].split(":");	
				Deadline = this.getDeadline(fullDate,fullTime);
				var interval = setInterval(() => {
					// 获取当前时间，同时得到活动结束时间数组
					var nowdate = new Date();  //开始时间
					var date = Deadline - nowdate.getTime();   //时间差的毫秒数
					if (TimeStrs == 163) {
						if (date > 0) {
							//计算出相差天数
							var days = Math.floor(date / (24 * 3600 * 1000))
							 //计算出小时数
							var leave1 = date % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
							var hours = Math.floor(leave1 / (3600 * 1000))
							//计算相差分钟数
							var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
							var minutes = Math.floor(leave2 / (60 * 1000))
							//计算相差秒数
							var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
							var seconds = (leave3 / 1000).toFixed(1)
							this.countDownList = days + "天" + hours + "时" + minutes + "分" + seconds + "秒";
						} else if (date < 0) {
							var dateb = Deadlineb - nowdate.getTime();   //时间差的毫秒数
							//计算出相差天数
							 if (dateb>0) {
									var days = Math.floor(dateb / (24 * 3600 * 1000))		
									//计算出小时数		
									var leave1 = dateb % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数		
									var hours = Math.floor(leave1 / (3600 * 1000))	
									//计算相差分钟数
									var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
									var minutes = Math.floor(leave2 / (60 * 1000))
									//计算相差秒数
									var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数	
									var seconds = (leave3 / 1000).toFixed(1)
									this.countDownList = days + "天" + hours + "时" + minutes + "分" + seconds + "秒";
								} else{
									clearInterval(interval);
									this.countDownList = "结束";
								}
						} else {
				            clearInterval(interval);
				            this.countDownList = "结束";
				        }
					} else {
				        if (date > 0) {
				            //计算出相差天数
				            var days = Math.floor(date / (24 * 3600 * 1000))
				            //计算出小时数
				            var leave1 = date % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
				            var hours = Math.floor(leave1 / (3600 * 1000))
				            //计算相差分钟数
				            var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
				            var minutes = Math.floor(leave2 / (60 * 1000))
				            //计算相差秒数
				            var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
				            var seconds = (leave3 / 1000).toFixed(1)
				            this.countDownList = days + "天" + hours + "时" + minutes + "分" + seconds + "秒";
				        } else if(date<0 && date >-86400000){
				            var date = date+86400000;
				            //计算出相差天数
				            var days = Math.floor(date / (24 * 3600 * 1000))
				            //计算出小时数
				            var leave1 = date % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
				            var hours = Math.floor(leave1 / (3600 * 1000))
				            //计算相差分钟数
				            var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
				            var minutes = Math.floor(leave2 / (60 * 1000))
				            //计算相差秒数
				            var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
				            var seconds = (leave3 / 1000).toFixed(1)
				            this.countDownList = days + "天" + hours + "时" + minutes + "分" + seconds + "秒";
				        } else {
				            clearInterval(interval);
				            this.countDownList = "结束";
				        }
				    }
				},100)
			},
			getDeadline(fullDate,fullTime) {//结束时间
				return new Date(fullDate[0], fullDate[1]-1, fullDate[2], (fullTime[0] != null ? fullTime[0] : 0), (fullTime[1] != null ? fullTime[1] : 0), (fullTime[2] != null ? fullTime[2] : 0));
			},
			getRecommendPersion(houseId){//法拍专员推荐
				this.fun.getReq(this.baseUrl+"/api/second/houseComment",{"house_id":houseId})
				.then((res)=>{
					this.recommendData = res[1].data.data;
				});
			}
		}
	}
</script>

<style scoped>
	.detialTxt{
		line-height: 2em;
		text-align: center;
		color: #888;
		font-size: 20upx;
		margin-top: 20upx;
	}
</style>
