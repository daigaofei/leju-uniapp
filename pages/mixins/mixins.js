var obj = {
	methods:{
		checkLogin(){
			var token = uni.getStorageSync("token")
			if(token){
				//...
				return true
			}else{
				uni.showModal({
					title:"登录提示",
					content:"暂未登录,是否立即登录",
					success(res){
						console.log(res);
						if(res.confirm){
							console.log("123132");
							uni.navigateTo({
								url:"/pages/mine/login/login?goback=0"
							})
						}
						if(res.cancel){
							uni.showToast({
								title:"您取消了"
							})
						}
					}
				})
			}
			return false
		}
	}
}
export default obj