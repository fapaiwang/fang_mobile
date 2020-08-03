<template>
	<view>
		<view class="community_name">
			<map :style="{height:Height+'px'}" :latitude="latitude" :longitude="longitude" :markers="marker" scale="15" @click="onMap" id="mapS">
				<cover-view>
					<view class="tabList">
						<view v-for="(item,index) in tabList" :key="index" class="tabItem" @click="tabClick(index)">
							{{item.name}} 
							<template v-if="index !=(tabList.length-1)">
								<text class="item_line" ></text>
							</template>
						</view>
					</view>
				</cover-view>
			</map>
		</view>
	</view>
</template>

<script>
	let map = null;
	export default {
		data() {
			return {
				marker:[],
				Height:0,
				latitude: '',
				longitude: '',
				scale:15,
				circles:[],
				detial:"",
				tabList:[{name : '公交'},{name : '教育'},{name : '医疗'},{name : '购物'},{name : '生活'},{name : '娱乐'} ]
			}
		},
		onLoad:function(options) {
			this.getRes(options.id);
			this.getHeight();
		},
		onReady:function(){
			let mapContext = uni.createMapContext("maps");
			// let appMap = mapContext.$getAppMap();
			// mapContext.searchInBounds("教育")
			let _param = {
				"query":"教育",
				"region":"北京",
				"output":"json",
				"ak":"ETLXgCxIoVixggHcAk6mKpMd"
			}
			uni.request({
				url:"https://api.map.baidu.com/place/v2/search",
				data:_param,
				success:function(res){
					console.log(res)
				},
				fail:function(err){
					console.log(err,222)
				}
			})
			// this.fun.getReq("http://api.map.baidu.com/place/v2/search",_param).then((res)=>{
			// 	console.log(res,222)
			// })
		},
		methods: {
			getRes(id){
				var _self = this;
				this.fun.getReq(this.baseUrl+"/api/second/houseDetail",{"id":id})
				.then((res)=>{
					if (Number(res[1].data.code) == 20000) {
						this.getHome();
					} else {
						_self.detial = res[1].data.data;
						_self.longitude = _self.detial.lng
						_self.latitude = _self.detial.lat
						var lng = _self.longitude;
						var lat = _self.latitude;
						var title = _self.detial && _self.detial.title
						uni.setNavigationBarTitle({
							title:title
						})
						_self.marker = [{
							longitude:lng,
							latitude:lat,
							iconPath: '',
							callout:{//自定义标记点上方的气泡窗口 点击有效
								content:title,//文本
								color:'#3A6385',//文字颜色
								fontSize:14,//文本大小
								borderRadius:2,//边框圆角
								bgColor:'#7ABBCB',//背景颜色
								display:'ALWAYS',//常显
								iconPath: '',
							},
						}];
					}
				})
			},
			getHome() {
				setTimeout(function(){
					uni.navigateBack({
						delta:1
					})
				},500)
			},
			tabClick(index){
				console.log(index)
			},
			getHeight(){
				var _self = this;
				uni.getSystemInfo({
					success:function(res){
						_self.Height = res.windowHeight;
					},
				})
			},
		}
	}
</script>

<style>
@import url("./css/map.css");
</style>
