<template>
	<view class="paySuccess">
		<view class="content">
			<view class="">
				订单支付成功
			</view>
			<view class="">
				支付金额:{{totalPrice}}元
			</view>
		</view>
		
		
		<view class="personcenter" @tap="personcenter">
			返回个人中心
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				totalPrice:0
			};
		},
		onLoad(res) {
			this.totalPrice = res.totalPrice
		},
		methods:{
			personcenter(){
				uni.reLaunch({
					url:"/pages/mine/mine"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
@import "./paySuccess.scss"
</style>
