import request from "@/api/request.js"
 

function register(data){
	return request({
		url:"/lejuClient/member/register",
		method:"post",
		data
	})
}


export {
	register,
}