<template>
	<view class="community">
		<view class="featuredtTitleView">
			<view class="titleText">
				周边配套
			</view>
		</view>
		<view class="community_name">
			<map style="width:100%;height:35vh;position: relative;z-index: 1;" :latitude="latitude" :longitude="longitude" :markers="marker" scale="15" @click="onMap">
				<cover-view class="tabItem" v-for="(item,index) in tabList" :key="index">
					{{item.name}} 
				</cover-view>
			</map>
		</view>
	</view>
</template>

<script>
export default {
	props: ["latitude","longitude","marker","detailId"],
	data() {
		return {
			scale:15,
			circles:[],
			tabList:[{name : '公交'},{name : '教育'},{name : '医疗'},{name : '购物'},{name : '生活'},{name : '娱乐'} ]
		}
	},
	created(){
	},
	methods: {
		onMap(){
			this.fun.navTo("/pages/detail/map?id="+this.detailId);
		}
	}
}
</script>

<style scoped>
	@import url("./css/community_map.css");
	.cover{
		height: 100%;
		width: 100%;
		position: relative;
		z-index: 1;
	}
</style>
