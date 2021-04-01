<template>
	<view class="mine">
		<view class="header">
			<view class="usericon" @tap="modifyUrse">
				<image :src="user" mode=""></image>
			</view>
			<view class="userinformation">
				<view>{{usernickname}}</view>
				<view>{{username}}</view>
			</view>
		</view>
		<view class="loginRegister" v-if="show">
			<navigator url="register/register">
			<view class="register">
				注册
			</view>
			</navigator>
			<navigator url="login/login">
			<view class="login">
				登录
			</view>
			</navigator>
		</view>
		
		<view class="myorder">
			<view class="myorderTitle">
				我的订单
			</view>
			<view class="myorderContent">
				<view class="item" v-for="(item,index) in list" @tap="orderDetail(index)">
					<image :src="item.icon" mode=""></image>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
		
		
		<view class="more">
			<view class="item" @tap="goodsColect">
				<image src="../../static/icons/save.png" mode=""></image>
				<text>商品收藏</text>
			</view>
			<view class="item" @tap="unOpen">
				<image src="../../static/icons/brand.png" mode=""></image>
				<text>品牌</text>
			</view>
			<view class="item" @tap="articleColect">
				<image src="../../static/icons/article.png" mode=""></image>
				<text>文章收藏</text>
			</view>
			<view class="item" @tap="goAddress">
				<image src="../../static/icons/address.png" mode=""></image>
				<text>地址</text>
			</view>
			<view class="item" @tap="unOpen">
				<image src="../../static/icons/card.png" mode=""></image>
				<text>卡包</text>
			</view>
			
			<view class="item" @tap="goCart">
				<image src="../../static/icons/cart2.png" mode=""></image>
				<text>购物车</text>
			</view>
			
			<view class="item">
				<image src="../../static/icons/kf.png" mode=""></image>
				<text>联系客服</text>
			</view>
			
		</view>
	</view>
</template>

<script>
	import {
		getMemberInfo
	} from "@/api/mine/mine.js"
	import login from "../mixins/mixins.js"
	export default {
		data() {
			return {
				list:[
					{
						name:"待付款",
						icon:"../../static/icons/icon-pay.png"
					},
					{
						name:"已付款",
						icon:"../../static/icons/pay-done.png"
					},
					{
						name:"已发货",
						icon:"../../static/icons/icon-car.png"
					},
					{
						name:"已收货",
						icon:"../../static/icons/security.png"
					},
					{
						name:"售后",
						icon:"../../static/icons/icon-back.png"
					}
				],
				show:true,
				title: 'Hello',
				topBar:0,
				user:"",
				usernickname:"HI~",
				username:"您还没有登录呢"
				
			}
		},
		mixins:[login],
		onLoad() {
			// console.log(uni.getStorageSync("token"));
		},
		onShow(){
			if(uni.getStorageSync("token")){
				this.show=false
			}
			var _this=this
			if(this.checkLogin()){
				getMemberInfo().then(res=>{
					console.log(res);
					_this.user=res.data.userInfo.icon
					console.log(_this.user);
					_this.usernickname=res.data.userInfo.nickname
					var name="用户名:" + res.data.userInfo.username
					_this.username=name
				})
				
			}
		},
		methods: {
			orderDetail(val){
				uni.navigateTo({
					url:`./orderDetail/orderDetail?index=${val}`
				})
			},
			goodsColect(){
				uni.navigateTo({
					url:"/pages/mine/collect/collect"
				})
			},
			articleColect(){
				uni.navigateTo({
					url:"/pages/mine/articleCollect/articleCollect"
				})
			},
			unOpen(){
				uni.showToast({
					title:"品牌功能暂时未开通!",
					image:"/static/icons/sorry.png"
				})
			},
			modifyUrse(){
				uni.navigateTo({
					url:"/pages/mine/modifyUser/modifyUser"
				})
			},
			goAddress(){
				uni.navigateTo({
					url:"/pages/address/address"
				})
			},
			goCart(){
				uni.navigateTo({
					url:"./cart/cart/cart"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "./mine.scss"
</style>
