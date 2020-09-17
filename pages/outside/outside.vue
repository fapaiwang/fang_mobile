<template>
	<view>
		 <web-view :src="src"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src:""
			}
		},
		onLoad:function(options) {
			uni.setNavigationBarTitle({
				title: options.tit,
			})
			this.src = options.url;
		},
		methods: {
		}
	}
</script>

<style>

</style>
