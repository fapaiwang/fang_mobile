<template>
	<view>
		<view class="avatar" @click="avatar">
			<image class="avatar_img" :src="getImg('')"></image>
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
				key:_self.fun.userInfo,
				success:function(res){
					console.log(111,res.data)
					_self.userInfo = res.data;
					_self.phone = res.data.mobile;
					_self.nickName = res.data.nick_name;
					_self.userId = res.data.id;
				},
			})
			this.getUserInfo();
		},
		methods: {
			avatar(){
				var _self = this;
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function (res) {
						// _self.fun.getReq(_self.baseUrl+"/api/upload_avatar").then((res)=>{
						// 	console.log(res[1],22)
						// })
						//
						_self.getImg("blob:https://localhost:8081/e5432fcf-8d5b-4c55-beb1-439ec89f52b9")
						console.log(res.tempFiles[0]);
					}
				})
			},
			getUserInfo(){
				this.nickName = this.userInfo.nick_name ? this.userInfo.nick_name : '';
			},
			getImg(imgSrc){
				var _img = "";
				if (this.userInfo.length >=1) {
					_img = userInfo.img
				} else if (imgSrc == "") {
					return "../../static/img/base/default_avatar.png";
				} else {
					_img = imgSrc
				}
				return this.fun.getImgSrc(_img);
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
							key:_self.fun.userInfo,
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
