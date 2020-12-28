<template>
	<view>
		<TopNav></TopNav>
		<Head></Head>
		<scroll-view class="scv" scroll-x="true" scroll-with-animation="true">
			<view :class="index === TabCur ? selectClass + ' cur':''" v-for="(item,index) in tabList" :key="index" :id="index" @tap="tabChange(index,$event)">
				{{item.name}}
				<text class="scv_line"></text>
			</view>
		</scroll-view>
		<view class="selectHouse">
			<swiper class="quickTabSwiper" :current="TabCur" duration="300" @change="swiperChange">
				<swiper-item>
				  <Mobile :mobile.sync="phone" :code.sync="captcha" :cap.sync="cap"></Mobile>
				  <Agreement :agree.sync="isShow"></Agreement>
				  <button class="login_btn" @click="getLogin">立即登录1</button>
				</swiper-item>
				<swiper-item>
					<Mobile :mobile.sync="telphone" :code.sync="reigisterCode" :cap.sync="reigisterCap"></Mobile>
					<Password :pwd.sync="password" :newpwd.sync="newPasswd"></Password>
					<Agreement :agree.sync="isStatus"></Agreement>
					<button class="login_btn" @click="reigister">立即登录2</button>
				</swiper-item>	
			</swiper>
		</view>
		<Bottom></Bottom>
	</view>
</template>

<script>
	import TopNav from '@/components/login/topNav.vue';
	import Head from '@/components/login/head.vue';
	import Bottom from '@/components/login/footer.vue';
	import Mobile from '@/components/login/mobile.vue';
	import Password from '@/components/login/password.vue';
	import Agreement from '@/components/login/agreement.vue';
	
	export default {
		components:{
			TopNav,
			Head,
			Bottom,
			Mobile,
			Password,
			Agreement
		},
		props: {
			selectClass: {
			    type: String,
			    default() {
			        return 'text-red';
			    }
			},
		},
		data() {
			return {
				tabList:[{name: "快捷注册"}, {name:"密码注册"}],
				TabCur:0,
				captcha:'',
				cap:'',
				reigisterCode:'',
				reigisterCap:"",
				password:'',
				newPasswd:"",
				isShow: false,
				isStatus: false,
				phone:'',
				telphone:''
			}
		},
		methods: {
			tabChange(index) {
				this.TabCur = index;
			},
			swiperChange(e) {			
				var index=e.target.current || e.detail.current;
				this.TabCur = index;
			},
			getLogin() {//快捷注册
				if (this.phone =="") {
					this.fun.showMsg("手机号码不正确");
					return false
				}
				if (this.captcha =="") {
					this.fun.showMsg("验证码不能为空");
					return false
				}
				if (this.captcha != this.cap) {
					this.fun.showMsg("验证码不正确");
					return false
				}
				if (this.isShow !=true) {
					this.fun.showMsg("请阅读并勾选协议");
					return false
				}
				this.fun.getReq(this.baseUrl+'/api/registerDo',{mobile:this.phone,sms_code:this.captcha})
				.then((res)=>{
					if (res[1].data.code ==10000) {
						 uni.switchTab({
						 	url:"/pages/mine/mine",
						 })
					}else{
						this.fun.showMsg(res[1].data.msg);
						return false
					}
				}).catch((err)=>{
					this.fun.showMsg(err)
				})
			},
			reigister() {//密码注册
				if (this.telphone =="") {
					this.fun.showMsg("手机号码不正确");
					return false
				}
				if (this.reigisterCode =="") {
					this.fun.showMsg("验证码不能为空");
					return false
				}
				if (this.reigisterCode != this.reigisterCap) {
					this.fun.showMsg("验证码不正确");
					return false
				}
				if (this.password.length<6) {
					this.fun.showMsg("密码不能小于6位");
					return false
				}
				if (this.newPasswd.length<6) {
					this.fun.showMsg("确认新密码不能小于6位");
					return false
				}
				if (this.newPasswd != this.password) {
					this.fun.showMsg("两次密码不一致");
					return false
				}
				if (this.isStatus !=true) {
					this.fun.showMsg("请阅读并勾选协议");
					return false
				}
				this.fun.getReq(this.baseUrl+'/api/registerDo',{mobile:this.telphone,sms_code:this.reigisterCap,"password":this.newPasswd})
				.then((res)=>{
					if (res[1].data.code ==10000) {
						uni.switchTab({
							url:"/pages/mine/mine",
						})
					} else {
						this.fun.showMsg(res[1].data.msg);
						return false
					}
				}).catch((err)=>{
					this.fun.showMsg(err)
				})
			}
		}
	}
</script>

<style scoped>
	@import url("./css/register.css");
</style>
