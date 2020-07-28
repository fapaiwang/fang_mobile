<template>
	<view>
		<view class="banner">
			<image :src="imgSrc" mode="" class="swiper-item"></image>
		</view>
		<view class="desc_con">
			{{con}}
		</view>
		<view class="recommendHouseTitleItem">
			为您推荐
		</view>
		<view class="house_list">
			<block v-for="(housItem, indexs) in houseData" :key="indexs">
				<navigator :url="detail(housItem.id)" class="quickTabSwiperItem">
				<view class="houseItemView">
					<view class="houseItemImg">
						<image :src="getImgUrl(housItem.img)" mode=""></image>
					</view>
					<view class="houseItem">
						<view class="itemTitle">
							<text>{{housItem.title}}</text>
						</view>
						<view class="itemInfo">
							<text>{{`${housItem.room}室${housItem.living_room}厅 | ${housItem.acreage}㎡ | ${housItem.orientations} | ${housItem.toilet}`}}</text>
						</view>
						<view class="itemPrice">
							<view>
								<text>起拍价</text>
								<text class="redPrice">{{housItem.qipai}}万</text>
							</view>
							<view>
								<text>市场价</text>
								<text class="grayPrice">{{housItem.toilet}}万</text>
							</view>
						</view>
						<view class="createIime">
							<view class="createIimeIcon">
								<image src="../../static/img/home/item@2x.png" mode=""></image>
							</view>
							<view class="createIimeIconinfo">
								<text>
									开拍时间：{{housItem.kptime}}
								</text>
							</view>
						</view>
					</view>
				</view>
				</navigator>
			</block>
		</view>
	</view>
</template>

<script>
	var _self;
	export default {
		data() {
			return {
				imgSrc:'',
				houseData:[],
				con:'',
			}
		},
		onLoad:function(e){
			_self = this;
			this.getRes(e.tit);
			this.getList(e.id);
			uni.setNavigationBarTitle({
				title:e.tit
			})
		},
		methods: {
			getRes(tit){
				this.fun.getReq(this.baseUrl+'/api/second/characteristic_house_info',{name:tit}).then((res)=>{
					if (res[1].data.data !=null) {
						_self.con = res[1].data.data.info;
						_self.imgSrc = this.getImgUrl(res[1].data.data.img);
					}
				})
			},
			getList(param){
				this.fun.getReq(this.baseUrl+'/api/second/houseList',{a:param}).then((res)=>{
					_self.houseData = res[1].data.data.lists.data;
				})
			},
			getImgUrl(ImgSrc){
				if (ImgSrc == null || ImgSrc == "" ) {
					return "../../static/img/base/default.png";
				}
				if (ImgSrc.substr(0,4) == "http") {
					return ImgSrc;
				} else if (ImgSrc.substr(0,1) == "/") {
					return this.baseUrl+`${ImgSrc}`;
				} else {
					return this.baseUrl+`/${ImgSrc}`;
				}
			},
			detail(index){
				return '/pages/detail/index?id='+index;
			},
		}
	}
</script>

<style scoped>
	.desc_con{
		padding: 0 30upx;
		font-size:32upx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:60upx;
		margin-bottom: 87upx;
		margin-top: 39upx;
	}
	.house_list{
		padding: 0 30upx;
	}
	.houseItemView {
		display: flex;
		height: 280upx;
		flex-direction: row;
	}
	.houseItemImg {
		width: 240upx;
		height: 149upx;
		border-radius:10upx;
	}
	.houseItemImg image {
		width: 100%;
		height: 100%;
	}
	.houseItem {
		flex: 1;
		margin-left: 25upx;
	}
	.itemTitle{
		height:80upx;
		font-size:30upx;
		font-family:PingFang SC;
		font-weight:bold;
		color:#333;
		overflow: hidden;
		text-overflow: ellipsis;
		display:-webkit-box; //作为弹性伸缩盒子模型显示。
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2;
	}
	.itemInfo {
		font-size: 24upx;
		color: #666;
		margin: 3upx 0;
	}
	.itemPrice {
		display: flex;
		flex-direction: row;
		color: #333333;
		justify-content: space-between;
		font-size: 20upx;
	}
	.redPrice {
		margin-left: 10upx;
		color: #E02E24;
		font-size: 26upx;
	}
	.grayPrice {
		margin-left: 10upx;
		color: #333;
		font-size: 26upx;
	}
	.createIime {
		margin-top: 20upx;
		background:rgba(199,49,38, 0.15);
		/* opacity:0.06; */
		border-radius: 10upx;
		display: flex;
		flex-direction: row;
		text-align: center;
		height: 44upx;
	},
	.createIimeIcon{
		width: 24upx;
		height: 24upx;
		margin: 10upx 0 7upx 9upx;
	}
	.createIimeIcon image {
		width: 24upx;
		height: 24upx;
		float: left;
	}
	.createIimeIconinfo {
		font-size: 26upx;
		color: #E02E24;
		line-height: 44upx;
	}
	.banner{
		width: 100%;
		height: 350upx;
	}
	.swiper-item{
		width: 100%;
		height: 100%
	}
	.recommendHouseTitleItem{
		width:100%;
		height:34upx;
		font-size:36upx;
		font-family:PingFang SC;
		font-weight:800;
		color:rgba(51,51,51,1);
		line-height:34upx;
		margin-bottom: 40upx;
		margin-top: 87upx;
		padding: 0 30upx;
	}
</style>