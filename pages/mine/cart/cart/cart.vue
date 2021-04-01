<template>
	<view class="cart">
		<view class="bgc">


			<view class="content" v-for="(item,index) in catrList" :key="item.id">

				<view class="item">
					<view class="check">
						<evan-checkbox primary-color="#354E44" shape="square" v-model="item.isChecked">
						</evan-checkbox>
					</view>
					<view class="goodsImg">
						<image :src="item.productPic" mode=""></image>
					</view>
					<view class="desc">
						<view class="title">
							{{item.productName}}
						</view>
						<view class="price">
							编号:{{item.productSkuId}}价格:￥{{item.price}}
						</view>
						<view class="num">
							数量:{{item.quantity}}
						</view>
					</view>
				</view>


				<view class="quantity">
					<view class="cut" @tap="cut(index)">
						-
					</view>
					<view class="num">
						{{item.quantity}}
					</view>
					<view class="add" @tap="add(index)">
						+
					</view>
				</view>
			</view>
		</view>
		<view class="total">
			<view class="allcheck">
				全选<evan-checkbox primary-color="#354E44" shape="square" v-model="allChecked"></evan-checkbox>
			</view>
			<view class="totalBtn">
				<view class="totalprice">
					合计:￥<text>{{price}}</text>
				</view>
				<view class="pay" @tap="goPay">
					结算
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		findAllCartItem,
		delCartItems
	} from "../../../../api/mine/cart/cart.js"
	import {
		addPreOrder
	} from "../../../../api/kind/kindLIst/details/order/order.js"
	export default {
		data() {
			return {
				catrList: [],

			};
		},
		methods: {
			init(){
				findAllCartItem().then(res => {
					res.data.items.forEach(ele => {
						ele.isChecked = false
					})
					this.catrList = res.data.items
					console.log(this.catrList);
				})
			},
			cut(val) {
				var _this = this
				_this.catrList[val].quantity--
				if (_this.catrList[val].quantity < 1) {
					_this.catrList[val].quantity = 1
					uni.showModal({
						title: "删除提示",
						content: "您去确定要删除此商品吗?",
						success(res) {
							console.log(res);
							if (res.cancel == true) {
								uni.showToast({
									icon: "none",
									title: "您取消了"
								})
							} else if (res.confirm == true) {
								console.log(_this.catrList[val].id);
								var arr = []
								arr.push(_this.catrList[val].id)
								console.log(arr);

								///删除商品
								delCartItems(
									 arr
								).then(res => {
									_this.init()
								})
							}
						}
					})
				}
			},
			add(val) {
				this.catrList[val].quantity++
			},
			// 结算按钮
			goPay() {
				var result = this.catrList.every(ele => {
					return ele.isChecked == false
				})
				if (result) {
					uni.showToast({
						icon: "none",
						title: "请勾选您要购买的商品"
					})
				} else {
					//查找已经勾选的项,返回一个新的数组
					var item = this.catrList.filter(ele=>{
						return ele.isChecked==true
					})
					var arr=[]
					item.forEach(ele=>{
						var obj = {
								"cartId": ele.id,
								"productId": ele.productId,
								"productQuantity": ele.quantity,
								"productSkuId": ele.productSkuId
							}
							arr.push(obj)
					})
					
					var orderitem={
						"orderItemList":arr
					}
					addPreOrder(orderitem).then(res=>{
						console.log(res);
						uni.redirectTo({
							url: `../../../kind/kindList/details/order/order?orderId=${res.data.orderId}`
						});
					})
				}
			}
		},
		computed: {
			price() {
				return this.catrList.reduce((pre, next) => {
					if (next.isChecked == true) {
						return pre + next.quantity * next.price
					} else {
						return pre
					}
				}, 0)
			},
			allChecked: {
				get() {
					return this.catrList.every(ele => {
						return ele.isChecked == true
					})
				},
				set(val) {
					console.log(val);
					this.catrList.forEach(ele => {
						ele.isChecked = val
					})
				}
			}
		},
		onLoad() {
			this.init()
		}

	}
</script>

<style lang="scss" scoped>
	@import "./cart.scss"
</style>
