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
	@import url("./css/navMenu.css");
</style>
