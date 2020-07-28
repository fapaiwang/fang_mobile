<template>
	<view>
		<view class="login_input">
			<view class="login_img">
				<image src="../../static/img/login/fork.png"></image>
			</view>
			<input placeholder="设置新密码(最少6位，数字+字母)" class="login_inp" v-model="passworld" @input="onInput"/>
		</view>
		<view class="login_input">
			<view class="login_img">
				<image src="../../static/img/login/fork.png"></image>
			</view>
			<input placeholder="确认新密码(最少6位，数字+字母)" class="login_inp " v-model="newpassworld" @input="onInput"/>
		</view>
	</view>
</template>

<script>
	export default {
		props:["pwd","newpwd"],
		data() {
			return {
				passworld:'',
				newpassworld:''
			}
		},
		methods: {
			onInput(){
				this.$emit("update:pwd",this.passworld)
				this.$emit("update:newpwd",this.newpassworld)
			}
		}
	}
</script>

<style scoped>
 @import url("../../common/css/login/login.css");
</style>
