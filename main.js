import Vue from 'vue'
import App from './App'

// import RequestUrl from "./common/js/requests.js"
Vue.prototype.baseUrl = "https://www.fangpaiwang.com";

import Fun from "components/common/js/function.js"
Vue.prototype.fun = Fun;

Vue.config.productionTip = false

Vue.prototype.bus=new Vue();

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
