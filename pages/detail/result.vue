<template>
	<view class="qiun-columns">
		<view class="qiun-charts" >
			<canvas canvas-id="canvasRing" id="canvasRing" class="charts"></canvas>
		</view>
		<view class="list">
			<block v-for="(item,key) in resData" :key="key">
				<view>
					{{item.name}}:<text>{{item.data}}</text>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	var _self;
	var canvaRing=null;
	export default {
		data() {
			return {
				cWidth:'',
				cHeight:'',
				pixelRatio:1,
				serverData:'',
				yue:"",
				resData:[]
			}
		},
		onLoad:function(option){
			_self = this;
			this.cWidth=uni.upx2px(750);
			this.cHeight=uni.upx2px(500);
			this.getResult(option.q,option.b,option.n,option.l,option.h)
		},
		methods: {
			getResult(qipai,bili,nian,lilv,huan){
				this.fun.getReq(this.baseUrl+"/api/tools/house_loan",{
					dai_qipai:qipai,
					dai_bili:bili,
					dai_nianxian:nian,
					dai_lilv:lilv,
					dai_huankuan:huan,
					dai_mianji:115
				}).then((res)=>{
					var _res = res[1].data.data.info;
					this.yue = _res.yue+"元";
					let Ring={series:[]};
					//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
					this.resData = [{
						"name": "首付",
						"data": _res.shoufu
					}, {
						"name": "契税",
						"data": _res.qishui_price
					}, {
						"name": "贷款金额",
						"data": _res.dai_price
					}]
					Ring.series = this.resData;
					_self.showRing("canvasRing",Ring);
				})
			},
			showRing(canvasId,chartData){
				canvaRing=new uCharts({
					$this:_self,
					canvasId: canvasId,
					type: 'ring',
					fontSize:11,
					legend:true,
					title: {
						name: this.yue,
						color: '#E02E24',
						fontSize: 20*_self.pixelRatio,
						// offsetY:-20*_self.pixelRatio,
					},
					subtitle: {
						name: '首付月供',
						color: '#666666',
						fontSize: 15*_self.pixelRatio,
						// offsetY:30*_self.pixelRatio,
					},
					extra: {
						pie: {
						  labelWidth:15
						},
						pie: {
						  labelWidth:15
						}
					},
					background:'#FFFFFF',
					pixelRatio:_self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth*_self.pixelRatio,
					height: _self.cHeight*_self.pixelRatio,
					disablePieStroke: false,
					dataLabel: false,
				});
			},
		}
	}
</script>

<style scoped>
@import url("./css/result.css");
</style>
