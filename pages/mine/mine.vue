<template>
	<view>
		<view class="mine_head">
			<view class="mine_banner">
				<MineBanner :bannerdata="bannerdata"></MineBanner>
			</view>
			<view class="header">
				<view class="header_login">
					<view class="avatar">
						<image mode="" :src="getImg()"></image>
					</view>
					<view class="header_text" v-if="isShowNickName">
						<text>{{nickName}}</text>
					</view>
					<view class="header_text" v-if="isShow">
						<text @click="login">登录</text>
						/
						<text @click="register">注册</text>
					</view>
				</view>
				<view class="change_info" @click="changeInfo">
					修改资料
				</view>
			</view>
		</view>
		<Header></Header>
		<History :uuid="uuid"></History>
		<chatSuspension></chatSuspension>
	</view>
</template>

<script>
	import MineBanner from '@/components/base/banner.vue';
	import Header from '@/components/mine/header.vue';
	import History from "@/components/mine/history.vue"
	import chatSuspension from '@/components/home/chatSuspension.vue'; //悬浮按钮

	export default {
		components: {
			MineBanner,
			Header,
			History,
			chatSuspension
		},
		data() {
			return {
				bannerdata: [],
				isShow: true,
				isShowNickName:false,
				nickName:"",
				userInfoData: [],
				uuid:-1,
			}
		},
		onLoad: function() {
			this.getBannerData();
		},
		onShow: function() {
			this.getStore();
		},
		methods: {
			getStore() {
				var _self = this;
				uni.getStorage({
					key: _self.fun.userInfo,
					success: function(res) {
						_self.userInfoData = res.data;
						_self.isShow = false;
						_self.isShowNickName = true;
						_self.nickName = res.data.nick_name;
						_self.uuid = _self.userInfoData.id;
					},
					fail: function() {
						_self.isShow = true;
						_self.nickName = '';
						_self.isShowNickName = false;
						_self.uuid = -1;
					}
				})
			},
			getBannerData() {
				this.fun.getReq(this.baseUrl + '/api/banner/index?space_id=28')
					.then((res) => {
						this.bannerdata = res[1].data.data
					});
			},
			login() { //登录
				this.fun.navTo("/pages/login/login");
			},
			register() { //注册
				this.fun.navTo("/pages/login/register");
			},
			getImg() {
				if (this.userInfoData.length >= 1) {
					ImgSrc = userInfoData.img
					return this.fun.getImgSrc(userInfoData.img);
				}
				return "../../static/img/base/default_avatar.png";
			},
			changeInfo() {
				if (this.isShow) {
					this.fun.showMsg("请登录");
					return false;
				} else {
					this.fun.navTo("/pages/mine/edit");
				}
			},
		}
	}
</script>

<style scoped>
	@import url("./css/mine.css");
</style>
