<template>
	<view>
		<view class="avatar">
			<image class="avatar_img"></image>
		</view>
		<view class="editCon">
			<text class="alias">和太阳肩并肩～
				<image src="../../static/img/mine/edit.png" class="editImg"></image>
			</text>
		</view>
		<view class="taxes_warp">
			<view class="taxes_con">
				<view class="taxes_tit">
					<text>邮箱</text>
				</view>
				<view class="taxes_symbol">></view>
			</view>
			<view class="taxes_con">
				<view class="taxes_tit">
					<text>手机号</text>
				</view>
				<view class="taxes_symbol">></view>
			</view>
			<view class="taxes_con">
				<view class="taxes_tit">
					<text>修改密码</text>
				</view>
				<view class="taxes_symbol">></view>
			</view>
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

<style>
	.avatar{
		margin-top: 42upx;
		text-align: center;
		margin-bottom: 35upx;
	}
	.avatar_img{
		width:120upx;
		height:120upx;
		border-radius:50%;
		background: #ccc;
	}
	.editCon{
		text-align: center;
	}
	.alias{
		height:34upx;
		font-size:36upx;
		line-height: 34upx;
		font-family:PingFang SC;
		font-weight:800;
		color:#333;
	}
	.editImg{
		width: 36upx;
		height: 36upx;
	}
	.taxes_warp{
		padding: 0 30upx;
	}
	.taxes_con{
		display: flex;
		flex-flow: row wrap;
		justify-content: space-between;
		line-height: 98upx;
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:#333;
		border-bottom: 1px solid #EBEBEB;
	}
/* .taxes_tit {
    width: 61%;
} */

.taxes_tit text{
	height:27upx;
	font-size:28upx;
	font-family:PingFang SC;
	font-weight:500;
}
.taxes_symbol{
	font-size:28upx;
	font-family:PingFang SC;
	color:#999;
	width: 20%;
	text-align: right;
}
</style>
