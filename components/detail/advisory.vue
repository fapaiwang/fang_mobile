<template>
	<view class="advisory_warp">
		<view class="consultant">
			<view class="consultant_l">
				<view class="avatar">
					<image :src="getImgUrl(detial.broker_id)"></image>
				</view>
				<view class="persion">
					<text class="persion_name">{{advisoryName}}</text>
					<view class="work">法拍经验：<text class="work_year">6年</text></view>
				</view>
			</view>
			<view class="consultant_r">
				<text class="online">在线咨询</text>
				<text class="tel" @tap='call(detial.pinglun.mobile)'>电话咨询</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name: "advisory",
		props: ["detial", "advisoryName"],
		data(){
			return {
			}
		},
		methods:{
			call(phone){
				uni.makePhoneCall({
					phoneNumber:'phone'
				})
			},
			getImgUrl(icon){
			   return this.baseUrl+`/uploads/avatar/${icon}/avatar.jpg`;
			},
		}
	}
</script>

<style scoped>
	@import url("./css/advisory.css");
</style>
