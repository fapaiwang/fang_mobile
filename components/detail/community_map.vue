<template>
	<view class="community">
		<view class="featuredtTitleView">
			<view class="titleText">
				周边配套
			</view>
		</view>
		<view class="community_name">
			<map style="width:100%;height:35vh;" :latitude="latitude" :longitude="longitude" :markers="marker" scale="15">
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
	props: ["latitude","longitude","marker"],
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
			
			console.log(index)
		}
	}
}
</script>

<style scoped>
	.community{
		padding: 40upx 30upx 0 30upx;
	}
	.featuredtTitleView {
		height: 60upx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	.titleText{
		color: #333333;	
		height:39upx;
		font-size:40upx;
		font-family:PingFang SC;
		font-weight:800;
		line-height:60upx;
		display: flex;
		flex-flow: row;
	},
	.moreData {
		height:39upx;
		font-size:28upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#999;
		line-height:60upx;
	}
	.more{
		color: #999;
		margin-left: 16upx;
	}
	.community_name{
		margin-top: 49upx;
		width:100%;
		font-size:32upx;
		font-weight:bold;
		color:#CF2924;
		line-height:60upx;
		display: flex;
	}
	.taotalHouse{
		font-size:32upx;
		font-weight:bold;
		color:#333;
	}
	.community_about{
		margin-top: 30upx;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		margin-bottom: 60upx;
	}
	.community_info{
		font-size:28upx;
		font-weight:500;
		color:#666;
		line-height:50upx;
	}
	.community_img{
		width:240upx;
		height:148upx;
		border-radius:10upx;
		background: #ccc;
	}
	.tabList{
		width:90%;
		height:60upx;
		background:#FFF;
		box-shadow:0px 0upx 8upx 0px #231815;
		border-radius:10upx;
		margin: 0 auto;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-around;
		position: absolute;
		bottom: 30upx;
		left: 5%;
	}
	.tabItem{
		font-size:28upx;
		font-weight:bold;
		color:#333;
		line-height:60upx;
	}
	.item_line{
		border-left: 1px solid #EBEBEB;
		margin-left: 25upx;
	}
</style>
