<template>
	<view v-if="detial">
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
						<image :src="isLike(detial.id)" class="joinImg"></image>
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
					<text v-if="detial.fcstatus== 175 ">成交价</text>
					<text v-if="detial.fcstatus!=175 ">起拍价</text>
					<text class="sTime" v-if="detial.fcstatus!=175 ">{{detial.qipai}}万</text>
					<text class="sTime" v-if="detial.fcstatus== 175 ">{{detial.cjprice}}万</text>
				</view>
				<view class="market">
					<text>市场价：</text>
					<text class="sTime">{{detial.price}}万</text>
				</view>
			</view>
			
			
			<view class="Violation">
				<view class="people" v-if="detial.fcstatus == 169 || detial.fcstatus == 170">
					<view class="join">
						<text class="sTime">{{bmrs ? detial.bmrs == "" ? 0 :detial.bmrs : '*'}}</text>
						人报名
						</view>
					<view>
						<text class="sTime">{{detial.weiguan}}</text>人围观
					</view>
				</view>
				<view class="people" @click="common()" v-if="mark && userRule==4">
					<text class="sTime">房源点评</text>
				</view>
			</view>
		</view>
		<view class="newsletters" v-if="detial.fcstatus == 171 || detial.fcstatus == 172 || detial.fcstatus == 173 || detial.fcstatus == 174 || detial.fcstatus == 175">
			<view class="house_status">
				<view class="house_status_title">
					<text>拍卖结束</text>
				</view>
			</view>
			<view class="newsletters_info">
				<text class="newsletters_info_one" v-if="detial.fcstatus == 171">拍卖已结束</text>
				<text class="newsletters_info_one" v-if="detial.fcstatus == 172">非常抱歉！拍卖已终止</text>
				<text class="newsletters_info_one" v-if="detial.fcstatus == 173">非常抱歉！拍卖已撤回</text>
				<text class="newsletters_info_one" v-if="detial.fcstatus == 174">非常抱歉！拍卖已暂缓</text>
				<text class="newsletters_info_one" v-if="detial.fcstatus == 175">拍卖已成交，标的物成功拍出</text>
				<text class="newsletters_info_two">\n  结束时间：{{detial.end_time}}　{{bmrs ? detial.bmrs == "" ? 0 :detial.bmrs : '*'}}人报名　{{detial.weiguan}}人围观</text>
			</view>
		</view>
		<view class="countdown">
			<view class="start_time">
				开拍截止倒计时：<text class="sTime">{{countDownList}}</text>
			</view>
			<view class="look" @click="look">
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
			<view class="fang_she_sign_up" v-if="detial.house_type == 48">
				<view class="fang_she_sign_up_describe">
					<image src="../../static/img/community/ling.png"></image>
					<text>立即报名 参与竞拍</text>
				</view>
				<view class="fang_she_sign_up_button" @click="sign_up(detial)">
					<text>立即报名</text>
				</view>
			</view>
			<view class="auction_info">
				<view class="auction_info_l">
					<view>拍卖形式：<text>{{detial.house_type_name}}</text></view>
					<view class="bianhao">拍卖编号：<text>{{detial.bianhao}}</text></view>
					<view>小区名称：<text>{{communityName}}</text></view>
				</view>
				<view class="auction_info_r">
					<view>保证金：<text>{{detial.baozheng}}万</text></view>
					<view>拍卖阶段：<text>{{detial.jieduan_name}}</text></view>
				</view>
			</view>
			
			<view class="featuredtTitleView" @click="getOther(detial.id)">
				<view class="titleText">
					<view>其他：<text class="desc">产权号、土地证、欠费...</text></view>
				</view>
				<view class="tieleImg">
						>
				</view>
			</view>
			<view class="featuredtTitleView" @click="taxes(detial.id,detial.qipai)">
				<view class="titleText">
					<view>税费：<text class="desc">税费计算、房贷计算、首付成数...</text></view>
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
		<view class="mark" v-if="mark && userRule==4">
			<view class="viewTxt">
				<view class="viewNavBar">
					<text class="dianpin">房源点评</text>
					<text @tap="close()">x</text>
				</view>
				<view class="viewArea">
					<textarea v-model="con"></textarea>
				</view>
				<button class="btn" @click="subCon">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	var _self;
	export default {
		name: "baseHouse",
		props: ["detial","houseType","buildYear","houseTit","communityName","countDownList","like"],
		data() {
			return {
				bmrs:false,
				uuid:-1,
				isJoin:-1,
				likeHouse:[],
				con:"",
				mark:false,
				userRule:-1,
			};
		},
		created:function(){
			_self = this;
			uni.getStorage({
				key:_self.fun.userInfo,
				success:function(res){
					_self.uuid = res.data.id;
					_self.userRule = Number(res.data.model);
					_self.bmrs = true;
				},
				fail:function(){
					_self.bmrs = false;
				}
			})
			
			uni.getStorage({
				key:_self.fun.likeHouse,
				success:function(ops){
					_self.likeHouse = ops.data;
				},
			})
		},
		methods:{
			common(){
				setTimeout(()=>{
					this.mark = true;
				},310);
			},
			subCon(){
				if (this.con == "") {
					this.fun.showMsg("点评内容不能为空");
					return false;
				}
				let _param = {
					"house_id":this.detial.id,
					"model":"second_house",
					"house_name":this.con,
					"broker_id":this.detial.broker_id,
					"user_id":this.uuid,
				}
				this.fun.getReq(this.baseUrl+"/api/second/house_comment_add",_param)
				.then((res)=>{
					setTimeout(()=>{
						this.con == "";
						this.mark = false;
					},310);
					this.fun.showMsg(res[1].data.msg);
				});
			},
			look(){
				if (this.uuid == -1) {
					this.fun.navTo("/pages/login/login");
				}
				let _param = {
					house_id:this.detial.id,
					model:'second_house',
					type:1,
					house_name:this.houseTit,
					broker_id:this.detial.broker_id,
					user_id:this.uuid,
				}
				var _self = this;
				this.fun.getReq(this.baseUrl+'/api/subscribe/save',_param).then((res)=>{
					_self.fun.showMsg(res[1].data.msg);
				})
			},
			sign_up(detial) {
				this.fun.navTo(`/pages/outside/outside?url=${detial.lianjie}&tit=${detial.title}`);
			},
			close(){
				this.con == "";
				this.mark = false;
			},
			isLike(id) {
				return this.likeHouse.indexOf(id) != -1 ? '../../static/img/community/xin.png' :  '../../static/img/community/join.png';
			},
			getOther(id) {
				if (this.uuid == -1) {
					this.fun.navTo("/pages/login/login");
				} else {
					this.fun.navTo(`/pages/detail/other?id=${id}`);
				}
			},
			taxes(id,price) {
				this.fun.navTo(`/pages/detail/taxes?id=${id}&qp=${price}`);
			},
			join(){
				var _self = this;
				if (this.uuid != -1) {
					var _houseId = this.detial.id;
					let _param = {
						"house_id":_houseId,
						"model":"second_house",
						"user_id":this.uuid,
					}
					this.fun.getReq(this.baseUrl+'/api/follow',_param)
					.then((res)=>{
						this.fun.showMsg(res[1].data.msg);
						if (res[1].data.status==1) {
							_self.likeHouse.push(_houseId)
						} else {
							_self.likeHouse.splice(_self.likeHouse.indexOf(_houseId), 1);
						}
						uni.setStorage({
							key:_self.fun.likeHouse,
							data:_self.likeHouse
						})
						_self.isJoin = res[1].data.status;
					})
				} else {
					this.fun.navTo('/pages/login/login');
				}
			},
			share(){
				uni.share({
					provider:"weixin",
					scene: "WXSceneSession",
					type:0,
					title:this.houseTit,
					summary:this.houseTit,
					imageUrl:this.fun.getImgSrc(this.detial.img),
					href:"/pages/detail/index?id="+this.detial.id,
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("fail1111:" + JSON.stringify(err));
					}
				})
			}
		}
	}
</script>

<style scoped>
@import url("./css/base_house.css");
.viewTxt{
	width: 90%;
	margin: 0 30upx;
	background: #fff;
	position: absolute;
	top: 40%;
}
.viewArea{
	border: 1upx solid #dcdcdc;
	height: 300upx;
	border-radius: 10upx;
	margin: 0 30upx 30upx 30upx;
}
.viewArea textarea{
	width: 95%;
	padding: 20upx 0 20upx;
	font-size: 30upx;
	line-height: 40upx;
}
.viewNavBar{
	display: flex;
	flex-flow: row wrap;
	justify-content: space-between;
}
.viewNavBar{
	margin: 30upx auto;
}
.viewNavBar text{
	font-size: 30upx;
	padding: 0 30upx;
}
.mark{
	background: rgba(0,0,0,0.5);
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1;
	height: 100%;
	overflow: hidden;
}
.btn{
	background: #CD3624;
	font-size: 24upx;
	color: #fff;
	width: 90%;
	margin-bottom: 30upx;
}
</style>