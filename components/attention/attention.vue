<template>
	<view>
		<view class="total">
			<text>我关注的小区</text>
		</view>
		<view class="xiaoquList">
			<view class="item" @click="detailXiaoqu">
				<view class="img">
				  <image src="" mode=""></image>
				</view>
				<view class="titleinfoView">
					<view class="titleView">
						<text>通州区 新海南里</text>
					</view>
					<view class="titleInfo">
						<text>周边房源<text style="color: #DF2D23">20</text>套</text>
					</view>
					<view class="price">
						<text style="color: #DF2D23">13000元/㎡</text>
					</view>
				</view>
			</view>
			<view class="item" @click="detailXiaoqu">
				<view class="img">
				  <image src="" mode=""></image>
				</view>
				<view class="titleinfoView">
					<view class="titleView">
						<text>通州区 新海南里</text>
					</view>
					<view class="titleInfo">
						<text>周边房源<text style="color: #DF2D23">20</text>套</text>
					</view>
					<view class="price">
						<text style="color: #DF2D23">13000元/㎡</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style scoped>
	@import url("./css/attention.css");
</style>
