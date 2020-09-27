<template>
	<view class="chat_xuanfu1">
		<image src="../../static/img/base/chat_mobile.png" class="chat_xuanfu_img" @click="chat_xuanfu_img_click"></image>
	</view>
</template>

<script>

export default{

	methods:{
		chat_xuanfu_img_click(){
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
		}
	}
}
</script>

<style scoped>
	.chat_xuanfu1{
		display: block;
		position: fixed;
		bottom: 10%;
		left: 80%;
		z-index: 1;
		
	}
	.chat_xuanfu1 .chat_xuanfu_img{
		width: 80upx;
		height: 80upx;
	}
</style>
