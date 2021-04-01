<template>
	<view class="goodCollect">
		<view class="content">
			<view class="item" v-if="isShow" v-for="item in list" :key="item.id"  @tap="goDetail(item.id)">
				<image :src="item.pic" mode=""></image>
				<view class="desc">
					<view class="title">
						{{item.description}}
					</view>
					<view class="price">
						<text>收藏</text>
						<text>￥{{item.price}}</text>
					</view>
				</view>
			</view>
			<view class="none" v-else>
				暂无数据
			</view>
		</view>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShow:false,
				list:[]
			};
		},
		onLoad() {
			if(uni.getStorageSync("collects")){
				this.isShow = true
				this.list = uni.getStorageSync("collects")
				console.log(this.list);
			}
		},
		methods:{
			goDetail(val){
				uni.navigateTo({
					url:`/pages/kind/kindList/details/details?id=${val}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
@import  "./collect.scss"
</style>
