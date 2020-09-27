<template>
	<view>
		<!-- <view class="bg">
			<image src="../../static/img/base/bg.png" class="bgImg"></image>
		</view>
		<view>
			 <text class="desc">程序猿小哥哥正在开发~</text>
		</view> -->
		<!-- #ifdef H5 -->
		<web-view src="https://kefu.fangpaiwang.com/app/index.php?i=4&c=entry&toopenid=o65dpxAMaQiKzBsr_1tyFTmJDBn4&do=chat&m=cy163_customerservice"></web-view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<web-view src="https://kefu.fangpaiwang.com/app/index.php?i=4&c=entry&toopenid=o65dpxAMaQiKzBsr_1tyFTmJDBn4&do=chat&m=cy163_customerservice"></web-view>
		<!-- #endif -->
	</view>
</template>
<script>
	var wv; //计划创建的webview
	export default {

		onLoad() {
			uni.setNavigationBarTitle({
				title: "客服"
			})
			// openJesongChatByGroup(11122,26881);
			// #ifdef APP-PLUS
			wv = plus.webview.create("", "custom-webview", {
				plusrequire: "none", //禁止远程网页使用plus的API，有些使用mui制作的网页可能会监听plus.key，造成关闭页面混乱，可以通过这种方式禁止
				top: uni.getSystemInfoSync().statusBarHeight //放置在titleNView下方。如果还想在webview上方加个地址栏的什么的，可以继续降低TOP值
			})
			wv.loadURL("https://kefu.fangpaiwang.com/app/index.php?i=4&c=entry&toopenid=o65dpxAMaQiKzBsr_1tyFTmJDBn4&do=chat&m=cy163_customerservice")
			var currentWebview = this.$scope.$getAppWebview(); //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效，非v3编译模式使用this.$mp.page.$getAppWebview()
			currentWebview.append(wv); //一定要append到当前的页面里！！！才能跟随当前页面一起做动画，一起关闭
			setTimeout(function() {
				console.log(wv.getStyle())
			}, 1000); //如果是首页的onload调用时需要延时一下，二级页面无需延时，可直接获取
			// #endif
		},
		onNavigationBarButtonTap(e) {
			uni.navigateBack({
				delta:1
			})	
		},
	};
</script>
<style scoped>
</style>
