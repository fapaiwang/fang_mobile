// 公用地址
let host = "https://www.fangpaiwang.com"
class RequestUrl{
	baseUrl = host
	//首页头部轮播图
	indexBanner = `${host}/api/banner/index`;
	//首页轮播图下面的导航
	homeMenu = `${host}/api/page/home_menu`;
	//首页 即将拍卖 正在进行 今日成交
	homeSearch = `${host}/api/banner/home_second_search`;
	//首页滚动信息
	scrollInfo = `${host}/api/second/get_today_add`;
	//首页 为你选房
	selectHouse = `${host}/api/second/characteristic_house`;
	//首页 推荐小区
	recommendedCommunity = `${host}/api/second/quality_estate`;
	//首页 推荐房源
	recommendHouse = `${host}/api/second/recommend_house`;
	//首页 自由购
	restrictHouse = `${host}/api/second/restrict_house`;
}

RequestUrl = new RequestUrl()
export default RequestUrl;