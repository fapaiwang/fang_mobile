<template>
	<view>
		<web-view src="https://www.fangpaiwang.com/map/map" class="map_sty"></web-view>
	</view>
</template>

<script>
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
