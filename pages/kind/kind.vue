<template>
	<view class="content">
		
		<view class="kind">
			<view class="categorys" @tap="gokindList(item.id)"  v-for="item in categorys" :key="item.id">
				<view class="banner">
					<view class="title">{{item.name}}</view>
					<view class="rightimg">
						<image :src="item.icon" mode=""></image>
					</view>
				</view>
				
			</view>
		</view>
		
	</view>
</template>

<script>
	import{
		categorys,
	} from "../../api/kind/kind.js"
	export default {
		data() {
			return {
				topBar:0,
				categorys:"",
				
			}
		},
		onLoad() {
			// #ifdef MP-WEIXIN
				this.topBar=uni.getMenuButtonBoundingClientRect().height+uni.getMenuButtonBoundingClientRect().top
			// #endif
			categorys("1308336521604599809").then(res=>{
				console.log(res);
				this.categorys=res.data.category.children
			})
			
		},
		methods: {
			gokindList(val){
				uni.navigateTo({
					url:`./kindList/kindList?id=${val}`
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	@import  "./kind.scss"
</style>
