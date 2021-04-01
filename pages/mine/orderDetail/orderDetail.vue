<template>
	<view class="orderDetail">

		<view class="topBar">
			<view :class="{orange:index==currentTab}" v-for="(item,index) in list" :key="item.name"
				@tap="change(index)">
				{{item.name}}
			</view>
		</view>
		<view class="content" v-if="currentTab!=4">
			<view class="goodList" v-for="itemss in AllOrdersList" :key="itemss.order.id">
				<view class="ordernumber">
					<view class="orderSn" style="font-size: 12rpx;">
						订单编号:{{itemss.order.orderSn}}
					</view>
					<view class="status" style="font-size: 12rpx;">
						{{ itemss.order.status | statusText()}}
					</view>
				</view>
				<view class="goodItems" v-for="item in itemss.items" :key="item.id" @tap="goDetail(item.productId)">
					<image :src="item.productPic" mode=""></image>
					<view class="details">
						<view class="goodname">
							<text>{{item.productName}}</text>
							<text>￥{{item.totalPrice}}</text>
						</view>
						<view class="number">
							<text>编号:{{item.id}}</text>
							<text>x{{item.productQuantity}}</text>
						</view>
						<view class="size">
							规格:
						</view>
						<view class="sizeItem">
							<text v-for="size in JSON.parse(item.productAttr)">
								{{size.key}}:{{size.value}}&nbsp;&nbsp;
							</text>
						</view>
						<view class="retrueGoods" v-if="currentTab == 2" >
							<text v-if="item.isReturn==0" @tap.stop="goRetrueGoods(item.orderId)">退货</text>
							<text v-if="item.isReturn==1" style="color: red;">退货中</text>
						</view>
					</view>
				</view>
				
				<view class="total">
					<text>时间:{{itemss.order.createTime}}</text>
					<text>合计:￥{{itemss.order.totalAmount}}</text>
				</view>
				<view class="Btn">
					<view class="" v-if="currentTab == 0">
						<text class="cancelOrder" @tap="cancelOrder(itemss.order.id)">取消订单</text>
						<text class="pay" @tap="goPay(itemss.order.id)">付款</text>
					</view>
					<view class="" v-if="currentTab == 2" @tap="receiveDone(itemss.order.id)">
						<text>确认收货</text>
					</view>
					<view class="" v-if="currentTab == 3 && itemss.order.status==4" @tap="deleteOrder(itemss.order.id)">
						<text>订单已关闭,您可以删除此记录</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 退单部分 -->
		<view class="orderReturnApplys" v-else>
			<view class="goodList" v-for="item in AllOrdersList" :key="item.id">
					<view class="ordernumber">
						<view class="orderSn" style="font-size: 12rpx;">
							订单编号:{{item.orderSn}}
						</view>
						<view class="status" v-if="item.status!=2" style="font-size: 12rpx;">
							{{ item.status | orderProcessText()}}
						</view>
						<view class="status" v-if="item.status==2" style="color: red;font-size: 12rpx;">
							已退款
						</view>
					</view>
					<view class="goodItems" @tap="goDetail(item.productId)">
						<image :src="item.productPic" mode=""></image>
						<view class="details">
							<view class="goodname">
								<text>{{item.productName}}</text>
								<text>￥{{item.productPrice}}</text>
							</view>
							<view class="number">
								<text>编号:{{item.id}}</text>
								<text>x{{item.productQuantity}}</text>
							</view>
							<view class="size">
								规格:
							</view>
							<view class="sizeItem">
								<text v-for="size in JSON.parse(item.productAttr)">
									{{size.key}}:{{size.value}}&nbsp;&nbsp;
								</text>
							</view>
						</view>
					</view>
					<view class="total">
						<text>时间:{{item.createTime}}</text>
						<text>合计:￥{{item.returnAmount}}</text>
					</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		findAllOrders,
		orderReturnApplys,
		cancelOrder,
		receiveDone,
		deleteOrder
	} from "@/api/mine/orderDetail/orderDetail.js"
	export default {
		name:"hhhhhh",
		data() {
			return {
				AllOrders: [],
				returnorderList: [],
				currentTab: 0,
				list: [{
						name: "待付款",

					},
					{
						name: "已付款",

					},
					{
						name: "已发货",

					},
					{
						name: "已收货",

					},
					{
						name: "申请退款",

					}
				],
			};
		},
		onLoad(index) {
			this.currentTab = index.index
			this.init()
			
		},
		computed: {
			//切换不同tab栏,得到不同的tab数据
			AllOrdersList() {
				if(this.currentTab==4){
					return  this.returnorderList
				}else{
					return this.AllOrders.filter(ele => {
						if(this.currentTab==3){
							return ele.order.status == 3 || ele.order.status == 4 
						}else{
							// 筛选订单状态和tab栏索引相同的数据,即可实现切换tab切换数据
							return ele.order.status == this.currentTab
						}
					})
				}
				
				
			}
		},
		filters: {
			statusText(val) {
				if (val == 0) {
					return "未付款"
				} else if (val == 1) {
					return "确认付款,等待发货"
				} else if (val == 2) {
					return "已发货"
				} else if (val == 3) {
					return "已收货"
				} else if (val == 4) {
					return "已完成"
				} else {
					return "无效订单"
				}
			},
			orderProcessText(process) {
                var text = '等待处理';
                switch (JSON.stringify(process)) {
                    case '0':
                        text = '等待处理';
                        break;
                    case '1':
                        text = '确认退货,等待用户发货';
                        break;
                    case '3':
                        text = '已拒绝';
                        break;
                    case '9':
                        text = '拒绝退货';
                        break;

                    default:
                        break;
                }
                return text;
            }
			
		},
		methods: {
			goDetail(val){
				uni.navigateTo({
					url:`/pages/kind/kindList/details/details?id=${val}`
				})
			},
			init(){
				orderReturnApplys().then(res => {
					console.log(res);
					this.returnorderList = res.data.items;
				})
				findAllOrders().then(res => {
					console.log(res)
					this.AllOrders = res.data.orderList;
				})
			},
			goPay(val) {
				uni.navigateTo({
					url: `/pages/kind/kindList/details/order/order?orderId=${val}`
				})
			},
			change(index) {
				this.currentTab = index
			},
			//取消订单
			cancelOrder(val){
				cancelOrder(val).then(res=>{
					this.init()
					console.log(res);
					uni.showToast({
						title:"取消订单成功!"
					})
					
					
				})
			},
			// 确认收货
			receiveDone(val){
				receiveDone({
					orderId:val
				}).then(res=>{
					console.log(res);
					this.init()
					uni.showToast({
						title:"确认收货成功!"
					})
					
				})
			},
			// 删除已经关闭的订单
			deleteOrder(val){
				deleteOrder(val).then(res=>{
					console.log(res);
					this.init()
					uni.showToast({
						title:"删除记录成功!"
					})
					
				})
			},
			goRetrueGoods(val){
				uni.navigateTo({
					url:`./goRetrueGoods/goRetrueGoods?orderId=${val}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "./orderDetail.scss"
</style>
