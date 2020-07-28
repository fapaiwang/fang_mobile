<template>
	<view class="front_cove_nav_list">
		<view class="front_cove_list">
			  <swiper-item v-for="(item,index) in tabList" :key="index">
				<block v-for="(items, indexs) in houseData(TabCur)" :key="indexs">
					<view class="front_cove_about" @click="getTargetUrl">
						<view class="front_cove_img">
							<image :src="getImgSrc(items.img)"></image>
						</view>
						<view class="front_cove_info">
							<text class="front_cove_tit">{{items.title}}</text>
							<text class="front_cove_desc">{{items.description}}</text>
							<view class="front_cove_time">
								<view class="release_time">
									<view class="createIimeIcon">
										<image src="../../static/img/news/new_time.png"></image>
									</view>
									<view class="createIimeIconinfo">
										<text>
											{{items.create_time_date}}
										</text>
									</view>
								</view>
								<view class="look_num">
									<view class="createIimeIcon">
										<image src="../../static/img/news/new_look.png"></image>
									</view>
									<view class="createIimeIconinfo">
										<text>
											{{items.hits}}
										</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</block>
			  </swiper-item>
		</view>
	</view>
</template>

<script>
	export default {
		props:[
			'tabList',
			'frontList'
		],
		data() {
			return {
				TabCur: 0,
			}
		},
		methods: {
			houseData(num) {
				return this.frontList;
			},
			tabChange(index) {
			    this.TabCur = index;
			},
			swiperChange(e) {
				var index=e.target.current || e.detail.current;
				this.TabCur = index;
			},
			getImgSrc(imgSrc){
				return this.baseUrl+imgSrc;
			},
			getTargetUrl(){
				uni.navigateTo({
					url:'../../pages/news/detail'
				})
			}
		}
	}
</script>

<style scoped>
	.front_cove_list {
		padding: 0 30upx;
	},
	.recommendHouseTitleView {
		height: 117upx;
		display: flex;
		flex-direction: row;
		align-items: center;
	},
	.recommendHouseTitleItem {
		flex: 1;
	}
	.recommendHouseTitleItem text {
		font-size:40upx;
		font-family:PingFang SC;
		font-weight:800;
		color:rgba(51,51,51,1);
	}
	.front_cove_about{
		display: flex;
		flex-flow: row;
		justify-content: space-between;
		margin-top: 60upx;
	}
	.front_cove_about:first-child{
		margin-top: 30upx;
	}
	.front_cove_img {
		width:260upx;
		height:178upx;
		background:#F1F1F1;
		border-radius:10px;
	}
	.front_cove_img image {
		width:260upx;
		height:178upx;
	}
	.front_cove_info{
		display: flex;
		flex-flow: column;
		margin-left: 30upx;
	}
	.front_cove_tit {
		width:100%;
		height:69upx;
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:#333;
		overflow: hidden;
		text-overflow: ellipsis;
		display:-webkit-box; //作为弹性伸缩盒子模型显示。
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
	}
	.front_cove_desc{
		width:100%;
		height:24upx;
		font-size:24upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#666;
		white-space: nowrap;  // 不让它换行
		margin-top: 29upx;
		margin-bottom: 28upx;
	}
	.front_cove_time {
		width: 100%;
		font-size:20upx;
		font-family:PingFang SC;
		font-weight:400;
		color:#999;
	},
	.release_time{
		width: 50%;
		float: left;
	}
	.createIimeIcon{
		margin-top: 5upx;
	}
	.createIimeIcon,.createIimeIcon image {
		width: 24upx;
		height: 24upx;
		float: left;
	}
	.createIimeIconinfo{
		height:16upx;
		font-size:20upx;
		font-family:PingFang SC;
		font-weight:400;
		color:#999;
	}
	.wuc-tab-item.cur{
		border-bottom: none !important;
	}
	
</style>
