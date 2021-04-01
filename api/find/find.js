
import request from "@/api/request.js"
 
function findArticleByPage(start,limit,data){
	return request({
		url:`/lejuClient/productArticle/findArticleByPage/${start}/${limit}`,
		method:"get",
		data
	})
}

function findBrandsByPage(start,limit,data){
	return request({
		url:`/lejuClient/brand/findBrandsByPage/${start}/${limit}`,
		method:"get",
		data
	})
}
function productArticle(id,data){
	return request({
		url:`/lejuClient/productArticle/productArticle/${id}`,
		method:"get",
		data
	})
}


 
export {
	findArticleByPage,
	findBrandsByPage,
	productArticle
	
}