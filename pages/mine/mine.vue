<template>
	<view>
		<view class="mine_head">
			<view class="mine_banner">
				<MineBanner :bannerdata="bannerdata"></MineBanner>
			</view>
			<Nav></Nav>
		</view>
		<Header></Header>
		<History></History>
	</view>
</template>

<script>
	import MineBanner from '@/components/base/banner.vue';
	import Nav from '@/components/mine/nav.vue';
	import Header from '@/components/mine/header.vue';
	import History from "@/components/mine/history.vue"
	
	export default {
		components:{
			MineBanner,
			Nav,
			Header,
			History
		},
		data() {
			return {
				bannerdata:[],
				isShow:true
			}
		},
		onLoad:function(){
			this.getBannerData();
		},
		methods: {
			getBannerData() {
				uni.request({
					url: this.baseUrl+'/api/banner/index', 
					data:{"space_id":28},
					success: (res) => {
						this.bannerdata = res.data.data
					}
				})
			},
		}
	}
</script>

<style>

</style>
