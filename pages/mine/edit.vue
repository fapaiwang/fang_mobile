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
			<view class="taxes_con  taxes_input">
				<view class="taxes_tit">
					<text>邮箱</text>
				</view>
				<input type="text" class="input" v-model="email"/>
			</view>
			<view class="taxes_con taxes_input">
				<view class="taxes_tit">
					<text>手机号</text>
				</view>
				<input type="text" class="input" v-model="phone"/>
			</view>
			<view class="taxes_con" @click="changePwd">
				<view class="taxes_tit">
					<text>修改密码</text>
				</view>
				<view class="taxes_symbol">></view>
			</view>
			<view class="logout" @click="edit">
				确定修改
			</view>
		</view>
	</view>
</template>

<script>
	var _self;
	export default {
		data() {
			return {
				userInfo:[],
				nickName:"",
				phone:"",
				email:"没填写",
				userId:-1
			}
		},
		onLoad:function(){
			_self = this;
			uni.getStorage({
				key:"userInfo",
				success:function(res){
					_self.userInfo = res.data;
					_self.phone = res.data.mobile;
					_self.nickName = res.data.nick_name;
					_self.userId = res.data.id;
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
				return this.fun.getImgSrc(ImgSrc);
			},
			edit(){
				let _param = {
					"nick_name":this.nickName,
					"email" : this.email,
					"id" : this.userId
				}
				this.fun.getReq(this.baseUrl+'/api/save_user_info',_param).then((res)=>{
					if (res[1].data.code==10000) {
						uni.setStorage({
							key:"userInfo",
							data:res[1].data.data
						})
						uni.navigateBack({
							delta:1
						})
					} else {
						this.fun.showMsg(res[1].data.msg);
						return false;
					}
				})
			},
			changePwd(){
				this.fun.navTo("/pages/mine/password")
			}
		}
	}
</script>

<style>
	@import url("./css/edit.css");
</style>
