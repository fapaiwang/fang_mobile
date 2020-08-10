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
		<History></History>
	</view>
</template>

<script>
	import MineBanner from '@/components/base/banner.vue';
	import Header from '@/components/mine/header.vue';
	import History from "@/components/mine/history.vue"

	export default {
		components: {
			MineBanner,
			Header,
			History
		},
		data() {
			return {
				bannerdata: [],
				isShow: true,
				isShowNickName:false,
				nickName:"",
				userInfo: [],
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
						_self.userInfo = res.data;
						_self.isShow = false;
						_self.isShowNickName = true;
						_self.nickName = res.data.nick_name;
					},
					fail: function() {
						_self.isShow = true;
						_self.nickName = '';
						_self.isShowNickName = false;
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
				if (this.userInfo.length >= 1) {
					ImgSrc = userInfo.img
					return this.fun.getImgSrc(userInfo.img);
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
