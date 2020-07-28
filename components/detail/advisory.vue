<template>
	<view class="advisory_warp">
		<view class="consultant">
			<view class="consultant_l">
				<view class="avatar">
					<image :src="getImgUrl(detial.broker_id)"></image>
				</view>
				<view class="persion">
					<text class="persion_name">{{advisoryName}}</text>
					<view class="work">法拍经验：<text class="work_year">6年</text></view>
				</view>
			</view>
			<view class="consultant_r">
				<text class="online">在线咨询</text>
				<text class="tel" @tap='call(detial.pinglun.mobile)'>电话咨询</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		name: "advisory",
		props: ["detial", "advisoryName"],
		data(){
			return {
				
			}
		},
		methods:{
			call(phone){
				uni.makePhoneCall({
					phoneNumber:'phone'
				})
			},
			getImgUrl(icon){
			   return `https://www.fangpaiwang.com/uploads/avatar/${icon}/avatar.jpg`;
			},
		}
	}
</script>

<style scoped>
	.advisory_warp{
		width:100%;
		height:138upx;
		background:#fff;
		box-shadow:0upx 1upx 8upx 0upx #231815;
		display: flex;
		flex-wrap: row wrap;
		justify-content: space-around;
	}
	.consultant{
		width: 90%;
		display: flex;
		justify-content: space-between;
		flex-flow: row wrap;
	}
	.consultant_r{
		display: flex;
		margin-top: 8px;
	}
	.consultant_r text{
		border-radius:10upx;
		margin-top: 19upx;
		font-size:28upx;
		color: #FFF;
		line-height: 70upx;
		text-align: center;
		padding: 0 17upx;
		display: inline-table;
	}
	.online{
		background:#78AEE8;
	}
	.tel{
		background:#DE4C47;
	}
	.consultant_l{
		display: flex;
		margin-top: 19upx;
		flex-flow: row;
		justify-content: space-between;
	}
	.avatar image{
		width:100upx;
		height:100upx;
		background:#F1F1F1;
		border-radius:50%;
	}
	.persion{
		margin-left: 18upx;
	}
	.persion_name{
		width: 100%;
		font-size:32upx;
		font-weight:bold;
		color:#333;
	}
	.work{
		font-size:22upx;
		font-weight:500;
		color:#666;
		line-height:60upx;
	}
	.tel {
	    margin-left: 5px;
	}
</style>
