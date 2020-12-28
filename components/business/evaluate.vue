<template>
	<view class="evaluate_all">
		<view class="evaluate">
			<text class="evaluate_01">客户评价</text>
			<text class="evaluate_02">（5分|17人）</text>
			<image src="../../static/img/base/left@2x.png"></image>
			<text class="evaluate_03">查看全部</text>
		</view>
		<view class="evaluate_list">
			<view class="evaluate_head_portrait">
				<image src="../../static/img/base/left@2x.png"></image>
			</view>
			<view class="evaluate_list_info">
				<text class="evaluate_list_info_name">renming</text>
				<text class="evaluate_list_info_time">2020/08/25</text>
				<view class="evaluate_list_info_cotent">
					业	业务很熟练，讲解的也很耐心，最后买到了低于市场价100多万的房子   务很熟练，讲解的也很耐心，最后买到了低于市场价100多万的房子                          
				</view>
			</view>
			
		</view>
		<view class="evaluate_list">
			<view class="evaluate_head_portrait">
				<image src="../../static/img/base/left@2x.png"></image>
			</view>
			<view class="evaluate_list_info">
				<text class="evaluate_list_info_name">renming</text>
				<text class="evaluate_list_info_time">2020/08/25</text>
				<view class="evaluate_list_info_cotent">
					业	业务很熟练，讲解的也很耐心，最后买到了低于市场价100多万的房子   务很熟练，讲解的也很耐心，最后买到了低于市场价100多万的房子                          
				</view>
			</view>
			
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				server_addr:''
			}
		},
		created() {
			console.log(444);
			this.getHomeData()
		},
		methods: {
			getHomeData(){
				this.getServerAddr();
			},
			getAdminUserId(){
				console.log(222);
				
			},
			getServerAddr() {
				console.log(555);
				// this.baseUrl +/
				this.fun.getReq( 'http://fang.al/api/user/salesman_desc?user_id=776')
					.then((res) => {
						
						this.server_addr = res[1].data
					});
					console.log(66);
				console.log(this.server_addr);
			},
		}

	}
</script>

<style>
	@import url("./css/evaluate.css");
</style>
