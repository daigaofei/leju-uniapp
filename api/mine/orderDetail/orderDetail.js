

import request from "@/api/request.js"
 

function findAllOrders(data){
	return request({
		url:"/lejuClient/order/findAllOrders",
		method:"get",
		data
	})
}
function orderReturnApplys(data){
	return request({
		url:"/lejuClient/orderReturn/orderReturnApplys",
		method:"get",
		data
	})
}
function cancelOrder(orderId,data){
	return request({
		url:`/lejuClient/order/cancelOrder/${orderId}`,
		method:"post",
		data
	})
}
function receiveDone(data){
	return request({
		url:"/lejuClient/order/receiveDone",
		method:"post",
		data
	})
}
function deleteOrder(orderId){
	return request({
		url:`/lejuClient/order/deleteOrder/${orderId}`,
		method:"DELETE",
	})
}
function addOrderReturnApply(data){
	return request({
		url:"/lejuClient/orderReturn/addOrderReturnApply",
		method:"post",
		data
	})
}
function getCompanyAddrss(data){
	return request({
		url:"/lejuClient/orderReturn/getCompanyAddrss",
		method:"get",
		data
	})
}

export {
	findAllOrders,
	orderReturnApplys,
	cancelOrder,
	receiveDone,
	deleteOrder,
	addOrderReturnApply,
	getCompanyAddrss
	
}