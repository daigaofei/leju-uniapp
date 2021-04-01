<template>
	<view class="modifyUser">
		<view class="content">
			<view class="modifBtn" @tap="changeShow">
				修改用户消息
			</view>
			<view class="box usericon">
				<text>头像</text>
				<text class="updataIcon"  v-if="isShowIcon" @tap="chooseicon">上传头像</text>
				<view class="" v-else>
					<image v-if="headericon" :src="userInformation.icon" mode=""></image>
					<image @tap="chooseicon" v-else :src="userInformation.icon" mode=""></image>
				</view>
				
			</view>
			<form @submit="formSubmit">
				<view class="box username">
					<text>用户名</text>
					<input name="username" class="ipt" v-if="isShow" type="text" value=""  :value="userInformation.username"/>
					
					
					<input class="ipt1" v-else disabled type="text" value=""  :value="userInformation.username"/>
				</view>
				<view class="box username">
					<text>昵称</text>
					<input name="nickname" class="ipt" v-if="isShow"  type="text" :value="userInformation.nickname" />
					
					
					<input class="ipt1" v-else disabled type="text" :value="userInformation.nickname" />
				</view>
				<view class="box username">
					<text>手机号</text>
					<input name="phone" class="ipt" v-if="isShow" type="text" :value="userInformation.phone" />
					
					
					<input  class="ipt1" v-else disabled type="text" :value="userInformation.phone" />
				</view>
				
				<button form-type="submit" class="backLogin"  v-if="isShow" >
					更新
				</button>
				<button v-else  class="backLogin" @tap="backLogin">
					退出登录
				</button>
				
			</form>

			
			
		</view>
	</view>
</template>

<script>
	import {
		updateMemberInfo
	} from "@/api/mine/modifyUser/modifyUser.js"
	import {
		getMemberInfo
	} from "@/api/mine/mine.js"
	import baseUrl from "@/api/baseUrl.js"
	export default {
		data() {
			return {
				isShowIcon:false,
				headericon:true,
				isShow: false,
				userInformation:{}
			};
		},
		onLoad() {
			getMemberInfo().then(res=>{
				console.log(res);
				this.userInformation=res.data.userInfo
			})
		},
		methods: {
			chooseicon(){
				var _this=this
				uni.chooseImage({
					count:1,
					sourceType:["album "],
					sizeType:["original"],
					success(res){
						
						var promis = new Promise((resolve,rejected)=>{
							uni.uploadFile({
								url:baseUrl + "/lejuClient/login/uploadAvatar",
								filePath:res.tempFilePaths[0],//上一步返回的res中的路径
								name:"file",//标识
								success(res){
									resolve(JSON.parse(res.data).data.fileUrl)
								}
							})
						})
						promis.then(res=>{
							console.log(res);
							_this.userInformation.icon=res
							_this.isShowIcon = false
							_this.headericon = false
						})	
							
					}
				})
			},
			changeShow() {
				this.isShow = true
				this.isShowIcon = true
			},
			backLogin() {
				uni.clearStorageSync()
				uni.navigateTo({
					url: "/pages/mine/login/login"
				})
			},
			formSubmit(e) {
				e.detail.value.icon=this.userInformation.icon
				e.detail.value.id = this.userInformation.id
				console.log(e.detail.value);
				updateMemberInfo(e.detail.value).then(res=>{
					console.log(res);
					if(res.code==20000){
						uni.showToast({
							title:"更新成功,需要重新获取您的信息",
						})
						setTimeout(()=>{
							uni.navigateTo({
								url:"/pages/mine/login/login"
							})
						},1000)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "./modifyUser.scss"
</style>
