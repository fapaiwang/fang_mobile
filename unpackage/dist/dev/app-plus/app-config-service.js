
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/detail/index","pages/detail/other","pages/detail/taxes","pages/focus/index","pages/customer/customer","pages/mine/mine","pages/morelistings/index","pages/detail/taxes_res","pages/community/community","pages/news/index","pages/news/detail","pages/community/index","pages/login/login","pages/login/login_mobile","pages/login/forget","pages/login/register","pages/mine/edit","pages/mine/list","pages/mine/attention","pages/detail/result","pages/all/index","pages/search/search","pages/login/pact","pages/detail/recording","pages/detail/house","pages/mine/password","pages/mine/history","pages/detail/banner","pages/detail/map"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#fff","backgroundColor":"#FFFFFF"},"tabBar":{"color":"#666666","selectedColor":"#E02E24","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/index/index","iconPath":"static/img/tab/home@2x.png","selectedIconPath":"static/img/tab/home-pick@2x.png","text":"首页"},{"pagePath":"pages/focus/index","iconPath":"static/img/tab/focus@2x.png","selectedIconPath":"static/img/tab/focus-pick@2x.png","text":"重点推荐"},{"pagePath":"pages/customer/customer","iconPath":"static/img/tab/customer@2x.png","selectedIconPath":"static/img/tab/customer-pick@2x.png","text":"客服"},{"pagePath":"pages/mine/mine","iconPath":"static/img/tab/mine@2x.png","selectedIconPath":"static/img/tab/mine-pick@2x.png","text":"我的"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"fapai","compilerVersion":"2.8.3","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"房拍网","titleNView":false}},{"path":"/pages/detail/index","meta":{},"window":{"navigationBarTitleText":"房拍网"}},{"path":"/pages/detail/other","meta":{},"window":{"navigationBarTitleText":"其他","backgroundColor":"#ffffff","color":"#333"}},{"path":"/pages/detail/taxes","meta":{},"window":{"navigationBarTitleText":"税率","backgroundColor":"#ffffff","color":"#333"}},{"path":"/pages/focus/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"重点推荐","enablePullDownRefresh":true}},{"path":"/pages/customer/customer","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"客服"}},{"path":"/pages/mine/mine","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的"}},{"path":"/pages/morelistings/index","meta":{},"window":{"navigationStyle":"custom","titleNView":false}},{"path":"/pages/detail/taxes_res","meta":{},"window":{"navigationBarTitleText":"税费计算结果"}},{"path":"/pages/community/community","meta":{},"window":{"navigationBarTitleText":"房拍网"}},{"path":"/pages/news/index","meta":{},"window":{"navigationBarTitleText":"法拍百科","enablePullDownRefresh":true}},{"path":"/pages/news/detail","meta":{},"window":{"navigationBarTitleText":"法拍百科详情"}},{"path":"/pages/community/index","meta":{},"window":{"navigationBarTitleText":"精选小区"}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登陆"}},{"path":"/pages/login/login_mobile","meta":{},"window":{"navigationBarTitleText":"登陆"}},{"path":"/pages/login/forget","meta":{},"window":{"navigationBarTitleText":"密码重置"}},{"path":"/pages/login/register","meta":{},"window":{"navigationBarTitleText":"注册"}},{"path":"/pages/mine/edit","meta":{},"window":{"navigationBarTitleText":"修改资料"}},{"path":"/pages/mine/list","meta":{},"window":{"navigationBarTitleText":"我的法拍专员"}},{"path":"/pages/mine/attention","meta":{},"window":{"navigationBarTitleText":"我的关注"}},{"path":"/pages/detail/result","meta":{},"window":{"navigationBarTitleText":"房贷计算"}},{"path":"/pages/all/index","meta":{},"window":{"navigationBarTitleText":"全部房源"}},{"path":"/pages/search/search","meta":{},"window":{"navigationBarTitleText":"搜索"}},{"path":"/pages/login/pact","meta":{},"window":{"navigationBarTitleText":"房拍网用户协议"}},{"path":"/pages/detail/recording","meta":{},"window":{}},{"path":"/pages/detail/house","meta":{},"window":{}},{"path":"/pages/mine/password","meta":{},"window":{"navigationBarTitleText":"修改密码"}},{"path":"/pages/mine/history","meta":{},"window":{"navigationBarTitleText":"浏览历史"}},{"path":"/pages/detail/banner","meta":{},"window":{}},{"path":"/pages/detail/map","meta":{},"window":{}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
