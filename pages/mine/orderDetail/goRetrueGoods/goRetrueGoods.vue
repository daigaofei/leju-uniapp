<template>
	<view class="goRetrueGoods">
		<view class="content">
			<view class="item" v-if="list.length!=0">
				<view class="orderSn">
					订单编号:{{list.orderBase.orderSn}}
				</view>
				<view class="goodItems" v-for="item in list.orderItems" :key="item.id">
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
					</view>
				</view>
				<view class="totalPrice">
					总计:￥{{list.orderBase.totalAmount}}元
				</view>
			</view>

			<view class="returnOrder">
				<form @submit="formSubmit">
					<view class="box num">
						<text>请选择退单数量</text>
						<input name="count" type="text" value="1" disabled />
					</view>

					<view class="box reason">
						<text>请输入退货原因</text>
						<input maxlength="7" name="reason" type="text" value="" placeholder="请输入退货原因" />
					</view>

					<view class="box">
						<text>请选择退货地址</text>
						<view class="pick">
							<picker mode="selector" :value="index" :range="array" @change="bindPickerChange">
								<view>{{array[index]}}</view>
							</picker>
						</view>

					</view>

					<view class="box">
						<text>请输入问题描述</text>
						<textarea maxlength="50" name="description" value="" placeholder="请输入问题描述" />
					</view>

					<view class="tips">
						<view class="title">
							温馨提示:
						</view>
						<view class="desc">
							上传图片总大小不能超过3m，单个文件大小不能超过1m，图片总个数不能超过3张
						</view>

						<view class="updataimg">
							<view class="updown" @tap="upimg">
								<view class="box">
									<view class="line1"></view>
									<view class="line2"></view>
								</view>
								<view class="intro">
									上传图片
								</view>
							</view>
							<view class="uploadimg">
								<view class="img img1" v-for="(items,index) in imgList" :key="index" >
									<view class="itemimg">
										<image :src="items" mode=""></image>
										<view @tap="deleteimg(index)" class="deleteimg"><image src="../../../../static/icons/fail.png" mode=""></image></view>
									</view>
									
								</view>
							</view>



						</view>
					</view>

					<button form-type="submit">提交</button>
				</form>



			</view>
		</view>
	</view>
</template>

<script>
	import {
		getPreOrderById
	} from "@/api/kind/kindLIst/details/order/order.js"
	import {
		addOrderReturnApply,
		getCompanyAddrss
	} from "@/api/mine/orderDetail/orderDetail.js"
	import baseUrl from "@/api/baseUrl.js"
	export default {
		data() {
			return {
				index: 0,
				array: [],
				orderId: "",
				list: [],
				company: [],
				companyAddressId: "",
				imgList: [],
				uploadImg: []
			};
		},
		onLoad(res) {
			this.orderId = res.orderId
			getPreOrderById(res.orderId).then(res => {
				this.list = res.data
				console.log(res.data);
			})
			getCompanyAddrss().then(res => {
				this.company = res.data.items
				console.log(res);
				var arr = ["请选择退货地址"]
				res.data.items.forEach(ele => {
					arr.push(ele.addressName)
				})
				this.array = arr
			})
		},
		methods: {
			//删除不想上传的图片
			deleteimg(val){
				this.imgList.splice(val,1)
			},
			upimg() {
				// this.imgList = res.tempFilePaths
				// console.log(this.imgList);
				var _this = this
				uni.chooseImage({
					success(res) {
						console.log(res);
						if (res.tempFilePaths.length > 3) {
							uni.showToast({
								icon: "none",
								title: "一次性选择的图片数量最多为三张"
							})
							return
						}
						if (_this.imgList.length + res.tempFilePaths.length > 3) {
							uni.showToast({
								icon: "none",
								title: "总图片数量最多为三张"
							})
							return
						}
						var result = res.tempFiles.find(ele => ele.size / 1020 / 1024 > 1)
						if (result) {
							uni.showToast({
								icon: "none",
								title: "图片大小超过了1M,请重新选择"
							})
						}
						_this.imgList.push(...res.tempFilePaths)
					}
				})
			},
			bindPickerChange: function(e) {
				console.log(e);
				console.log('picker发送选择改变，携带值为', e.target.value - 1)
				this.index = e.target.value
				if (e.target.value - 1 == -1) {
					uni.showToast({
						icon: "none",
						title: "请输入正确的收货地址"
					})
				} else {
					this.companyAddressId = this.company[e.target.value - 1].id
					console.log(this.companyAddressId);
				}


			},
			formSubmit(e) {
				var arrimg = [],
					_this = this;

				this.imgList.forEach(ele => {
					var promise = new Promise((resolve, rejected) => {
						uni.uploadFile({
							// 请求是异步的,所以要用Promise来进行改写,让代码从上向下执行
							url: baseUrl + "/lejuClient/orderReturn/uploadImg",
							filePath: ele,
							name: "file",
							success(res) {
								resolve(JSON.parse(res.data).data.fileUrl)

							}
						})
					})
					// 此时arrimg数组中,保存了三个promise实例数据
					arrimg.push(promise)
				})
				// Promise.all() 处理数组中,每一项都是promise实例的这种格式的数据
				var pro = Promise.all(arrimg)
				pro.then(res => {
					// 此时的res即为处理后的三个promise地址数据
					console.log(res);
					this.uploadImg = res.join(",")
					console.log(this.uploadImg);
					e.detail.value.companyAddressId = this.companyAddressId
					e.detail.value.orderId = this.orderId
					e.detail.value.orderItemId = this.list.orderItems[0].id
					e.detail.value.proofPics = this.uploadImg
					console.log(e.detail.value);
					addOrderReturnApply(
						e.detail.value
					).then(res => {
						if (res.code == 20000) {
							uni.showToast({
								title: "提交成功"
							})
						}
					})
				})

			}

		}
	}
</script>

<style lang="scss" scoped>
	@import "goRetrueGoods.scss"
</style>
