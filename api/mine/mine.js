import request from "@/api/request.js"
 

function getMemberInfo(data){
	return request({
		url:"/lejuClient/login/getMemberInfo",
		method:"get",
		data
	})
}


export {
	getMemberInfo,
}