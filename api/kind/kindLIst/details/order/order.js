
import request from "@/api/request.js"
 

function addPreOrder(data){
	return request({
		url:"/lejuClient/order/addPreOrder",
		method:"post",
		data
	})
}

function getPreOrderById(orderId,data){
	return request({
		url:`/lejuClient/order/getPreOrderById/${orderId}`,
		method:"get",
		data
	})
}
function payConfirm(data){
	return request({
		url:"/lejuClient/order/payConfirm",
		method:"post",
		data
	})
}

export {
	addPreOrder,
	getPreOrderById,
	payConfirm
	
}