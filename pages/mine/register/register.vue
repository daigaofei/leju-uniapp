<template>
	<view class="register">
		<view class="icon">
			<view class="headertitle" @tap="chooseheader" v-if="header">
				选择头像...
			</view>
			<image v-else :src="headerimg" @tap="chooseheader"></image>
		</view>
		
		<form @submit="formSubmit">
			<view class="tel">
				<input name="phone" type="text" placeholder="手机号" value="15839653082"/>
			</view>
			
			<view class="tel password">
				<input value="123456" name="password" :password="word" placeholder="登录密码" />
			</view>
			
			<view class="tel username">
				<input value="15839653082" name="username" type="text" placeholder="用户名" />
			</view>
			
			<view class="tel nickname">
				<input value="哈哈哈" name="nickname" type="text" placeholder="昵称" />
			</view>
			
			<view class="tel code">
				<input name="email" value="1231" type="text" placeholder="验证码" />
				<view class="getcode">
					<text v-if="show" @tap="codetime">获取验证码</text>
					<text v-else>{{time}}</text>
				</view>
			</view>
			
			<view class="Btn">
				<button class="loginBtn" form-type="submit">注册</button>
			</view>
			
			<view class="more">
				
				<view class="dot" @tap="dott">
					<view class="content" v-if="status">
						
					</view>
				</view>
				<text>同意</text>
				<text>《协议》</text>
			</view>
		</form>	
	
			
	
			
	
	</view>
</template>

<script>
	import baseUrl from "@/api/baseUrl.js"
	import {
		register
	} from "@/api/mine/register/register.js"
	import WxValidated from "../../../form/form.js";
	export default {
		data() {
			return {
				word:true,
				header:true,
				headerimg:"",
				show:true,
				time:60,
				status:0
			};
		},
		onLoad: function () {
		    this.initValidate();
		},
		methods:{
			// 上传头像
			chooseheader(){
				var _this =this 
				uni.chooseImage({
					count:1,
					sourceType:["album "],
					sizeType:["original"],
					success(res){
						var promise = new Promise((resolve, rejected) => {
							uni.uploadFile({
								url:baseUrl + "/lejuClient/login/uploadAvatar",//接口路径
								filePath:res.tempFilePaths[0],//上一步返回的res中的路径
								name:"file",//标识
								success(res){
									resolve(JSON.parse(res.data).data.fileUrl)
								}
							})
						})
						promise.then(res=>{
							console.log(res);
							_this.headerimg = res
							if(_this.headerimg){
								_this.header=false
							}
						})
					}
				})
				
			},
			//验证码倒计时
			codetime(){
				this.show=false
				uni.showToast({
					icon:"none",
					title:'开始倒计时'
				})
				var timer = setInterval(()=>{
					this.time--
					if(this.time==55){
						clearInterval(timer)
						this.time=60
						this.show=true
						uni.showToast({
							icon:"none",
							title:'验证码请求成功'
						})
					}
				},1000)
				
				
				
			},
			formSubmit(res){
				if(this.status==0){
					uni.showToast({
						icon:"none",
						title:"请您勾选协议"
					})
					return
				}else if(this.headerimg==""){
					uni.showToast({
						icon:"none",
						title:"请您上传头像"
					})
					return
				}
				var result =this.WxValidate.checkForm(res.detail.value)
				if(result && this.status==1){
					//开始注册
					res.detail.value.status=this.status
					res.detail.value.icon=this.headerimg
					console.log(res.detail.value);
					register(res.detail.value).then(res=>{
						console.log(res);
						//提示注册状态
						if(res.code==20000){
							uni.showToast({
								title:"恭喜您,注册成功!现在可以去登录了"
							})
						}else if(res.message=="用户名/手机号已注册!"){
							uni.showToast({
								icon:"none",
								title:"用户名/手机号已注册!"
							})
						}
					})
				}else{
					//提示错误
					console.log(this.WxValidate.errorList);
					uni.showToast({
						icon:"none",
						title:this.WxValidate.errorList[0].msg
					})
				}
				
				
			},
			//同意协议
			dott(){
				if(this.status==0){
					this.status=1
				}else{
					this.status=0
				}
				
			},
			// phone password username nickname email
			// 校验表单
			initValidate() {
				    let rules = {
				      phone: {
				        required: true,
				        tel: true
				      },
					  password: {
					    required: true,
						minlength:5
					  },
					  username: {
					    required: true,
						minlength:""
					  },
					  nickname: {
					    required: true,
						minlength:""
					  },
					  email: {
					    required: true,
					    minlength:4
					  }
					  
				    }
				
				    let message = {
				      phone: {
				        required: '请输入手机号码',
				        maxlength: '请输入11位的手机号码'
				      },
					  password: {
					    required: '请输入密码',
					    maxlength: '请输入不少于5位的密码'
					  },
					  username: {
					    required: "请输入用户名",
					    minlength:""
					  },
					  nickname: {
					    required: "请输入昵称",
					    minlength:""
					  },
					  email: {
					    required: "请输入验证码",
					    minlength:"请输入不少于四位的验证码"
					  }
				    }
				    //实例化当前的验证规则和提示消息
				    this.WxValidate = new WxValidated(rules, message);
			}
			
		}
	}
</script>

<style lang="scss" scoped>
@import  "./register.scss"
</style>
