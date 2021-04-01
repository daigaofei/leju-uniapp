import request from "@/api/request.js"
 

function doLogin(data){
	return request({
		url:"/lejuClient/login/doLogin",
		method:"post",
		data
	})
}


export {
	doLogin,
}