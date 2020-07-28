<template>
	<scroll-view class="scv" scroll-x="true" scroll-with-animation="true">
		<view :class="index === TabCur ? selectClass + ' cur':''" v-for="(item,index) in tabList" :key="index" :id="index" @tap="tabChange(index,$event)">
			{{item.name}}
			<text class="scv_line"></text>
		</view>
	</scroll-view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		tabList: {
		    type: Array,
		    default() {
		        return [];
		    }
		},
		tabCur: {
		    type: Number,
		    default() {
		        return 0;
		    }
		},
		selectClass: {
		    type: String,
		    default() {
		        return 'text-red';
		    }
		},
	},
	methods: {
		tabChange(index) {
			this.TabCur = index;
		},
	},
	computed: {
	    scrollLeft() {
	        return (this.tabCur - 1) * 60;
	    }
	}
};
</script>
<style scoped>
	.scv{
		flex-wrap: nowrap;
		white-space: nowrap;
		margin: 0 auto;
		width: 50%;
		margin-bottom: 40upx;
	}
	.scv view{
		display: inline-block;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		color: #999;
		font-size:28upx;
		width: 50%;
		text-align: center;
	}
	.scv_line{
		border:4upx solid #fff;
		display: flex;
		margin: 0 auto;
		width:47upx;
	}
	.text-red{
		color: #000 !important;
	}
	.text-red text{
		background:rgba(224,46,36,1);
		border:4upx solid rgba(224,46,36,1);
	}
</style>
	