import {requestUrl} from './requests.js'

class Fun{
	successData = new Array();
	errData = new Array();
	navTo(url){//url跳转
		uni.navigateTo({
			url:url
		})
	}
	
	getReq(_url,_data="",_method='GET'){//get请求
		return new Promise((resolve,reject)=>{
			uni.request({
				url: _url, 
				method:_method,
				data:_data
			})
			.then((res)=>{
				resolve(res)
			})
			.catch((err)=>{
				// errData.errList("服务器太忙了 请稍后再试")
				reject(err)
			})
		})
	}
	showMsg(msg){
		uni.showToast({
			icon:'none',
			title:msg,
			duration:3000
		})
	}
	setStor(_key,_data,){
		uni.setStorage({
			key:_key,
			data:_data,
			success:function() {
				console.log('success');
			}
		})
	}
	getStor(_key){
		return uni.getStorage({
			key:_key,
			success:function(res){
				console.log("success",res)
				return res.data;
			},
			fail:function(res) {
				console.log("fail",res)
				return errData.push({code:3000});
			}
		})
	}
	getImgSrc(ImgSrc){
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
	}
}

let fun = new Fun();
export default fun;