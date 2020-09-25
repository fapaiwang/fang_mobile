<template>
	<view>
		<web-view src="https://www.fangpaiwang.com/map/map"></web-view>
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

<style>

</style>
