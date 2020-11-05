<template>
	<view class="fang_double">
		<view class="fang_header">
			<view class="fang_header_one">
				<view class="fang_sociology_house">
					<image src="../../static/img/landing_page/wuguize.png" alt="标题配图">
						<text class="fang_sociology_house_title">劲爆好房 1折起拍</text>
						<!-- <image src="../../static/img/base/close.png"> -->
						<image src="../../static/img/landing_page/wuguize.png" alt="标题配图">
				</view>
			</view>
			<view class="fang_sociology" style="margin-top: 33upx;">
				<view class="fang_sociology_title">
					<text>社会委托嗨拍购</text>
				</view>
				<view class="fang_sociology_house_list">
					<view class="fang_sociology_house_1" style="padding-top: 20upx;">
						<navigator :url="getDetail(4499)">
							<view class="fang_sociology_house_list_box">
								<image src="../../static/img/landing_page/house_01.jpg"></image>
								<view class="text_center">经济技术开发区 富园东里二区</view>
								<view class="text_center" style="margin-top: 10upx;">起拍价 ¥69.00万</view>
							</view>
						</navigator>
						<navigator :url="getDetail(5484)">
							<view class="fang_sociology_house_list_box" style="margin-left: 14upx;">
								<image src="../../static/img/landing_page/house_02.jpg">
									<view class="text_center">大兴区 新安里5号楼5层5-502</view>
									<view class="text_center" style="margin-top: 10upx;">起拍价 ¥26.50万</view>
							</view>
						</navigator>
					</view>
				</view>
			</view>
		</view>
		<view class="fang_content">
					<!-- <view  v-for="(item,index) in tabList" :key="index" :id="index" :class="index === TabCur ? 'text-red' : '' " @tap="tabChange(index,$event)"> -->
					<!-- <view :class="{'text-rad': index === TabCur}" :key="index" :id="index" @tap="tabChange(index,$event)"> -->
			<view class="selectItem">
				<scroll-view class="scv" scroll-x="true" scroll-with-animation="true" :scroll-left="scrollLeft">
					<view  v-for="(item,index) in tabList" :key="index" :id="index" :class="{'text-red': index === TabCur}" @tap="tabChange(index,$event)">
						{{item.name}}
					</view>
				</scroll-view>
			</view>
			<view class="quickTab">
				<view class="selectHouse">
					<swiper class="quickTabSwiper" :current="TabCur" duration="300">
						<block v-for="(item, index) in tabList" :key="index">
							<!-- <view style="height: 100upx;">{{item.name}}211</view> -->
							<swiper-item class="quickTabSwiperItem"  @touchend="wocao(item.name, index)">
								<block v-for="(housItem, indexs) in item.img" :key="indexs" >
									<navigator :url="getDetail(housItem.id)" class="quickTabItemView">
									
										<div class="quickTabItem" >
											<image class="quickTabImg" :src="getImg(housItem.img)" mode="heightFix" ></image>
											<view class="select_House_title">
												  
												<text>{{housItem.title}}</text>
											</view>
											<view class="select_House_qipai">
												<text>起拍价 ¥{{housItem.qipai}}万</text>
											</view>
											<view class="select_House_button">
												查看性情 >
											</view>
										</div>
									</navigator>
								</block>
							</swiper-item>

						</block>

					</swiper>
				</view>
				<view class="fang_all_house" @click="goHouseList">
					<text>查看更多</text>
				</view>
			</view>
			<view class="fang_content_headline">
				<view class="fang_sociology_house">
					<image src="../../static/img/landing_page/wuguize.png" alt="标题配图">
						<text class="fang_sociology_house_title">劲心守护 千例成交</text>
						<!-- <image src="../../static/img/base/close.png"> -->
						<image src="../../static/img/landing_page/wuguize.png" alt="标题配图">
				</view>
			</view>
			<view class="fang_sociology">
				<view class="fang_sociology_title_two">
					<text>最好的品牌是客户的口碑</text>
				</view>
				<view class="fang_deal_story">
					<view class="fang_deal_story_li">
						<image :src="getImg('/uploads/article/20200928/df64e0a5e4ab366e4d691522b0a43b6c.png')"></image>
						<view class="fang_deal_story_li_title">
							<text>中海九号公馆</text>
						</view>
						<view class="fang_deal_story_li_discount">
							低于市场价 <text>107</text>万
						</view>
					</view>
					<view class="fang_deal_story_li">
						<image :src="getImg('/uploads/article/20200927/67b817b240fc499126df9f62193a5ffb.png')"></image>
						<view class="fang_deal_story_li_title">
							<text>朝阳区国奥村</text>
						</view>
						<view class="fang_deal_story_li_discount">
							低于市场价 <text>107</text>万
						</view>
					</view>
					<view class="fang_deal_story_li">
						<image :src="getImg('/uploads/article/20200811/d48a5652e623ae8d76802a689a6a0430.jpg')"></image>
						<view class="fang_deal_story_li_title">
							<text>丰台文体路甲3号院</text>
						</view>
						<view class="fang_deal_story_li_discount">
							低于市场价 <text>135</text>万
						</view>
					</view>
					<view class="fang_deal_story_li">
						<image :src="getImg('/uploads/article/20200807/8608a239671f9f1a82c73c09bf44405c.png')"></image>
						<view class="fang_deal_story_li_title">
							<text>徜徉嘉园</text>
						</view>
						<view class="fang_deal_story_li_discount">
							低于市场价 <text>73</text>万
						</view>
					</view>

					<view class="fang_deal_story_li">
						<image :src="getImg('/uploads/article/20200730/74fe483b21317c376fa9e099f472cdbf.png')"></image>
						<view class="fang_deal_story_li_title">
							<text>珠江骏景北区</text>
						</view>
						<view class="fang_deal_story_li_discount">
							低于市场价 <text>165</text>万
						</view>
					</view>
					<view class="fang_deal_story_li">
						<image :src="getImg('/uploads/article/20200730/85da893121b4c4d8479fc0c12e70ed84.png')"></image>
						<view class="fang_deal_story_li_title">
							<text>山水汇豪苑</text>
						</view>
						<view class="fang_deal_story_li_discount">
							低于市场价 <text>17.4</text>万
						</view>
					</view>
				</view>

			</view>

			<view class="fang_content_headline">
				<view class="fang_sociology_house">
					<image src="../../static/img/landing_page/wuguize.png" alt="标题配图">
						<text class="fang_sociology_house_title">劲拍保障 资深团队</text>
						<!-- <image src="../../static/img/base/close.png"> -->
						<image src="../../static/img/landing_page/wuguize.png" alt="标题配图">
				</view>
			</view>
			<scroll-view class="scv1" scroll-x="true" scroll-with-animation="true">
				<view class="fang_team">
					<image :src="getImg('/homeStatic/img/manager/落地页_首页_18的副本.jpg')"></image>
					<br>
					<view class="fang_team_staff">
						<text>刘经理</text>
					</view>
					<br>
					<view class="fang_team_work_years">
						<text>6年行业经验</text>
					</view>
				</view>
				<view class="fang_team">
					<image :src="getImg('/homeStatic/img/manager/落地页_首页_18.jpg')"></image> <br>
					<view class="fang_team_staff">
						<text>马经理</text>
					</view><br>
					<view class="fang_team_work_years">
						<text>3年行业经验</text>
					</view>
				</view>
				<view class="fang_team">
					<image :src="getImg('/homeStatic/img/manager/落地页_首页_12的副本.jpg')"></image>
					<br>
					<view class="fang_team_staff">
						<text>魏经理</text>
					</view>
					<br>
					<view class="fang_team_work_years">
						<text>3年行业经验</text>
					</view>
				</view>
				<view class="fang_team">
					<image :src="getImg('/homeStatic/img/manager/落地页_首页_15的副本.jpg')"></image>
					<br>
					<view class="fang_team_staff">
						<text>梁经理</text>
					</view><br>
					<view class="fang_team_work_years">
						<text>3年行业经验</text>
					</view>
				</view>
				<view class="fang_team">
					<image :src="getImg('/homeStatic/img/manager/落地页_首页_15.jpg')"></image>
					<br>
					<view class="fang_team_staff">
						<text>田经理</text>
					</view>
					<br>
					<view class="fang_team_work_years">
						<text>2年行业经验</text>
					</view>
				</view>
				<view class="fang_team">
					<image :src="getImg('/homeStatic/img/manager/落地页_首页_12.jpg')"></image>
					<br>
					<view class="fang_team_staff">
						<text>张经理</text>
					</view>
					<br>
					<view class="fang_team_work_years">
						<text>5年行业经验</text>
					</view>
				</view>
			</scroll-view>

			<view class="fang_content_headline">
				<view class="fang_sociology_house">
					<image src="../../static/img/landing_page/wuguize.png" alt="标题配图">
						<text class="fang_sociology_house_title">劲劲享服务 安心入住</text>
						<image src="../../static/img/landing_page/wuguize.png" alt="标题配图">
				</view>
			</view>

			<view class="fang_service">
				<view class="fang_service_list">
					<image src="../../static/img/landing_page/service1.png" alt="咨询调查 风险评估">
						<view><text>咨询调查</text></view>
						<view><text>风险评估</text></view>
				</view>
				<view class="fang_service_list">
					<image src="../../static/img/landing_page/service3.png" alt="陪同客户 了解房源">
						<view><text>陪同客户</text></view>
						<view><text>了解房源</text></view>
				</view>
				<view class="fang_service_list">
					<image src="../../static/img/landing_page/service2.png" alt="签署委托 竞拍协议">
						<view><text>签署委托</text></view>
						<view><text>竞拍协议</text></view>
				</view>
				<view class="fang_service_list">
					<image src="../../static/img/landing_page/service6.png" alt="竞拍报名 付保证金">
						<view><text>竞拍报名</text></view>
						<view><text>付保证金</text></view>
				</view>
				<view class="fang_service_list">
					<image src="../../static/img/landing_page/service5.png" alt="参加竞拍 委托出价">
						<view><text>参加竞拍</text></view>
						<view><text>委托出价</text></view>
				</view>
				<view class="fang_service_list">
					<image src="../../static/img/landing_page/service4.png" alt="竞拍成功 领取文书">
						<view><text>竞拍成功</text></view>
						<view><text>领取文书</text></view>
				</view>
				<view class="fang_service_list">
					<image src="../../static/img/landing_page/service7.png" alt="交税过户 物业交接">
						<view><text>交税过户</text></view>
						<view><text>物业交接</text></view>
				</view>
				<view class="fang_service_list">
					<image src="../../static/img/landing_page/service8.png" alt="房拍网 让您安心拍房">
						<view><text>房拍网</text></view>
						<view><text>让您安心拍房</text></view>
				</view>
			</view>
		</view>
		<view class="fang_footer">
			<view class="fang_footer_topping" @click="goHeaderClick">
				<image src="../../static/img/landing_page/zhiding.png"></image>
				<text>返回顶部</text>
			</view>
			<view class="fang_footer_mobile">
					
				<view class="fang_footer_mobile_cs" @tap="call('4006770028')">
					<image src="../../static/img/landing_page/Telephone.png"></image>
					<text>拨打电话</text>
				</view>
			</view>
			<view class="fang_footer_chat" @tap="online">
				<text>在线咨询</text>
				
			</view>
		</view>

	</view>
</template>

<script>

	export default {
		data() {
			return {
				tabList: [],
				TabCur: 0,
				selectType: "精品自由购",
				add_class:""
			}
		},
		computed: {
			scrollLeft() {
				return (this.TabCur - 1) * 60;
			}
		},
		created: function() {
			this.getCombinedResources();
		},
		methods: {
			getImg(ImgSrc) {
				return this.fun.getImgSrc(ImgSrc);
			},
			tabChange(index) {
				this.TabCur = index;
				console.log(this.TabCur)
			},
			getCombinedResources() { //为你选房
				this.fun.getReq(this.baseUrl + "/api/second/characteristic_house_two").then((res) => {
					this.tabList = res[1].data.data
				});
			},
			getImg(ImgSrc) {
				return this.fun.getImgSrc(ImgSrc);
			},
			getDetail(id) { //详情页面
				return `/pages/detail/index?id=${id}`;
			},
			goHeaderClick: function() {
				uni.pageScrollTo({ //置顶
					scrollTop: 0,
					duration: 300
				});
			},
			online() {
				//#ifndef H5
				uni.switchTab({
					url: "/pages/customer/customer"
				})
				//#endif
				//#ifdef H5
				openJesongChatByGroup(11122, 26881);
				//#endif

				//#ifdef MP-WEIXIN
				openJesongChatByGroup(11122, 26881);
				//#endif
			},
			call(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				})
			},
			goHouseList() {
				uni.switchTab({
					url:"/pages/focus/index",
				})
			},
			wocao(itemName, index){
				console.log(itemName)
				var currenIndex = index+1
				    this.selectType = this.tabList[index].name;
				    this.TabCur = currenIndex > this.tabList.length ? index : currenIndex
			},
		}
	}
</script>

<style scoped>
	@import url("./css/fire.css");
</style>
