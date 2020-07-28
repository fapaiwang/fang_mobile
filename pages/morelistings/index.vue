<template>
	<view>
		<banner :bannerdata="bannerdata"></banner>
		<view class="contenting">
			<view @click="poll()">
				<FocusList id="boxFixed" :class="{'is_fixed' : isfixed}"></FocusList>
			</view>
			<Takeout></Takeout>
		</view>
	</view>
</template>

<script>
	import banner from '@/components/base/banner.vue'; // banner
	import FocusList from '@/components/delicacy/delicacy.vue';
	import Takeout from '@/components/delicacy/takeout.vue';
	
	export default {
		components:{
			banner,
			FocusList,
			Takeout
		},
		data() {
			return {
				bannerdata: [],
				isfixed: false,
				rect:'',
				topdata:'',
				menuData: ''
			}
		},
		onLoad:function(){
			this.getBannerData();
			const query = wx.createSelectorQuery()
			query.select("#boxFixed").boundingClientRect()
			query.exec((res)=>{
				this.topdata = res[0].top;
				console.log("topdata",res[0].top)
				this.menuData = res[0].top;
			})
		},
		methods: {
			getBannerData() {
				uni.request({
					url: this.baseUrl+'/api/banner/index', 
					data:{"space_id":4},
					success: (res) => {
						this.bannerdata = res.data.data
					}
				})
			},
			poll(){//回到顶部
				console.log(this.topdata);
				uni.pageScrollTo({
					scrollTop:this.topdata,
					duration:0
				})
			}
		},
		// 监听页面滚动距离
		onPageScroll(e) {
			this.rect = e.scrollTop
		},
		computed:{
			//监听刷选组件置顶和不置顶
			namepage(){
				console.log("我是自动执行的",this.rect)
				if (this.rect > this.menuData) {
					console.log("置顶")
				} else{
					console.log("不置顶")
				}
			},
		}
	}

</script>

<style scoped>
	
</style>
