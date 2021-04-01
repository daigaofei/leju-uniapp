<template>
	<view class="goodsDetails">
		<swiper class="swiper" indicator-dots="true" autoplay="true" interval="3000" circular="true">
			<swiper-item class="swiper-item" v-for="item in swiper" :key="item.id">
				<view class="swiper-item uni-bg-blue">
					<image :src="item.pic" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		
		<!-- 价格及描述 -->
		<view class="priceDesc">
			<view class="collect">
					<uni-icons @tap="collect" :color="color?'red':'white'" type="star" size="45"></uni-icons>
			</view>
			<view class="price">
				<text class="icon">￥</text>
				<text class="newPrice">{{list.promotionPrice}}</text>
				<text class="zero">.00</text>
				<text class="oldPrice">￥{{list.price}}</text>
				<text class="active">
					没有促销使用原价
					<text class="dotsleft"></text>
					<text class="dotsright"></text>
				</text>
			</view>
			<view class="goodsName">
				{{list.name}}
			</view>
			<view class="desc">{{list.description}}</view>
		</view>
		
		<view class="more">
			<mp-html :tag-style="imgList" :content="html" />
		</view>
		
		
		<view class="shopBtn">
			
			<image src="@/static/icons/kf.png" mode=""></image>
			<view class="buyBtn">
				<view class="addShop" @tap="shopMask(1)">
					添加到购物车
				</view>
				<view class="buy" @tap="shopMask(2)">
					立即购买
				</view>
			</view>
		</view>
		
		
		<view class="buyMask" v-if="isShow" @touchmove.stop.prevent="">
			<view class="content">
			<image @tap="closeMask" class="close" src="@/static/icons/x.png" mode=""></image>
			<view class="goodsImg">
				
				<image :src="imgurl" mode=""></image>
				
				<view class="desc">
					<view class="titel1">单人沙发</view>
					<view class="titel2">库存数量</view>
				</view>
			</view>
			<view class="goodsChoose">
				<view class="title">
					商品选择
				</view>
				<view class="choosecontent">
					<view class="choose" v-for="(item,index) in swiper" :key="item.id" >
						<view style="display: flex;"  @tap="borderColor(item.pic,index,item.id,item.productId)" :class="{border:index==currentBorder}">
							<view class="" v-for="(item1,index) in JSON.parse(item.spData)" :key="index">
								{{item1.key}}:{{item1.value}}
							</view>
						</view>
					</view>
				</view>
			</view>
			
			
			<view class="goodsChoose goodsChoose2">
				<view class="title">
					特色服务
				</view>
				<view class="choosecontent">
					<view class="choose">
						送货上门
					</view>
					<view class="choose">
						上门安装
					</view>
				</view>
			</view>
			
			<view class="buyNum">
				<view class="left">
					购买数量
				</view>
				<view class="right">
					<view class="" @tap="cut">-</view>
					<view class="">{{num}}</view>
					<view class="" @tap="add">+</view>
				</view>
			</view>
			
			<view class="sureBtn" @tap="totalBtn()">
				确定
			</view>
			
			
			
			
				
			</view>
			
		</view>
	</view>
</template>

<script>
	import {
		productDetail,
		addCart
	} from "@/api/kind/kindLIst/details/details.js"
	import login from "../../../mixins/mixins.js"
	import {
		addPreOrder
	} from "../../../../api/kind/kindLIst/details/order/order.js"
	export default {
		data() {
			return {
				color:false,
				addOrbuy:"",
				productId:"",
				productSkuId:"",
				num:1,
				imgurl:"",
				currentBorder:0,
				isShow:false,
				imgList:{
					div:"width:100%;height:auto;display:block;margin:0 auto 50rpx;",
					img:"width:100%;height:auto;display:block;margin:auto;"
					
					
				},
				list: {},
				swiper: [],
				html:"",
				orderId:""
			};
		},
		mixins:[login],
		methods:{
			collect(){
				if(this.checkLogin()){
					var collects = uni.getStorageSync("collects")
					if(collects){
						var item = collects.find(ele=>ele.id==this.list.id)
						if(item){
							var index = collects.findIndex(ele=>ele.id==this.list.id)
							collects.splice(index,1)
							uni.setStorageSync("collects",collects)
							this.color=false
						}else{
							collects.push(this.list)
							this.color=true
							uni.setStorageSync("collects",collects)
						}
					}else{
						var arr=[]
						arr.push(this.list)
						uni.setStorageSync("collects",arr)
						this.color=true
					}
				}else{
					this.checkLogin()
				}
				
				
				
			},
			borderColor(url,index,idd,productId){
				this.imgurl = url
				this.currentBorder = index
				this.productSkuId = idd
				this.productId =  productId
				console.log(this.productSkuId,this.productId);
				
			},
			shopMask(val){
				this.isShow = true
				this.addOrbuy = val
				this.productSkuId=this.swiper[0].id
				this.productId=this.swiper[0].productId
			},
			closeMask(){
				this.isShow = false
				this.currentBorder=0
				
			},
			cut(){
				this.num--
				if(this.num<0){
					this.num=0
				}
			},
			add(){
				this.num++
			},
			totalBtn(){
				var obj={
					productSkuId:this.productSkuId,
					productId:this.productId,
					quantity:this.num
				}
				var objOrder={
					"orderItemList": [
					    {
					      "productSkuId":this.productSkuId,
					      "productId":this.productId,
					      "productQuantity":this.num
					    }
					  ]
				}
				console.log(objOrder);
				if(this.checkLogin()){
					if(this.addOrbuy==1){
						// 加入购物车
						addCart(obj).then(res=>{
							console.log(res);
							uni.showToast({
								title:"加入购物车成功"
							})
						})
						
						
					}else if(this.addOrbuy==2){
						//立即购买,跳转到订单确认界面
						uni.showToast({
							title:"购买成功,1秒后跳转到订单确认页面"
						})
						
						addPreOrder(objOrder).then(res=>{
							console.log(res);
							this.orderId=res.data.orderId
							setTimeout(()=>{
								uni.navigateTo({
									url: `./order/order?orderId=${this.orderId}`
								});
							},1000)
							
						})
						
						
						
					}
				}else{
					this.checkLogin()
				}
				
			}
		},
		async onLoad(val) {
			console.log(val.id);
			var details = await productDetail(val.id)
			console.log(details);
			this.list = details.data.product
			this.html = this.list.detailMobileHtml
			uni.setNavigationBarTitle({
				title: this.list.name
			});
			this.swiper = this.list.skuList
			this.imgurl= this.swiper[0].pic
			this.id= this.swiper[0].id
			console.log(this.swiper);
			
				//如果本地里存储有 和 点击进来商品相同的id，收藏变红
				if(uni.getStorageSync("collects")){
					uni.getStorageSync("collects").some(ele=>ele.id==this.list.id)
					this.color=true
				}
				
				
			
			


		}
	}
</script>

<style lang="scss" scoped>
	@import "./details.scss"
</style>
