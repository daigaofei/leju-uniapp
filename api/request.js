
import baseUrl from "./baseUrl"
var request = function(config){
    return new Promise(function(resolve,reject){
      uni.request({
        url:baseUrl+config.url,
        data:config.data,
        method:config.method?config.method.toLowerCase():"GET",
		header:{
			token:uni.getStorageSync("token")
		},
        success(res){
         if(res.data.code==20002){
			 uni.showModal({
			 	title:"登录提示",
				content:"token过期,是否重新登录",
				success(ress) {
					if(ress.confirm){
						uni.navigateTo({
							url:"/pages/mine/login/login"
						})
					}
				}
			 })
		 }
		 resolve(res.data)
        },
        fail(res){
          reject(res)
        }
      })
    })
}

export default request