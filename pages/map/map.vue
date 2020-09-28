<template>
	<view>
		<web-view src="https://www.fangpaiwang.com/map/map" class="map_sty" @message="message"></web-view>
	</view>
</template>

<script>
	var wv;//计划创建的webview
	export default {
		data() {
			return {
				
			}
		},
		onReady() {
			 // #ifdef APP-PLUS
				var currentWebview = this.$scope.$getAppWebview() //此对象相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效，非v3编译模式使用this.$mp.page.$getAppWebview()
				setTimeout(function() {
					wv = currentWebview.children()[0]
					wv.setStyle({top:20})
				}, 1000); //如果是页面初始化调用时，需要延时一下
				// #endif
		},
		created() {
			uni.setNavigationBarTitle({
				title: "地图找房"
			})
		},
		methods: {
			message(obj) {
				let con = obj.detail.data[0].action;
				if (con["back"] == "shouye") {
					uni.switchTab({
						url:"/pages/index/index"
					})
				}
				if (con["back"] == "xiaoqu") {
					this.fun.navTo("/pages/community/community?id="+con["back"])
				}
				if (con["house"]) {
					this.fun.navTo("/pages/detail/index?id="+con["house"])
				}
			}
		}
	}
</script>

<style scoped>
	/* #ifdef APP-PLUS */
	.map_sty{
		margin-top: 180upx;;
	}
	/* #endif */
</style>
