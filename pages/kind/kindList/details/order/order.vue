<template>
	<view class="order">
		<view class="content">
			<view class="waitPay">
				等待支付
			</view>
			<view class="address" @tap="goAddress(1)" v-if="isShow">
				去选择收货地址...
			</view>
			<view class="address" @tap="goAddress(1)" v-else>
				<view class="item">
					<text>姓名:{{address.name}}</text>
					<text>电话:{{address.phoneNumber}}</text>
				</view>
				<view class="">
					<text>收货地址:{{address.province}}-{{address.city}}-{{address.region}}-{{address.detailAddress}}</text>
				</view>
			</view>
			<view class="orderDetail">
				<view class="orderId">
					<text>订单编号:{{orderBase.orderSn}}</text>
					<text>等待支付</text>
				</view>
				<view class="goodDetail" v-if="orderItems.length!=0" v-for="item in orderItems" :key="item.id">
					<view class="allDetail">
						<view class="goodsImg">
							<image :src="item.productSkuPic" mode=""></image>
						</view>
						<view class="desc">
							<view class="goodsName">
								<text>{{item.productName}}</text>
								<text>￥{{item.productPrice}}元</text>
							</view>
							<view class="number">
								<text>数量:</text>
								<text>x{{item.productQuantity}}</text>
							</view>
							<view class="spec">
								规格:
								<view class="size" :key="index"
									v-for="(item,index) in JSON.parse(item.productAttr)">
									{{item.key}}:{{item.value}}
								</view>
							</view>

						</view>
					</view>
				</view>
				<view class="total">
					<view class="price">
						合计:{{totalPrice}}元
					</view>
					<view class="lastPay" @tap="postOrder()">
						确认付款
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		addPreOrder,
		getPreOrderById
	} from "../../../../../api/kind/kindLIst/details/order/order.js"
	export default {
		data() {
			return {
				isShow:true,
				orderBase: {},
				orderItems: [],
				totalPrice:0,
				address:{},
				id:""
			};
		},
		methods:{
			postOrder(val){
				uni.navigateTo({
					url:`/pages/kind/kindList/details/order/postOrder/postOrder?orderId=${this.id}`
				})
			},
			goAddress(val){
				uni.navigateTo({
					url:`/pages/address/address?type=${val}`
				})
			}
		},
		onShow(){
			
			if(uni.getStorageSync("address")){
				this.isShow=false
			}
			this.address = uni.getStorageSync("address")
		},
		onLoad(opations) {
			getPreOrderById(opations.orderId).then(res => {
				console.log(res);
				this.id = res.data.orderBase.id
				this.orderBase = res.data.orderBase
				// 进入确认订单页面需要的商品信息
				this.orderItems = res.data.orderItems
				this.orderItems.reduce((pre,next)=>{
					return this.totalPrice=pre+next.productPrice*next.productQuantity
				},0)
				console.log(this.totalPrice);
			})
			
			console.log(uni.getStorageSync("address"));
			//选择收货地址的显示与隐藏
			
		}
		
	}
</script>

<style lang="scss" scoped>
	@import "./order.scss"
</style>
