<template>
	<view class="postOrder">
		<view class="content">
			<view class="orderId">
				订单编号:{{list.orderSn}}
			</view>
			<view class="orderPrice">
				订单金额:{{totalPrice}}
			</view>
			<view class="choosePay">
				选择支付方式
			</view>
			<form @submit="formSubmit">
				<radio-group  name="payType">
					<view class="zhifubao">
						<view class="">
							<image src="../../../../../../static/icons/alipay.png" mode=""></image>
							<text>支付宝支付</text>
						</view>
						<radio checked color="#354E44" value="1"  />
					</view>
					<view class="weixin">
						<view class="">
							<image src="../../../../../../static/icons/wxpay.png" mode=""></image>
							<text>微信支付</text>
						</view>
						<radio color="#354E44" value="2"   />
					</view>



					<button class="payBtn" form-type="submit">
						支付
					</button>
					<view class="httppp">
						点击立即支付,即代表您同意《<text>条款协议</text>》
					</view>
				</radio-group>
			</form>
		</view>
	</view>
</template>

<script>
	import {
		getPreOrderById,
		payConfirm
	} from "@/api/kind/kindLIst/details/order/order.js"
	export default {
		data() {
			return {
				list: {},
				item: [],
				totalPrice: 0
			};
		},
		onLoad(options) {
			console.log(options);
			getPreOrderById(this.options.orderId).then(res => {
				console.log(res)
				this.list = res.data.orderBase;
				this.item = res.data.orderItems
				this.totalPrice = this.item.reduce((pre, next) => {
					return pre + next.productQuantity * next.productPrice
				}, 0)
			})
		},
		methods: {
			formSubmit(res) {
				console.log(this.list.id);
				payConfirm({
					orderId: this.list.id,
					payType: Number(res.detail.value.payType)
				}).then(res=>{
					console.log(res);
					if(res.code==20000){
						uni.navigateTo({
							url:`./paySuccess/paySuccess?totalPrice=${this.totalPrice}`
						})
						setTimeout(()=>{
							uni.showToast({
								title:"支付成功"
							})
						},1000)
						
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "./postOrder.scss"
</style>
