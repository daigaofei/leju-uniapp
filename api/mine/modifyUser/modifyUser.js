import request from "@/api/request.js"
 

function updateMemberInfo(data){
	return request({
		url:"/lejuClient/member/updateMemberInfo",
		method:"post",
		data
	})
}


export {
	updateMemberInfo,
}