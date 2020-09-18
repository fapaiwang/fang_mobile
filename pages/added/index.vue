<template class="template_body">
	<view class="bg">
		
		<!-- <image src="../../static/img/base/bg.png" class="bgImg"></image> -->
		<image src="../../static/img/base/client_entrustment_top.png" class="bgImg"></image>
		<!-- <text class="desc">程序猿小哥哥正在开发~</text> -->
		<view class="template_form">
			<image src="../../static/img/base/client_entrustment_middle.png" class="client_entrustment_middle"></image>
			<viwe class="template_form_name">
				<input placeholder="请输入您的姓名" class="login_inp" v-model="template_form_name_click"/>
			</viwe>
			<view class="template_form_mobile">
				<input placeholder="请输入您的联系电话"  class="login_inp" v-model="template_form_phone_click"/>
			</view>
			<view class="">
				<button class="template_form_button" @click="getButton">提交信息</button>
			</view>
			<image src="../../static/img/base/client_entrustment_tail.png" class="tailImg"></image>
		</view>
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				template_form_name_click: '',
				template_form_phone_click: "",
			}
		},
		methods: {
			getButton(){
				var _self = this;
				if (this.template_form_phone_click =="" || this.template_form_phone_click == undefined) {
					this.fun.showMsg("手机号码不正确");
					return false;
				}
				this.fun.getReq(this.baseUrl+'/api/attract_customers',{mobile:this.template_form_phone_click,user_name:this.template_form_name_click,source:3})
				.then((res)=>{
					console.log(res)
					if (Number(res[1].data.code) ==10000) {
						uni.setStorage({
							key:_self.fun.userInfo,
							data:res[1].data.data
						})
						console.log(res[1].data.msg);
						this.fun.showMsg(res[1].data.msg);
						uni.switchTab({
							// url:"/pages/index/index"
						})
					} else {
						this.fun.showMsg(res[1].data.msg);
						return false;
					}
				})
			},
		}
	}
</script>

<style scoped>
	@import url("./css/index.css");
.bg{
	position: relative;
	height: 100%;
	overflow: hidden;
	background: linear-gradient(180deg, #e72603, #F05539);
}
.bgImg{
	width: 750upx;
	height: 500upx;
	/* display:block */
	vertical-align:bottom;
}
.desc{
	width:100%;
	height:35upx;
	font-size:36upx;
	font-family:Adobe Heiti Std;
	font-weight:normal;
	color:rgba(51,51,51,1);
	line-height:38upx;
	text-align: center;
	justify-content: center;
	display: block;
	margin-top: 63upx;
}

</style>
