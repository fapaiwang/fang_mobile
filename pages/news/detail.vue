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
			var url = 'http://m.fangpaiwang.com/news/'+options.id+'.‘';
			this.src = url;
		},
		methods: {
		}
	}
</script>

<style>

</style>
