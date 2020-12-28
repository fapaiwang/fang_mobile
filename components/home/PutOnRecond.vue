<template>
	<view class="fang_put_re_code">
		<view class="jing_icp" style="line-height: 48upx;">
			<text v-if="hostname != -1">
				北京金铂顺昌网络科技有限公司 版权所有 京ICP备19016489号
			</text>
			<text v-else>
				北京金铂顺昌拍卖有限公司 版权所有 京ICP备20029293号
			</text>
		</view>
		<view class="jing_gongan">
			<text  v-if="hostname != -1">
				京公网安备 11010102004250号
			</text>
			<text v-else>
				京公网安备 11010102004250号
			</text>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				hostname:'',
			}
		},
		props:[
			'server_addr'
		],
		created() {
		    console.log("123456")  
		this.getHostName();
		},
		methods: {
			getHostName(){
				this.hostname = document.domain.indexOf('108');
			}
		},
	}
</script>
		
<style scoped>
	.fang_put_re_code{
		width: 100%;
		height: 100upx;
		background-color: #3B3B3B;
		color: #999999;
		font-size: 18upx;
		
		font-weight: 400;
		text-align: center;
	}
	.jing_icp{
		display: inline-block;
		margin-top: 10upx;
	}
</style>
