<template>
	<view>
		<view class="community_base_info">
			<view class="community_base_desc">
				<view>物业费：<text>{{cBase.property_fee}}</text></view>
				<view class="rCon">建筑年代：<text>{{buildYears}}</text></view>
			</view>
			<view class="community_base_desc">
				<view>停车位：<text>{{cBase.parking_space}}</text></view>
				<view class="rCon">绿化率：<text>{{cBase.greening_rate}}</text></view>
			</view>
			<view class="community_base_desc">
				<view>总户数：<text>{{cBase.plan_number}}</text></view>
				<view class="rCon">建筑面积：<text>{{cBase.area_build}}</text></view>
			</view>
			<view class="community_base_desc">
				<view>容积率：<text>{{cBase.volume_ratio}}</text></view>
			</view>
			<view class="community_base_desc">
				<view>物业公司：<text>{{cBase.property_company}}</text></view>
			</view>
			<view class="community_base_desc">
				<view>开发商：<text>{{cBase.developer}}</text></view>
			</view>
			<view class="community_base_desc">
				<view>详细位置：<text>{{address}}</text></view>
			</view>
		</view>
		<grayBox></grayBox>
	</view>
</template>

<script>
	import grayBox from "../../components/detail/gray_box.vue" //灰色边框
	
	export default {
		props:["cBase", "buildYears", "address"],
		components:{
			grayBox
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
@import url("./css/community_base.css");
</style>
