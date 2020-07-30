<template>
	<view class="recommend_warp">
		<view class="total">
			<text>共3位法拍专员</text>
		</view>
		<view class="recommend_con">
			<view class="recommend_list">
				<view class="recommend_list_l">
					<view class="avatar">
						<image src="../../static/img/detail/tel.png" mode=""></image>
					</view>
					<view class="workJob">
						<text class="name">111</text>
						<view class="experience">法拍经验：<text class="workYear">0年</text></view>
					</view>
				</view>
				<view class="recommend_list_r">
					<image class="tel" src="../../static/img/detail/tel.png" @click="dial(item.lxtel)"></image>
					<image class="msg" src="../../static/img/detail/msg.png" @click="online(item.kflj)"></image>
				</view>
			</view>
			<view class="recommend_list">
				<view class="recommend_list_l">
					<view class="avatar">
						<image src="../../static/img/detail/tel.png" mode=""></image>
					</view>
					<view class="workJob">
						<text class="name">111</text>
						<view class="experience">法拍经验：<text class="workYear">0年</text></view>
					</view>
				</view>
				<view class="recommend_list_r">
					<image class="tel" src="../../static/img/detail/tel.png" @click="dial(item.lxtel)"></image>
					<image class="msg" src="../../static/img/detail/msg.png" @click="online(item.kflj)"></image>
				</view>
			</view>
			<view class="recommend_list">
				<view class="recommend_list_l">
					<view class="avatar">
						<image src="../../static/img/detail/tel.png" mode=""></image>
					</view>
					<view class="workJob">
						<text class="name">111</text>
						<view class="experience">法拍经验：<text class="workYear">0年</text></view>
					</view>
				</view>
				<view class="recommend_list_r">
					<image class="tel" src="../../static/img/detail/tel.png" @click="dial(item.lxtel)"></image>
					<image class="msg" src="../../static/img/detail/msg.png" @click="online(item.kflj)"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	@import url("./css/list.css");
</style>
