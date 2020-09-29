<template>
	<view>
		<web-view :src="url"></web-view>
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
			if (options.toopenid) {
				let _httpUrl = "https://kefu.fangpaiwang.com/app/index.php?i=4&c=entry&do=index&m=cy163_customerservice_plugin_p&toopenid="
				let houseimg = this.getImgUrl(options.houseimg);
				this.url = _httpUrl+options.toopenid+"&houseid="+options.houseid+"&housetitle="+options.housetitle+"&houseimg="+houseimg+"&mobile="+options.mobile
			} else {
				this.url = "/pages/index/index"
			}
		},
		methods: {
			onNavigationBarButtonTap(e) {
				uni.redirectTo({
					url: this.url
				})
			},
			getImgUrl(icon) {
				return this.fun.getImgSrc(icon);
			},
		}
	}
</script>

<style>

</style>
