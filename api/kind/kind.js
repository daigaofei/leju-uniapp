import request from "@/api/request.js"
 

function categorys(parentId){
	return request({
		url:`/lejuClient/home/categorys/${parentId}`,
		method:"get",
	})
}


export {
	categorys,
}