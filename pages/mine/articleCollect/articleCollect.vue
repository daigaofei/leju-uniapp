<template>
	<view class="goodCollect">
		<view class="content"  v-if="isShow">
			<view class="item" v-for="item in list" :key="item.id"  @tap="goDetail(item.id)">
				<image :src="item.coverImg" mode=""></image>
				<view class="desc">
					<view class="title">
						{{item.title}}
					</view>
				</view>
			</view>
			<view class="" style="width: 300rpx;">
				
			</view>
		</view>
		<view class="none" v-else>
			暂无数据
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
			if(uni.getStorageSync("star")&&uni.getStorageSync("star")!=""){
				this.isShow = true
				this.list = uni.getStorageSync("star")
				console.log(this.list);
			}
		},
		methods:{
			goDetail(val){
				uni.navigateTo({
					url:`/pages/find/ArticleDetail/ArticleDetail?id=${val}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
@import  "./articleCollect.scss"
</style>
