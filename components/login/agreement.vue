<template>
	<view>
		<view class="login_txt">
			<checkbox class="agree_cc" @click="agreeAgee"></checkbox>
			<text>我已阅读并同意</text>
			<text class="redF">《房拍网用户协议》</text>
		</view>
	</view>
</template>

<script>
	export default {
		props:["agree"],
		data() {
			return {
				isShow:false
			}
		},
		methods: {
			agreeAgee(){
				if (this.isShow) {
					this.isShow = false;
				} else {
					this.isShow = true;
				}
				this.$emit("update:agree",this.isShow)
			}
		}
	}
</script>

<style scoped>
	.login_txt{
		width: 90%;
		justify-content: space-between;
		margin: 0 auto;
		color: #666;
		font-size:24upx;
		font-family:PingFang SC;
		font-weight:500;
	}
	.redF{
		color: #E02E24 !important;
	}
	.agree_cc{
		transform:scale(0.5);
		color:#E02E24;
	}
</style>
