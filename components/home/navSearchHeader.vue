<template>
	<view class="quickConView">
		<view class="quickConContent">
			<view v-for="(item,index) in homeMenuData" :key="index" class="quickConItem" @click="getTargetUrl(index)">
				<image class="quickConItemIcon" :src="getImgSrc(item.icon)" mode="heightFix"></image>
				<text class="quickConItemText">{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:[
			'homeMenuData'
		],
		data() {
			return {
				
			};
		},
		methods:{
			getImgSrc(path){
				return this.fun.getImgSrc(path);
			},
			getTargetUrl(index) {
				switch(Number(index)) {
					case 1:
					this.fun.navTo("/pages/all/index?tit=全部房源");
					break;
					case 2:
					this.fun.navTo("/pages/all/index?a=f18334&tit=住宅/公寓");
					break;
					case 3:
					this.fun.navTo("/pages/all/index?a=i48&tit=社会委托");
					break;
					case 4:
					this.fun.navTo("/pages/added/index");
					break;
					case 5:
					this.fun.navTo("/pages/deal/index");
					break;
					case 6:
					this.fun.navTo("/pages/news/index");
					break;
					case 7:
					this.fun.navTo("/pages/detail/taxes");
					break;
					case 7:
					this.fun.navTo("/pages/map/map");
					break;
				}
				
			},
		}
	}
</script>

<style scoped>
	@import url("./css/navSearchHeader.css");
</style>