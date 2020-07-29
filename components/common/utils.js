const baseUrl = 'https://www.fangpaiwang.com'; //网址
//跳转房屋详情
const houseDetail = index => uni.navigateTo({
	url:`../../pages/detail/index?id=${index}`
})
//跳转小区详情
 const communityDetail = index => uni.navigateTo({
 	url:`../../pages/Community/community?id=${index}`
 })
 
 const getImgUrl = function(icon){
    return baseUrl+`/${icon}`;
 }