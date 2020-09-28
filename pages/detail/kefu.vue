<template>
	<view>
		<!-- <web-view src="https://kefu.fangpaiwang.com/app/index.php?i=4&c=entry&toopenid=o65dpxAMaQiKzBsr_1tyFTmJDBn4&do=chat&m=cy163_customerservice"></web-view> -->
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
			console.log(options)
			if (options) {
				let urlLen = options.online_consulting.length
				let _subHost = options.online_consulting.substr(0,5)
				let _httpUrl = options.online_consulting
				if (options.online_consulting.substr(0,5) !='https') {
					_httpUrl = "https"+options.online_consulting.substr(4,urlLen+1);
				} 
				console.log(222);
				console.log(_httpUrl);
				console.log(111);
				this.url = _httpUrl+'&c='+options.c+'&toopenid='+options.toopenid+'&do='+options.do+'&m='+options.m
					console.log(this.url);
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
		}
	}
</script>

<style>

</style>
