import request from "@/api/request.js"
 
function bannerAds(data){
	return request({
		url:"/lejuClient/home/bannerAds",
		methods:"get",
		data
	})
}
function categorys(parentId){
	return request({
		url:`/lejuClient/home/categorys/${parentId}`,
		methods:"get",
	})
}
function recommendList(data){
	return request({
		url:"/lejuClient/home/recommendList",
		methods:"get",
		data
	})
}
function hotList(data){
	return request({
		url:"/lejuClient/home/hotList",
		methods:"get",
		data
	})
}
function lejuLatestProducts(data){
	return request({
		url:"/lejuClient/home/lejuLatestProducts",
		methods:"get",
		data
	})
}
function saleMostProducts(data){
	return request({
		url:"/lejuClient/home/saleMostProducts",
		methods:"get",
		data
	})
}

export {
	bannerAds,
	categorys,
	recommendList,
	hotList,
	lejuLatestProducts,
	saleMostProducts
}