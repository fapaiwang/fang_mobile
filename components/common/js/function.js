class Fun{
	webSite = "https://www.fangpaiwang.com";
	successData = new Array();
	errData = new Array();
	userInfo = "userInfo";//用户信息key
	likeHouse = "likeHouse";//关注的房屋
	likeEstate = "likeEstate";//关注的小区
	historyHouse = "historyHouse";//浏览的房源
	houseKeys = "houseKeys";//浏览的房源的ID
	historyEstate = "historyEstate";//浏览的小区
	estateKeys = "estateKeys";//浏览的小区的ID
	searchList = "searchList";//搜索key

	navTo(url){//保留当前页面，跳转到应用内的某个页面 url跳转
		uni.navigateTo({
			url:url
		})
	}
	redTo(url){// 关闭当前页面，跳转到应用内的某个页面。
		uni.redirectTo({
			url:url
		})
	}
	
	getDate(dates) { //将时间戳转换为具体时间
		if (dates) {
			var date = new Date(dates * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
			var Y = date.getFullYear() + '-';
			var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			var D = date.getDate() + ' ';
			var h = date.getHours() + ':';
			var m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':';
			var s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
			return Y+M+D+h+m+s;
		} else {
			return "";
		}
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
			return this.webSite+`${ImgSrc}`;
		} else {
			return this.webSite+`/${ImgSrc}`;
		}
	}
}

let fun = new Fun();
export default fun;