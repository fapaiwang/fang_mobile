<template>
	<view>
		<view class="taxes_warp">
			<view class="taxes_con taxes_input">
				<view class="taxes_tit">
					<text>原密码</text>
				</view>
				<input type="text" class="input" v-model="oldpwd"/>
			</view>
			<view class="taxes_con taxes_input">
				<view class="taxes_tit">
					<text>新密码</text>
				</view>
				<input type="text" class="input" v-model="newpwd"/>
			</view>
			<view class="taxes_con taxes_input">
				<view class="taxes_tit">
					<text>确认密码</text>
				</view>
				<input type="text" class="input" v-model="newPwd"/>
			</view>
			<view class="logout" @click="edit">
				确定修改
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldpwd:"",
				newpwd:"",
				newPwd:'',
			}
		},
		methods: {
			edit(){
				if (this.oldpwd == ""){
					this.fun.showMsg("原始密码不能为空");
					return false;
				}
				if (this.newpwd == ""){
					this.fun.showMsg("新密码不能为空");
					return false;
				}
				if (this.newPwd == ""){
					this.fun.showMsg("确认密码不能为空");
					return false;
				}
				
				if (this.newPwd != this.newpwd) {
					this.fun.showMsg("两次密码不一致");
					return false;
				}
				
				let _param = {
					"oldpwd" : this.oldpwd
				}
				this.fun.getReq(this.baseUrl+"");
			}
		}
	}
</script>

<style scoped>
@import url("./css/edit.css");
</style>
