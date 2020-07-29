<template>
	<view>
		<view class="avatar">
			<image class="avatar_img" :src="getImg()"></image>
		</view>
		<view class="editCon">
			<text class="alias">{{nickName}}
				<image src="../../static/img/mine/edit.png" class="editImg"></image>
			</text>
		</view>
		<view class="taxes_warp">
			<view class="taxes_con">
				<view class="taxes_tit">
					<text>邮箱</text>
				</view>
				<view class="taxes_symbol">></view>
			</view>
			<view class="taxes_con">
				<view class="taxes_tit">
					<text>手机号</text>
				</view>
				<view class="taxes_symbol">></view>
			</view>
			<view class="taxes_con">
				<view class="taxes_tit">
					<text>修改密码</text>
				</view>
				<view class="taxes_symbol">></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:[],
				nickName:"",
			}
		},
		onLoad:function(){
			var _self = this;
			uni.getStorage({
				key:"userInfo",
				success:function(res){
					this.userInfo = res.data;
					console.log(this.userInfo);
					this.nickName = res.data.nick_name
				},
			})
			this.getUserInfo();
		},
		methods: {
			getUserInfo(){
				this.nickName = this.userInfo.nick_name ? this.userInfo.nick_name : '';
			},
			getImg(){
				var ImgSrc = "";
				if (this.userInfo.length >=1) {
					ImgSrc = userInfo.img
				}
				if (ImgSrc == null || ImgSrc == "" ) {
					return "../../static/img/base/default.png";
				}
				if (ImgSrc.substr(0,4) == "http") {
					return ImgSrc;
				} else if (ImgSrc.substr(0,1) == "/") {
					return this.baseUrl+`${ImgSrc}`;
				} else {
					return this.baseUrl+`/${ImgSrc}`;
				}
			},
		}
	}
</script>

<style>
	@import url("./css/edit.css");
</style>
