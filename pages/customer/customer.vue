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
	
    onLoad() {
		uni.setNavigationBarTitle({
			title:"客服"
		})
		openJesongChatByGroup(11122,26881);
        // // #ifdef APP-PLUS
        // wv = plus.webview.create("","custom-webview",{
        //     plusrequire:"none", //禁止远程网页使用plus的API，有些使用mui制作的网页可能会监听plus.key，造成关闭页面混乱，可以通过这种方式禁止
        //     top:uni.getSystemInfoSync().statusBarHeight //放置在titleNView下方。如果还想在webview上方加个地址栏的什么的，可以继续降低TOP值
        // })
        // wv.loadURL("http://live.easyliao.com/live/chat.do?c=11122&g=26881&config=40987&tag=0")
        // var currentWebview = this.$scope.$getAppWebview(); //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效，非v3编译模式使用this.$mp.page.$getAppWebview()
        // currentWebview.append(wv);//一定要append到当前的页面里！！！才能跟随当前页面一起做动画，一起关闭
        // setTimeout(function() {
        //     console.log(wv.getStyle())
        // }, 1000);//如果是首页的onload调用时需要延时一下，二级页面无需延时，可直接获取
        // // #endif
    }
};
</script>