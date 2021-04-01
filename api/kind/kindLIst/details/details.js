import request from "@/api/request.js"
 

function productDetail(productId){
	return request({
		url:`/lejuClient/product/productDetail/${productId}`,
		method:"get",
	})
}
function addCart(data){
	return request({
		url:"/lejuClient/cart/addCart",
		method:"post",
		data
	})
}


export {
	productDetail,
	addCart
}



 



