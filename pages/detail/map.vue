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
			var url = 'http://m.fangpaiwang.com/zhoubian/index.html?id='+options.id;
			this.src = url;
		},
		methods: {
		}
	}
</script>

<style>
@import url("./css/map.css");
</style>
