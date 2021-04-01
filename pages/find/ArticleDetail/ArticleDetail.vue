<template>
	<view class="details">
		<view class="total">
			<view class="content">
				<view class="title">
					{{list.title}}
				</view>
				<view class="author">
					作者:{{list.author}}
				</view>
				<view class="createTime">
					时间:{{list.createTime}}
				</view>
				<view class="summary">
					概要描述:{{list.summary}}
				</view>
				<view class="coverImg">
					<image :src="list.coverImg" mode=""></image>
				</view>
				<view class="">
					<mp-html :tag-style="List" :content="list.content1" />
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import {
		productArticle
	} from "@/api/find/find.js"
	export default {
		data() {
			return {
				list:[],
				List:{
					
				}
				
			};
		},
		onLoad(options){
			console.log(options.id);
			productArticle(options.id).then(res=>{
				console.log(res)
				this.list=res.data.productArticle
				
			})
		}
	}
</script>

<style lang="scss" scoped>
@import  "./ArticleDetail.scss"
</style>
