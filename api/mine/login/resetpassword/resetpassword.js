import request from "@/api/request.js"
 

function resetPassword(username){
	return request({
		url:`/lejuClient/member/resetPassword/${username}`,
		method:"post"
	})
}


export {
	resetPassword,
}