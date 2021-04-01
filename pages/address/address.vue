<template>
	<view class="address">
		<view class="content">
			<view class="item" v-for="item in addressList" :key="item.id" >
				<view class="detail" @tap="goOrder(item)">
					<view class="name">
						<text>{{item.name}}</text>
						<text class="default" v-if="item.defaultStatus==0?false:true">默认</text>
					</view>
					<view class="tel">
						{{item.phoneNumber}}
					</view>
				</view>
				<view class="edit" @tap="addAddress(item.id)">
					<image src="../../static/icons/edit.png" mode="" ></image>
				</view>
			</view>
		</view>
		<view class="addAddress" @tap="addAddress(1)">
			新增收货地址
		</view>
	</view>
</template>

<script>
	import {
		findAllAddress
	} from "@/api/address/address.js"

	export default {
		data() {
			return {
				addressList: [],
				type:""
			};
		},
		onShow() {
			this.init()
		},
		onLoad(val) {
			this.init()
			this.type=val.type
		},
		methods: {
			//进入页面加载地址列表
			init(){
				findAllAddress().then(res => {
					console.log(res);
					this.addressList = res.data.items
				})
			},
			addAddress(val) {
				if (val == 1) {
					uni.navigateTo({
						url: "/pages/address/newAddress/newAddress"
					})
				} else {
					uni.navigateTo({
						url: `/pages/address/modify/modify?addressId=${val}`
					})
				}

			},
			goOrder(val) {
				
				if(this.type==1){
					var address = uni.setStorageSync("address",val)
					uni.navigateBack({
						url:"/pages/kind/kindList/details/order/order"
					})
				}else{
					return
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "./address.scss"
</style>
