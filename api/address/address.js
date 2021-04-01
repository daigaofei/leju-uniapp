import request from "@/api/request.js"
 
function findAllAddress(data){
	return request({
		url:"/lejuClient/address/findAllAddress",
		method:"get",
		data
	})
}

function addAddressInfo(data){
	return request({
		url:"/lejuClient/address/addAddressInfo",
		method:"post",
		data
	})
}
function updateAddressInfo(data){
	return request({
		url:"/lejuClient/address/updateAddressInfo",
		method:"post",
		data
	})
}
function switchDefault(addressId,defaultStatus){
	return request({
		url:`/lejuClient/address/switchDefault/${addressId}/${defaultStatus}`,
		method:"post"
	})
}
function delAddressInfo(addressId){
	return request({
		url:`/lejuClient/address/delAddressInfo/${addressId}`,
		method:"DELETE"
	})
}

 

 
export {
	findAllAddress,
	addAddressInfo,
	updateAddressInfo,
	switchDefault,
	delAddressInfo
}