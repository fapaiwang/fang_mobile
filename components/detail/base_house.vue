<template>
	<view>
		<view class="base_house_con">
			<view class="share_tag">
				<view class="tagList">
					<view class="house_tag">
						<block v-for="(tagName,tagKey) in detial.house_tag" :key="tagKey">
							<text v-if="tagName != '' ">{{tagName}}</text>
						</block>
					</view>
				</view>
				<view class="share">
					<view class="shareJoin" @click="join">
						<image :src="isJoin ==1 ? '../../static/img/community/xin.png' : '../../static/img/community/join.png'" class="joinImg"></image>
						<text class="joinText">关注</text>
					</view>
					<view class="shareJoin" @click="share">
						<image src="../../static/img/community/share.png" class="joinImg"></image>
						<text class="joinText">分享</text>
					</view>
				</view>
			</view>
			<view class="house_tit">
				<text>{{houseTit}}</text>
			</view>
			<view class="price">
				<view class="start">
					<text>起拍价：</text>
					<text class="sTime">{{detial.qipai}}万</text>
				</view>
				<view class="market">
					<text>市场价：</text>
					<text class="sTime">{{detial.price}}万</text>
				</view>
			</view>
			<view class="Violation">
				<view class="people">
					<view class="join">
						<text class="sTime">{{bmrs ? detial.bmrs == "" ? 0 :detial.bmrs : '*'}}</text>
						人报名
						</view>
					<view>
						<text class="sTime">{{detial.weiguan}}</text>人围观
					</view>
				</view>
				<view class="people">
					<text class="sTime">房源点评</text>
				</view>
			</view>
		</view>
		<view class="countdown">
			<view class="start_time">
				开拍截止倒计时：<text class="sTime">{{countDownList}}</text>
			</view>
			<view class="look">
				<image src="../../static/img/community/ling.png" class="look_img"></image>预约查看
			</view>
		</view>
		<view class="base_house_con">	
			<view class="house_base">
				<view class="house_base_top">
					<view>{{detial.toilet}}</view>
					<view>{{detial.orientations}}</view>
					<view>{{detial.acreage}}</view>
				</view>
				<view class="house_base_bottom">
					<view>{{detial.floor}}层/共{{detial.total_floor}}层</view>
					<view>{{houseType}}</view>
					<view>{{buildYear}}年</view>
				</view>
			</view>
			<view class="auction_info">
				<view class="auction_info_l">
					<view>拍卖形式：<text>{{detial.jieduan_name}}</text></view>
					<view class="bianhao">拍卖编号：<text>{{detial.bianhao}}</text></view>
					<view>小区名称：<text>{{communityName}}</text></view>
				</view>
				<view class="auction_info_r">
					<view>保证金：<text>{{detial.baozheng}}万</text></view>
					<view>拍卖阶段：<text>{{detial.jieduan_name}}</text></view>
				</view>
			</view>
			
			<view class="featuredtTitleView">
				<view class="titleText" @click="getOther(detial.id)">
					<view>其他：<text class="desc">产权号、土地证、欠费...</text></view>
				</view>
				<view class="tieleImg">
						>
				</view>
			</view>
			<view class="featuredtTitleView" @click="taxes(detial.id,detial.qipai)">
				<view class="titleText">
					<view>税费：<text class="desc">产权号、土地证、欠费......</text></view>
				</view>
				<view class="tieleImg">
					>
				</view>
			</view>
			<view class="featuredtTitleView">
				<view class="titleText">
					<view>开拍时间：<text class="sTime">{{detial.kptime}}</text></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var _self;
	export default {
		name: "baseHouse",
		props: ["detial","houseType","buildYear","houseTit","communityName","countDownList"],
		data() {
			return {
				bmrs:false,
				uuid:-1,
				isJoin:0,
			};
		},
		created:function(){
			_self = this;
			uni.getStorage({
				key:"userInfo",
				success:function(res){
					_self.uuid = res.data.id;
					_self.bmrs = true;
				},
				fail:function(){
					_self.bmrs = false;
				}
			})
		},
		methods:{
			getOther(id) {
				this.fun.navTo(`/pages/detail/other?id=${id}`);
			},
			taxes(id,price) {
				this.fun.navTo(`/pages/detail/taxes?id=${id}&qp=${price}`);
			},
			join(){//关注
				if (this.uuid != -1) {
					let _param = {
						"house_id":this.detial.id,
						"model":"second_house",
						"user_id":this.uuid,
					}
					this.fun.getReq(this.baseUrl+'/api/follow',_param)
					.then((res)=>{
						this.isJoin = res[1].data.status;
						this.fun.showMsg(res[1].data.msg);
					})
				} else {
					this.fun.navTo('/pages/login/login');
				}
			},
			share(){
				uni.share({
					provider:uni.getProvider({
						service:'oauth',
						success:function(res){
							console.log(res.provider)
						}
					}),
					type:0,
					title:houseTit,
					summary:houseTit,
					href:this.baseUrl+"/",
				})
			}
		}
	}
</script>

<style scoped>
@import url("./css/base_house.css");
</style>