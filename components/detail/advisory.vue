<template>
	<view class="advisory_warp" v-if="detial">
		<view class="consultant">
			<view class="consultant_l" @click="getBusiessDetails">
				<view class="avatar">
					<image :src="getImgUrl(detial.broker_id)"></image>
				</view>
				<view class="persion">
					<text class="persion_name">{{advisoryName}}</text>
					<view class="work">法拍经验：<text class="work_year">{{detial.kefu_nianxian.history_complate}}年</text></view>
				</view>
			</view>
			<view class="consultant_r">
				<text class="online" @tap="online">在线咨询</text>
				<text class="tel" @tap='call(detial.pinglun.lxtel)'>电话咨询</text>
			</view>
		</view>
	</view>
</template>

<script>
	import Easy from './js/easyliao.js';
	
	export default{
		name: "advisory",
		props: ["detial", "advisoryName"],
		data(){
			return {
				uuid:-1,
				userInfoData:''
			}
		},
		created() {
			this.getStore();
		},
		methods:{
			online(){
			//#ifndef H5
				uni.switchTab({
					url:"/pages/customer/customer"
				})
			//#endif
			
			//#ifdef H5
				openJesongChatByGroup(11122,26881);
			//#endif
				
			//#ifdef MP-WEIXIN
				openJesongChatByGroup(11122,26881);
			//#endif
				// if (this.uuid == -1) {
				// 	this.fun.showMsg("请登录");
				// 	return false;
				// } else {
				// 	this.fun.navTo("/pages/detail/kefu?"+this.detial.pinglun.online_consulting+"&houseid="+this.detial.id+"&housetitle="+this.detial.title+"&houseimg="+this.detial.img+"&mobile="+this.userInfoData.mobile)
				// }
			},
			call(phone){
				uni.makePhoneCall({
					phoneNumber:phone
				})
				// if (uni.getSystemInfoSync().platform == "android") {
				// 	var Intent = plus.android.importClass("android.content.Intent");
				// 	var Uri = plus.android.importClass("android.net.Uri");  
				// 	// 获取主Activity对象的实例  
				// 	var main = plus.android.runtimeMainActivity();  
				// 	// 创建Intent  
				// 	var uri = Uri.parse("tel:"+phone); // 这里可修改电话号码  
				// 	var call = new Intent("android.intent.action.CALL",uri);  
				// 	// 调用startActivity方法拨打电话  
				// 	main.startActivity( call );  
				// } else {
				// 	uni.makePhoneCall({
				// 	    phoneNumber: `${phone}` //仅为示例
				// 	});
				// }
			},
			getImgUrl(icon){
			   return this.baseUrl+`/uploads/avatar/${icon}/avatar.jpg`;
			},
			getStore() {
				var _self = this;
				uni.getStorage({
					key: _self.fun.userInfo,
					success: function(res) {
						_self.userInfoData = res.data;
						_self.uuid = _self.userInfoData.id;
					},
					fail: function() {
						_self.uuid = -1;
					}
				})
			},
			getBusiessDetails:function(){
				this.fun.navTo("/pages/business/detaile")
			}
		}
	}
</script>

<style scoped>
	@import url("./css/advisory.css");
</style>