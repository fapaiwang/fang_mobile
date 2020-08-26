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
		onLoad:function(){
			var url = 'https://www.fangpaiwang.com/chat_full_screen';
			this.src = url;
		},
		methods: {
		}
	}
</script>

<style>
</style>
