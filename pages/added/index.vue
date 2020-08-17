<template class="template_body">
	<view>
		 <!-- class="bg" -->
		<!-- <image src="../../static/img/base/bg.png" class="bgImg"></image> -->
		<!-- <image src="../../static/img/base/client_entrustment_top.png" class="bgImg"></image> -->
		<!-- <text class="desc">程序猿小哥哥正在开发~</text> -->
		<view class="template_form">
			<text class="template_form_name">
				<input placeholder="请输入您的姓名" class="login_inp" v-model="phone"/>
			</text>
			<text class="template_form_mobile">
				<input placeholder="请输入您的联系电话" class="login_inp" v-model="phone"/>
			</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
.bg{
	/* width: 750upx; */
	/* height: 482upx; */
	left: 50%;
	top: 35%;
	position: absolute;
	display: inline-block;
	transform: translate(-50%,-50%);
}
.bgImg{
	width: 750upx;
	height: 4615upx;
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
.template_form{
	width: 100%;
	height: 504upx;
	background: #fcf3eb;
}
.template_form text input{
	/* font-size: 28upx; */
}
.login_inp{
	background:#FFFFFF;
	width: 690upx;
	height: 88upx;
	font-size: 28upx;
	line-height: 88upx;
		margin:49upx auto 30upx auto;
}
</style>
