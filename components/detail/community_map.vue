<template>
	<view class="community">
		<view class="featuredtTitleView">
			<view class="titleText">
				周边配套
			</view>
		</view>
		<view class="community_name">
			<map style="width:100%;height:35vh;" :latitude="latitude" :longitude="longitude" :markers="marker" scale="15" @click="onMap">
				<cover-view>
					<view class="tabList">
						<view v-for="(item,index) in tabList" :key="index" class="tabItem" @click="tabClick(index)">
							{{item.name}} 
							<template v-if="index !=(tabList.length-1)">
								<text class="item_line" ></text>
							</template>
						</view>
					</view>
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
		tabClick(index){
		},
		onMap(){
			this.fun.navTo("/pages/detail/map?id="+this.detailId);
		}
	}
}
</script>

<style scoped>
	@import url("./css/community_map.css");
</style>
