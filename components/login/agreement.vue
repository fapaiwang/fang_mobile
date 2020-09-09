<template>
	<view>
		<view class="login_txt">
			<checkbox class="agree_cc" @click="agreeAgee"></checkbox>
			<text>我已阅读并同意</text>
			<text class="redF" @click="pact">《房拍网用户协议》</text>
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
				console.log(this.isShow);
				
				if (this.isShow) {
					   console.log(12431243); 
					this.isShow = false;
				} else {
					
					uni.showModal({ title: '房拍网用户协议',
					    content: '请你务必审核阅读，充分理解"房拍网用户协议"各条款，包括但不限于:为了向你提供内容分享等服务。我们需要手机你的设备信息，操作日志等个人信息。你可以在"设置"中查看，变更，删除个人信息并管理你的授权。你可以阅读"《房拍网用户协议》"了解详情,如你同意，请点击"确定"开始接受我们的服务',
					    success: function (res) {
							if (res.confirm) {             
								console.log('用户点击确定');
                                this.isShow = true;
								uni.navigateTo({//跳转页面
									// url:"../index/index",
								})
							} else if (res.cancel) {             
								console.log('用户点击取消');
                                this.isShow = false;   
							}    
						},
					});
					console.log(5678956789); 
					this.isShow = true;
				}
				// 
				this.$emit("update:agree",this.isShow)
			},
			
			pact(){
				this.fun.navTo("/pages/login/pact");
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
