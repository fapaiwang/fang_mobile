<template>
	<view>
		<view class="other_warp" v-if="showCon">
			<view class="area_base_info">
				<view class="other_tit">
					<text>基本信息</text>
				</view>
				<view class="other_base_desc">
					<view><text class="tit">小区名称：</text><text>{{getResult.estate_name}}</text></view>
					<view class="sec"><text class="tit">单价：</text><text>{{getResult.price}}元/㎡</text></view>
				</view>
				<view class="other_base_desc">
					<view><text class="tit">所在区域：</text><text>{{communityRes.area_name}}</text></view>
					<view class="sec"><text class="tit">电梯情况：</text><text>{{isShow ? getResult.elevator : '*'}}</text></view>
				</view>
				<view class="other_base_desc">
					<view><text class="tit">户型结构：</text><text>{{isShow ? getResult.basic_info[2] : '*'}}</text></view>
					<view class="sec"><text class="tit">供暖情况：</text><text>{{isShow ? getResult.basic_info[4] : '*'}}</text></view>
				</view>
				<view class="other_base_desc">
					<view><text class="tit">装修情况：</text><text>{{isShow ? getResult.basic_info[3] : '*'}}</text></view>
					<view class="sec"><text class="tit">车位情况：</text><text>{{isShow ? getResult.basic_info[5] : '*'}}</text></view>
				</view>
				<view class="other_base_desc last_child">
					<view><text class="tit">物业情况：</text><text>{{isShow ? getResult.basic_info[6] : '*'}}</text></view>
				</view>
			</view>
			<view class="area_base_line"></view>
			<view class="paimai_base_info">
				<view class="other_tit">
					<text>拍卖信息</text>
				</view>
				<view class="other_base_desc">
					<view>
						<text class="tit">拍卖阶段：</text>
						<text>{{getResult.jieduan_name}}</text>
					</view>
					<view><text class="tit">产权证号：</text><text>{{getResult.property_no}}</text></view>
					<!-- <view class="sec">
						<text class="tit">执行依据：</text>
						<text>{{isShow ? getResult.enforcement : '*'}}</text>
					</view> -->
				</view>
				<view class="other_base_desc">
					<view>房屋用途：<text>{{isShow ? getResult.xsname : '*'}}</text></view>
					<!-- <view>土地证号：<text>土地证号</text></view> -->
					<view class="sec"><text class="tit">查封情况：</text><text>{{isShow ? getResult.sequestration : '*'}}</text></view>
				</view>
				<view class="other_base_desc">
				
					<!-- <view><text class="tit">房屋用途：</text><text>{{isShow ? getResult.house_purpse : '*'}}</text></view> -->
					<!-- <view class="sec"><text class="tit">土地用途：</text><text>{{isShow ? getResult.house_purpse : '*'}}</text></view> -->
				</view>
				<!-- <view class="other_base_desc">
					
					<view class="sec">经营情况：</text><text>{{isShow ? getResult.management : '*'}}</text></view>
				</view> -->
				<view class="other_base_desc">
					<view><text class="tit">租赁情况：</text><text>{{isShow ? getResult.lease : '*'}}</text></view>
					<view class="sec">
						<text class="tit">抵押情况：</text>
						<text>{{isShow ? getResult.mortgage : '*'}}</text>
					</view>
				</view>
				<!-- <view class="other_base_desc last_child">
					<view>腾退情况：<text>{{isShow ? getResult.vacate : '*'}}</text></view>
				</view> -->
			</view>
		</view>
		<view v-if="showCon == false" class="detialTxt">{{detialText}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showCon:false,
				detialText: '',
				getResult: [],
				communityRes: [],
				isShow:false,
			}
		},
		created:function(){
			this.getStore();
		},
		onLoad:function(options){
			if (!options.id) {
				this.getHome();
			}
			this.fun.getReq(this.baseUrl+'/api/second/second_detail_ohter',{"id":options.id})
			.then((res)=>{
				if (Number(res[1].data.code) == 20000) {
					this.getHome();
				} else {
					this.showCon = true
					this.getResult = res[1].data.data
					this.fun.getReq(this.baseUrl+'/api/estate/estate_detail',
					{"id":this.getResult.estate_id})
					.then((res)=>{
						this.communityRes = res[1].data.data
					})
				}
			})
		},
		methods: {
			getStore() {
				var _self = this;
				uni.getStorage({
					key: _self.fun.userInfo,
					success: function(res) {
						_self.isShow = true;
					},
				})
			},
		},
	}
</script>

<style scoped>
@import url("./css/other.css");
</style>
