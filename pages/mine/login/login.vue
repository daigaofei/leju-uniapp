<template>
	<view class="login">
		<view class="icon">
			<image src="../../../static/icons/leju-logo.png" mode=""></image>
		</view>
		
		<form @submit="formSubmit">
			<view class="tel">
				<input name="username" type="text" value="15800000000"  />
			</view>
			
			<view class="tel password">
				<input name="password" type="password" value="123456"/>
			</view>
			
			<view class="Btn">
				<button class="loginBtn" form-type="submit">登录</button>
			</view>
			
			<view class="more">
				<text @tap="resetpassword">找回密码</text>
				<text>|</text>
				<text @tap="goRegister">注册账号</text>
			</view>
		</form>	

			

			

	</view>
</template>

<script>
	import {
		doLogin
	} from "@/api/mine/login/login.js"
	import WxValidated from "../../../form/form.js";
	export default {
		data() {
			return {
				goback:""
			};
		},
		onLoad: function (e) {
		    this.initValidate();
			this.goback = e.goback
		},
		methods:{
			resetpassword(){
				uni.navigateTo({
					url:"./resetpassword/resetpassword"
				})
			},
			goRegister(){
				uni.navigateTo({
					url:"../register/register"
				})
			},
			formSubmit(val){
				console.log(val.detail.value);
				// 登录
				var result =this.WxValidate.checkForm(val.detail.value)
				if(result){
					doLogin(val.detail.value).then(res=>{
						console.log(res);
						if(res.message=="手机号未注册"){
							uni.showToast({
								icon:"none",
								title:"手机号未注册"
							})
						}else if(res.message=="密码错误"){
							uni.showToast({
								icon:"none",
								title:"密码错误"
							})
						}else if(res.code==20000){
							if(this.goback==0){
								uni.showToast({
									title:"登录成功"
								})
								setTimeout(()=>{
									uni.setStorageSync("token",res.data.token)
									uni.navigateBack()
								},500)
								
							}else{
								uni.showToast({
									title:"登录成功,将在1秒后进入个人中心"
								})
								setTimeout(()=>{
									uni.setStorageSync("token",res.data.token)
									uni.switchTab({
										url:"../mine"
									})
								},1000)
							}
							
							
							
						}
					})
				}else{
					//如果不符合规则,返回错误信息
					console.log(this.WxValidate.errorList);
					uni.showToast({
						icon:"none",
						title:this.WxValidate.errorList[0].msg
					})
				}
			},
			//表单验证实例函数
			initValidate() {
			    let rules = {
			      username: {
			        required: true,
			         tel: true
			      },
				  password: {
				    required: true,
				  }
			    }
			
			    let message = {
			      username: {
			        required: '请输入手机号码',
			        maxlength: '请输入11位有效手机号'
			      },
				  password: {
				    required: "请输入密码",
				    maxlength: "请输入密码"
				  }
			    }
			    //实例化当前的验证规则和提示消息
			    this.WxValidate = new WxValidated(rules, message);
			  }
		},
		
	}
</script>

<style lang="scss" scoped>
	@import "./login.scss"
</style>
