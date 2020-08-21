<template>
	<view class="advisory_warp" v-if="detial">
		<view class="consultant">
			<view class="consultant_l">
				<view class="avatar">
					<image :src="getImgUrl(detial.broker_id)"></image>
				</view>
				<view class="persion">
					<text class="persion_name">{{advisoryName}}</text>
					<view class="work">法拍经验：<text class="work_year">{{detial.kefu_nianxian.history_complate}}年</text></view>
				</view>
			</view>
			<view class="consultant_r">
				<navigator class="online" src="http://live.easyliao.com/live/chat.do?c=11122&g=26881&config=40987&tag=0">在线咨询</navigator>
				<text class="tel" @tap='call(detial.pinglun.lxtel)'>电话咨询</text>
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
			online(){
				uni.switchTab({
					url:"/pages/customer/customer"
				})
			},
			call(phone){
				if (uni.getSystemInfoSync().platform == "android") {
					var Intent = plus.android.importClass("android.content.Intent");
					var Uri = plus.android.importClass("android.net.Uri");  
					// 获取主Activity对象的实例  
					var main = plus.android.runtimeMainActivity();  
					// 创建Intent  
					var uri = Uri.parse("tel:"+phone); // 这里可修改电话号码  
					var call = new Intent("android.intent.action.CALL",uri);  
					// 调用startActivity方法拨打电话  
					main.startActivity( call );  
				} else {
					uni.makePhoneCall({
					    phoneNumber: `${phone}` //仅为示例
					});
				}
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