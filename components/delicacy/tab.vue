<template>
	<view>
		<scroll-view class="scv" scroll-x="true" scroll-with-animation="true" :scroll-left="scrollLeft">
			<view :class="index === TabCur ? selectClass + ' cur':''" v-for="(item,index) in tabList" :key="index" :id="index" @tap="tabChange(index,$event)">
				{{item.name}}
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			selectClass: {
			    type: String,
			    default() {
			        return 'text-red';
			    }
			},
			tabList: {
				type: Array,
				default(){
					return [{name : "重点推荐" ,val:"y1"}, {name : "自由购", val:"m10"}, {name: "6折房源", val:"y2"}, {name : "一口价", val:"g163"}];
				}
			},
			TabCur: {
				type: Number,
				default(){
					return 0;
				}
			}
		},
		data() {
			return {
				
			}
		},
		computed: {
		    scrollLeft() {
		        return (this.TabCur - 1) * 60;
		    }
		},
		methods: {
			tabChange(index) {
				this.TabCur = index;
				console.log(this.tabList[index].val)
				// this.bus.$on("click",index)
			},
		}
	}
</script>

<style scoped>
.scv{
		flex-wrap: nowrap;
		white-space: nowrap;
	}
	.scv view{
		display: inline-block;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		color: #999;
		font-size:28upx;
		margin-right: 71upx;
	}
	.text-red{
	  color:#DF2D23 !important;
	  font-weight:800;
	  font-family:PingFang SC;
	  color: #fff !important;
	  background:linear-gradient(90deg,rgba(245,111,111,1),rgba(221,84,74,1));
	  border-radius:25upx;
	  padding: 0 10px;
	}
</style>
