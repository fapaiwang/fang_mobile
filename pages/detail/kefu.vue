<template>
	<view>
		<!-- <web-view src="https://kefu.fangpaiwang.com/app/index.php?i=4&c=entry&toopenid=o65dpxAMaQiKzBsr_1tyFTmJDBn4&do=chat&m=cy163_customerservice"></web-view> -->
		<web-view :src="this.online_consulting"></web-view>
		<navTo></navTo>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad(options) {
			console.log(options);
			if (!options.id) {
				this.url = "/pages/deal/index?id=" + this.id
			} else {
				this.url = "/pages/index"
			}
		},
		methods: {
			onNavigationBarButtonTap(e) {
				uni.redirectTo({
					url: this.url
				})
			},
		}
	}
</script>

<style>

</style>
