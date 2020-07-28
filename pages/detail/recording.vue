<template>
	<view class="recording">
		<view class="tit">拍卖成交记录</view>
		<block v-for="(housItem, indexs) in recordingData" :key="indexs">
			<view class="recording_item">
				<text>{{housItem.complate_time}}</text>
				<text>{{housItem.title}}</text>
				<text>{{housItem.chaoxiang}}</text>
			</view>
			<view class="recording_item" style="border-bottom: 2upx solid #e3e3e3;padding-bottom: 20upx;">
				<text>{{housItem.acreage}}平米</text>
				<text>成交价:{{housItem.price}}</text>
				<text>{{housItem.cjprice}}元/㎡</text>
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				recordingData : [],
			}
		},
		onLoad:function(e){
			this.getdealHouse(e.id);
		},
		methods: {
			getdealHouse(id){//成交记录
				this.fun.getReq(this.baseUrl+"/api/estate/dealHouse",{"estate_id":id})
				.then((res)=>{
					this.recordingData = res[1].data.data;
				})
			},
		}
	}
</script>

<style scoped>
.recording{
	padding: 0 30upx;
}
.tit{
	margin: 30upx 0;
}
.recording_item{
	width: 100%;
	display: block;
	font-size: 30upx;
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	margin-bottom: 20upx;
}
.recording_item text{
	width: 33%;
}
</style>
