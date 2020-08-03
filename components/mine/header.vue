<template>
	<view>
		<view class="nav">
			<view @click="attention">
				<image src="../../static/img/mine/heart.png"></image>
				<text>我的关注</text>
			</view>
			<view @click="reserve">
				<image src="../../static/img/mine/order.png"></image>
				<text>预约清单</text>
			</view>
			<view @click="trust">
				<image src="../../static/img/mine/trust.png"></image>
				<text>我的委托</text>
			</view>
			<!-- <view>
				<image src="../../static/img/mine/made.png"></image>
				
				<text>我的定制</text>
			</view> -->
		</view>
	</view>
</template>

<script>
	var _self;
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			trust(){
				this.isLogin("/pages/mine/attention")
			},
			reserve(){
				this.isLogin("/pages/mine/subscribe")
			},
			attention(){
				this.isLogin("/pages/mine/attention")
			},
			isLogin(url){
				_self = this;
				uni.getStorage({
					key:_self.fun.userInfo,
					success:function(res){
						uni.navigateTo({
							url:url
						})
					},
					fail:function(){
						uni.showToast({
							icon:'none',
							title:'请登录',
							duration:3000
						})
						return false;
					}
				})
			}
		}
	}
</script>

<style>
	.nav{
		display: flex;
		justify-content: space-between;
		padding: 0 30upx;
		margin-top: 68upx;
		margin-bottom: 39upx;
	}
	.nav view{
		width: 25%;
		text-align: center;
	}
	.nav view text{
		display: block;
		font-size:28upx;
		font-family:PingFang SC;
		font-weight:500;
		color:#666;
		line-height:60upx;
	}
	.nav image{
		width: 60upx;
		height: 60upx;
	}
</style>
