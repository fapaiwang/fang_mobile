<template>
	<view>
		<view class="mine_banner">
			<Banner :bannerdata="bannerdata"></banner>
		</view>
	</view>
</template>

<script>
	import Banner from '@/components/mine/banner.vue';
	export default {
		props:["bannerdata"],
		components:{
			Banner
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
.mine_banner{
	height:240upx;
	width: 100%;
	background: #D3D3D3;
}
</style>
