<template>
    <view>
		<!-- #ifdef H5 -->
		<!-- <web-view src="http://live.easyliao.com/live/chat.do?c=11122&g=26881&config=40987&tag=0"></web-view> -->
		<!-- #endif -->
    </view>
</template>
<script>
var wv;//计划创建的webview
export default {
	onShow() {
		openJesongChatByGroup(11122,26881);
	},
    onLoad() {
		uni.setNavigationBarTitle({
			title:"客服"
		})
		openJesongChatByGroup(11122,26881);
    }
};
</script>