<template>
	<view class="community_warp">
		<banner :info="info"></banner>
		<communityHead :cData="cData"></communityHead>
		<communityBase :cBase="cBase" :buildYears="buildYears" :address="address"></communityBase>
		<recommendHosue :qualityEstateData="qualityEstateData"></recommendHosue>
		<grayBox></grayBox>
		<communityMap :marker="marker" :latitude="latitude" :longitude="longitude"></communityMap>
		<grayBox></grayBox>
		<featured :choiceEstateData="choiceEstateData"></featured>
	</view>
</template>

<script>
	import banner from "@/components/detail/banner.vue" //轮播图
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
				info: [{
					title: ""
				}],
				qualityEstateData:[],
				choiceEstateData:[],
				marker: [],
				latitude: '',
				longitude: '',
				cData: [],
				cBase: [],
				buildYears: '',
				address: ''
			}
		},
		onLoad:function(options) {
			this.getHomeData(options.id);
		},
		methods: {
			getHomeData(id){
				this.getBaseInfo(id);
				this.getRecommendHouseData(id);
				this.getChoiceHouseData(id);
			},
			getBaseInfo(id){
				uni.request({
					url:this.baseUrl+"/api/estate/estate_detail?id="+id,
					success:(res) => {
						this.cData = res.data.data;
						this.cBase = this.cData.data;
						this.buildYears = this.cData.years;
						this.address = this.cData.address;
						this.info = this.cData.file == null ? this.info : this.cData.file;
						this.latitude = this.cData.lat
						this.longitude = this.cData.lng
						this.marker = [{
							longitude:this.cData.lng,
							latitude:this.cData.lat,
							iconPath: '',
							callout:{//自定义标记点上方的气泡窗口 点击有效
								content:this.cData.title,//文本
								color:'#3A6385',//文字颜色
								fontSize:14,//文本大小
								borderRadius:2,//边框圆角
								bgColor:'#7ABBCB',//背景颜色
								display:'ALWAYS',//常显
							},
						}];
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

</style>
