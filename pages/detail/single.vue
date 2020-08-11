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
		onLoad:function(options){
			var url = 'https://www.fangpaiwang.com/house_notice_'+options.id;
			this.src = url;
		},
		methods: {
		}
	}
</script>

<style>

</style>
