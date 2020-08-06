<template>
	<view class="community_warp">
		<view v-if="showCon">
			<banner :info="info"></banner>
			<communityHead :detail="detail" :communityId="communityId" :like="like"></communityHead>
			<communityBase :cBase="cBase" :buildYears="buildYears" :address="address"></communityBase>
			<recommendHosue :qualityEstateData="qualityEstateData"></recommendHosue>
			<grayBox></grayBox>
			<communityMap :marker="marker" :latitude="latitude" :longitude="longitude" :detailId="detailId"></communityMap>
			<grayBox></grayBox>
			<featured :choiceEstateData="choiceEstateData"></featured>
		</view>
		<view v-if="showCon == false" class="detialTxt">{{detialText}}</view>
	</view>
</template>

<script>
	import banner from "@/components/community/banner.vue" //轮播图
	import communityHead from "@/components/community/community_head.vue" //房源基础信息
	import communityBase from "@/components/community/community_base.vue" //小区基础信息
	import recommendHosue from "@/components/community/recommend_hosue.vue" //小区房源
	import communityMap from "@/components/detail/community_map.vue" //小区地图
	import grayBox from "@/components/detail/gray_box.vue" //灰色边框
	import featured from '@/components/community/community_featured.vue' // 精选小区
	
	export default {
		components:{
			banner,
			communityHead,
			communityBase,
			recommendHosue,
			communityMap,
			grayBox,
			featured
		},
		data() {
			return {
				info: '',
				qualityEstateData:[],
				choiceEstateData:[],
				marker: [],
				latitude: '',
				longitude: '',
				detail: [],
				cBase: [],
				buildYears: '',
				address: '',
				communityId:0,
				like:-1,
				estateKey:'',
				detailId:-1,
				showCon:false,
				detialText:"",
			}
		},
		onLoad:function(options) {
			if (!options.id) {
				this.getHome();
			}
			if (options.like != undefined) {
				this.like = options.like;
			}
			this.detailId= options.id;
			this.getHomeData(options.id);
			this.getEstateKey();
		},
		methods: {
			getHome() {
				this.detialText = '没有内容'
				this.showCon = false
				setTimeout(function(){
					uni.navigateBack({
						delta:1
					})
				},500)
			},
			getStoreHouse(id,detailData) {//浏览小区
				var _self = this;
				var storeList = new Array();
				uni.getStorage({
					key:_self.fun.historyEstate,
					success:function(res){
						storeList = res.data;
						if (_self.estateKey.indexOf(id) ==-1) {
								detailData["id"] = id
								storeList.push(detailData)
								_self.setEstateStore(storeList);
								_self.estateKey = _self.estateKey+" "+id;
								_self.setKey(_self.estateKey);
						} 
					},
					fail:function(){
						var estateList = [];
						detailData["id"] = id
						estateList.push(detailData)
						_self.setEstateStore(estateList);
						var estateKey = id;
						_self.setKey(estateKey)
					}
				})
			},
			setEstateStore(houseList) {
				var _self = this;
				uni.setStorage({
					key:_self.fun.historyEstate,
					data:houseList,
				})
			},
			getEstateKey() {
				var _self = this;
				uni.getStorage({
					key:_self.fun.estateKeys,
					success:function(ops){
						_self.estateKey = ops.data;
					},
				})
			},
			setKey(estateKey){
				var _self = this;
				uni.setStorage({
					key:_self.fun.estateKeys,
					data:estateKey
				})
			},
			getHomeData(id){
				this.getBaseInfo(id);
				this.getRecommendHouseData(id);
				this.getChoiceHouseData(id);
			},
			getBaseInfo(id){
				var _self = this;
				uni.request({
					url:this.baseUrl+"/api/estate/estate_detail?id="+id,
					success:(res) => {
						if (Number(res.data.code)==20000) {
							_self.getHome();
						} else {
							this.showCon = true;
							this.detail = res.data.data;
							this.communityId = id;
							this.getStoreHouse(id,res.data.data);
							this.cBase = this.detail.data;
							this.buildYears = this.detail.years;
							this.address = this.detail.address;
							// this.info = this.detail.file == null ? this.info : this.detail.file;
							this.info  = res.data.data.img;
							this.latitude = this.detail.lat
							this.longitude = this.detail.lng
							this.marker = [{
								longitude:this.detail.lng,
								latitude:this.detail.lat,
								iconPath: '',
								callout:{//自定义标记点上方的气泡窗口 点击有效
									content:this.detail.title,//文本
									color:'#3A6385',//文字颜色
									fontSize:14,//文本大小
									borderRadius:2,//边框圆角
									bgColor:'#7ABBCB',//背景颜色
									display:'ALWAYS',//常显
								},
							}];
						}
					}
				})
			},
			getRecommendHouseData(id){//小区房源
				this.fun.getReq(this.baseUrl+'/api/estate/estate_house',{"estate_id":id})
				.then((res)=>{
					this.qualityEstateData = res[1].data.data
				})
			},
			getChoiceHouseData(id){//附近小区
				this.fun.getReq(this.baseUrl+'/api/estate/neighborhood_estate',{"estate_id":id})
				.then((res)=>{
					this.choiceEstateData = res[1].data.data
				})
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
