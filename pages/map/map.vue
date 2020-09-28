<template>
	<view>
		<web-view src="https://www.fangpaiwang.com/map/map" class="map_sty" @message="message"></web-view>
	</view>
</template>

<script>
	var w;
	export default {
		data() {
			return {
				
			}
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
	/* #ifdef APP-NVUE */
	.map_sty{
		margin-top: 80upx;;
	}
	/* #endif */
</style>
