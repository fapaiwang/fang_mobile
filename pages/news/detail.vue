<template>
	<view>
		 <web-view :src="src"></web-view>
		 <chatSuspension></chatSuspension>
	</view>

</template>

<script>
	import chatSuspension from '@/components/home/chatSuspension.vue'; //悬浮按钮
	export default {
		components:{
			chatSuspension,
		},
		data() {
			return {
				src:""
			}
		},
		onLoad:function(options){
			var url = 'https://www.fangpaiwang.com/new_details?id='+options.id
			this.src = url;
		},
		methods: {
		}
	}
</script>

<style>

</style>
