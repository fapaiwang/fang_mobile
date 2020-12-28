<template>
	<view class="chat_xuanfu1" @click="chat_xuanfu_img_click">
		<image src="../../static/img/base/chat_mobile.png" class="chat_xuanfu_img" ></image>
	<!-- 	<view @click="openJesongChatByGroup(11122,26881)" v-trigger></view>
		 <a target="showHere" @click="openJesongChatByGroup(11122,26881)" v-trigger></a> -->
	</view>
	
</template>

<script>

export default{
// directives:{
// 		      trigger:{
// 		        inserted(el,binging){
// 		          console.log("自动触发事件")
// 		          el.click()
// 		        }
// 		      }
// 		},
	methods:{
		
		chat_xuanfu_img_click(){
			//#ifndef H5
				uni.switchTab({
					url:"/pages/customer/customer"
				})
			//#endif
			
			//#ifdef H5
			openJesongChatByGroup(11122,26881)
			var userAgent = navigator.userAgent;
			//判断是否百度浏览器
			if (userAgent.indexOf("baidu") > -1){
				uni.switchTab({
					url:"/pages/customer/customer"
				})
			}
				
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
		width: 100upx;
		height: 100upx;
	}
</style>
