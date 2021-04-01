<template>
	<view class="newAddress">
		<view class="content">
			<form @submit="formSubmit">
				<view class="box userName">
					<text>收件人</text>
					<input name="name" type="text" value="" placeholder="请输入收件人姓名"/>
				</view>
				<view class="box userName">
					<text>电话号码</text>
					<input  name="phoneNumber" type="text" value="" placeholder="请输入联系方式"/>
				</view>
				<view class="box userName">
					<text>所在地区</text>
					<text @tap="open" class="chooseAddress" v-if="isShow">请选择地址</text>
					<text @tap="open" class="chooseAddress" v-else>{{pickerText.label}}</text>
					<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault"
						@onConfirm="onConfirm" themeColor="#007AFF"></simple-address>
				</view>
				<view class="box userName">
					<text>详细地址</text>
					<input name="detailAddress" type="text" value="" placeholder="请输入详细地址"/>
				</view>
				<view class="box userName">
					<text>设置未默认地址</text>
					<switch @change="switchChange" name="defaultStatus" />
				</view>
				<view class="delete" @tap="deleteAddress(id)">
					删除该收货地址
				</view>
				<button form-type="submit">保存地址</button>
			</form>
		</view>
	</view>
</template>


<script>
	import {
		updateAddressInfo,
		switchDefault,
		delAddressInfo
	} from "@/api/address/address.js"
	import simpleAddress from '@/components/simple-address/simple-address.vue';
	import WxValidated from "../../../form/form.js";
	
	export default {
		data() {
			return {
				isShow: true,
				pickerText: "",
				cityPickerValueDefault: [0, 0, 1],
				city: "",
				province: "",
				region: "",
				cityCode: "",
				id:""
			};
		},
		onLoad(val) {
			console.log(val);
			this.id=val.addressId
			this.initValidate();
		},
		components: {
			simpleAddress
		},
		methods: {
			// 删除该地址
			deleteAddress(val){
				delAddressInfo(val).then(res=>{
					console.log(res);
					if(res.code==20000){
						uni.showToast({
							title:"删除成功"
						})
					}
				})
			},
			//修改默认地址
			switchChange(e){
				switchDefault(this.id,e.detail.value?1:0).then(res=>{
					console.log(res);
					if(res.code==20000){
						uni.showToast({
							title:"你已经成功切换"
						})
					}
				})
			},
			//省市区选择
			open() {
				this.$refs.simpleAddress.open()
			},
			formSubmit(res) {
				var result = this.WxValidate.checkForm(res.detail.value)
				if (result) {
					if (this.pickerText) {
						console.log(res);
						if (res.detail.value.defaultStatus) {
							res.detail.value.defaultStatus = 1
						} else {
							res.detail.value.defaultStatus = 0
						}
						updateAddressInfo({
							city: this.city,
							cityCode: this.cityCode,
							defaultStatus: res.detail.value.defaultStatus,
							detailAddress: res.detail.value.detailAddress,
							name: res.detail.value.name,
							phoneNumber: res.detail.value.phoneNumber,
							province: this.province,
							region: this.region,
							id:this.id,
							tag: ""
						}).then(res => {
							if(res.code==20000){
								uni.showToast({
									title:"修改成功"
								})
							}
						})
					} else {
						uni.showToast({
							icon: "none",
							title: "请选择所在地区"
						})
					}

				} else {
					uni.showToast({
						icon: "none",
						title: this.WxValidate.errorList[0].msg
					})
				}

			},
			onConfirm(e) {
				this.isShow = false
				console.log(e);
				this.pickerText = e
				this.city = e.labelArr[1]
				this.province = e.labelArr[0]
				this.region = e.labelArr[2]
				this.cityCode = e.provinceCode + "-" + e.cityCode + "-" + e.areaCode
			},
			initValidate() {
				let rules = {
					name: {
						required: true,
						rangelength: [2, 5]
					},
					phoneNumber: {
						required: true,
						tel: true
					},
					detailAddress: {
						required: true
					}
				}

				let message = {
					name: {
						required: '请输入用户名',
						rangelength: '请输入2-5位用户名'
					},
					phoneNumber: {
						required: '请输入手机号码',
						tel: '请输入11位的手机号码'
					},
					detailAddress: {
						required: '请输入详细收货地址'
					}
				}
				//实例化当前的验证规则和提示消息
				this.WxValidate = new WxValidated(rules, message);
			}

		}
	}
</script>

<style lang="scss" scoped>
	@import "./modify.scss"
</style>
