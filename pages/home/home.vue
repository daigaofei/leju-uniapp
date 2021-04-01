<template>
	<view class="content">
	
		
		<!-- 轮播图 -->
		<view class="banner" >
			<swiper class="bannerimg" autoplay="true" indicator-dots="true" indicator-color="#D8D8D8"
				indicator-active-color="#fff">
				<swiper-item class="bannerimg" v-for="item in banner" :key="item.id">
					<image :src="item.pic" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		
		
		<!-- 四个分类-->
		<view class="categorys">
			<view class="content">
				<view class="item" v-for="item in categorys" :key="item.id" @tap="gokindList(item.id)">
					<image :src="item.icon" mode=""></image>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
		
		
		<!-- 限时活动 -->
		<view class="recommendList">
			<view class="content">
				<view class="left">
					<image src="../../static/icons/actives.png" mode=""></image>
					<text>限时活动:</text>
				</view>
				<view class="right">
					<swiper class="banner" active-class="banner" changing-class="banner" duration="1000" vertical="true"
						circular="true" autoplay="true" interval="2000">
						<swiper-item id="swiper" class="banner1" v-for="item in recommendList" :key="item.productId">
							<navigator :url="`../kind/kindList/details/details?id=${item.productId}`">
							<view class="desc">
								<view class="item1">
									{{item.name}}
								</view>
								<view class="item2">
									<view class="priceOld">
										{{item.price}}元
									</view>
									<view class="priceNow">
										{{item.promotionPrice}}元
									</view>
								</view>
							</view>
							</navigator>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		
		
		<!--热门推荐  -->
		<view class="hottitle">
			热门推荐
		</view>
		<view class="hotList">
			<swiper autoplay="true" duration="2000" interval="2000" circular="true" previous-margin	="230rpx" next-margin="230rpx"  class="swiper">
				<swiper-item class="content" v-for="item in hotList" :key="item.id">
					 <navigator :url="`../kind/kindList/details/details?id=${item.id}`">  
					<view class="swiper-item">
						<image :src="item.pic" mode=""></image>
						<text>{{item.name}}</text>
					</view>
					</navigator>
				</swiper-item>
			</swiper>
		</view>
		
		
		<!-- 新品推荐 -->
		<view class="hottitle">
			新品推荐
		</view>
		<view class="lejuLatestProducts">
			<view class="content">
				<view class="item" v-for="item in lejuLatestProducts" :key="item.id" @tap="goDetail(item.id)">
					
					<image :src="item.pic" mode=""></image>
					<view class="desc">
						<view>{{item.name}}</view>
						<view>价格:&nbsp;&nbsp;{{item.price}}</view>
					</view>
					
				</view>
			</view>
		</view>
		
		
		<!-- 猜你喜欢 -->
		<view class="hottitle">
			猜你喜欢
		</view>
		<view class="saleMostProducts">
			<view class="content" v-for="item in saleMostProducts" :key="item.id">
				<navigator :url="`../kind/kindList/details/details?id=${item.id}`">
				<image :src="item.pic" mode=""></image>
				<view class="title">
					{{item.brandName}}
				</view>
				<view class="desc">
					<text>￥{{item.price}}元</text>
					<text>乐居</text>
				</view>
				</navigator>
			</view>
		</view>
		
		<!-- 顶部搜索栏 -->
		<view class="searchbar">
			<view class="left">
				<image src="../../static/icons/chat.png"></image>
			</view>
			<view class="right">
				<image src="../../static/icons/search.png" mode=""></image>
				<image src="../../static/icons/cart.png" mode="" @tap="goCart"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		bannerAds,
		categorys,
		recommendList,
		hotList,
		lejuLatestProducts,
		saleMostProducts,

	} from "@/api/home/home.js"
	export default {
		data() {
			return {
				title: 'Hello',
				topBar: 0,
				banner: "",
				categorys: "",
				recommendList: "",
				hotList: "",
				lejuLatestProducts:"",
				saleMostProducts:""

			}
		},
		onPullDownRefresh(){
			this.init()
				
		},
		async onLoad() {
			// #ifdef MP-WEIXIN
			this.topBar = uni.getMenuButtonBoundingClientRect().height + uni.getMenuButtonBoundingClientRect().top
			// #endif
			this.init()
			
		},
		methods: {
			async init(){
					var banner= await bannerAds()
						this.banner = banner.data.items
					var cate=await categorys("1308336521604599809")
						this.categorys = cate.data.category.children
					var recom=await recommendList()
						this.recommendList = recom.data.items
						console.log(this.recommendList);
					var hot = await hotList()
						this.hotList = hot.data.items
					var lates=await lejuLatestProducts()
						this.lejuLatestProducts=lates.data.productList
					var sale =await saleMostProducts()
						this.saleMostProducts=sale.data.items
					// 请求完所有数据取消下拉刷新
					uni.stopPullDownRefresh()
				},
				gokindList(val){
					console.log(1111);
					uni.navigateTo({
						url:`../kind/kindList/kindList?id=${val}`
					})
				},
				goDetail(val){
					uni.navigateTo({
						url:`../kind/kindList/details/details?id=${val}`
					})
				},
				goCart(){
					uni.navigateTo({
						url:"../mine/cart/cart/cart"
					})
				}
				
		}
	}
</script>

<style lang="scss" scoped>
	@import "home.scss"
</style>
