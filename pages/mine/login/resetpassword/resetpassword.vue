<template>
	<view class="resetpassword">
		<form @submit="formSubmit">
			
			
			
			<view class="tel">
				<input name="username" type="text" value="" placeholder="请输入手机号码" />
			</view>
			
			<view class="tel password">
				<input name="password" :type="type" value="" placeholder="请输入密码"/>
				<view class="show">
					<image src="../../../../static/icons/view.png" mode="" @tap="showpassword"></image>
					<view class="line" v-if="showpasswordd">
						
					</view>
				</view>
				
			</view>
			
			<view class="tel password">
				<input name="code" type="text" value="" placeholder="验证码"/>
				<view class="getcode">
					获取验证码
				</view>
			</view>
			
			<view class="Btn">
				<button class="loginBtn" form-type="submit">重置密码</button>
			</view>
			
			
		</form>
	</view>
</template>

<script>
	import {
		resetPassword
	} from "@/api/mine/login/resetpassword/resetpassword.js"
	export default {
		data() {
			return {
				showpasswordd:true,
				type:"password"
			};
		},
		methods:{
			formSubmit(val){
				console.log(val);
				if(val.detail.value.username==""){
					uni.showToast({
						icon:"none",
						title:"请输入手机号码"
					})
				}else if(val.detail.value.password==""){
					uni.showToast({
						icon:"none",
						title:"请输入您要修改的密码"
					})
				}else if(val.detail.value.code==""){
					uni.showToast({
						icon:"none",
						title:"请输入必要的验证码"
					})
				}else{
					resetPassword(val.detail.value.username).then(res=>{
						if(res.code==20001){
							uni.showToast({
								icon:"none",
								title:"查询用户不存在"
							})
						}else if(res.code==20000){
							uni.showToast({
								title:"重置成功您可以去重新登录了",
								success() {
									setTimeout(()=>{
										uni.navigateTo({
											url:"/pages/mine/login/login"
										})
									},1000)
								}
							})
						}
					})
				}
				
			},
			showpassword(){
				if(this.showpasswordd==true){
					this.showpasswordd=false
					this.type = "text"
				}else{
					this.showpasswordd=true
					this.type = "password"
				}
				
			}
		}
	}
</script>

<style lang="scss">
@import  "./resetpassword.scss"
</style>
