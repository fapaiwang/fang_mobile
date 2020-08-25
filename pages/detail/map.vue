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
			var lat = options.lat;
			var lng = options.lng;
			var tit = options.tit;
			var url = 'https://www.fangpaiwang.com/second_detail_map?lng='+lng+'&lat='+lat+'&title='+tit;
			this.src = url;
		},
		methods: {
		}
	}
</script>

<style>
@import url("./css/map.css");
</style>
