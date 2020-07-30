<template>
	<view>
		<view class="header">
			<view class="header_login">
				<view class="avatar"><image mode=""></image></view>
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
</template>

<script>
	
	export default {
		data() {
			return {
				isShow:true,
			}
		},
		created() {
			this.getStore()
		},
		onLoad:function(){
			uni.$on("login",(val)=>{
				console.log(333,val);
			})
		},
		methods: {
			childMethod(val){
				this.isShow = val;
			},
			login(){
				uni.navigateTo({
					url:"../../pages/login/login"
				})
			},
			register(){
				uni.navigateTo({
					url:"../../pages/login/register"
				})
			},
			getStore(){
				var _self = this;
				uni.getStorage({
					key:"user",
					success:function(res){
						_self.isShow = false;
					},
					fail:function(){
						_self.isShow = true;
					}
				})
			}
		}
	}
</script>

<style scoped>
@import url("./css/header.css");
</style>
