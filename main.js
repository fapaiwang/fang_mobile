import Vue from 'vue'
import App from './App'

import Fun from "./common/js/function.js"
Vue.prototype.fun = Fun;

import userKey from "./common/js/userKey.js"
Vue.prototype.userKey = userKey;

// import RequestUrl from "./common/js/requests.js"
Vue.prototype.baseUrl = "https://www.fangpaiwang.com";

Vue.config.productionTip = false

Vue.prototype.bus=new Vue();

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
