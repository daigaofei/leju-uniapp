import request from "@/api/request.js"
 

function findProductList(start,limit,data){
	return request({
		url:`/lejuClient/product/findProductList/${start}/${limit}`,
		method:"post",
		data
	})
}


export {
	findProductList,
}