<template>
	<view class="contentt">
		<view class="total">
			<view class="header">
				<view :class="{active:change==true}" @tap="changeContent">
					精选文章
				</view>
				<view :class="{active:change==false}" @tap="changeContent1">
					品牌列表
				</view>
			</view>

			<view class="actrcle" v-if="change">
				<view class="content" v-for="(item,index) in Article" :key="item.id">
					<view class="item" @tap="goDetail(item.id)">
						<image :src="item.coverImg" mode=""></image>
						<view class="nameAuthor">
							<view class="title1">{{item.title}}</view>
							<view class="author">{{item.author}}</view>
						</view>
					</view>
					<view class="more">
						<view class="view">
							<uni-icons class="see" type="eye" size="30" color="gray"></uni-icons>
							<text>{{item.viewCount}}</text>
						</view>
						<view class="star" @tap="star(item,index)">
							<uni-icons  :color="item.color?'red':'black'" type="star" size="30"></uni-icons>
						</view>
					</view>
				</view>
			</view>

			<view class="brandList" v-else>
				<view class="item" v-for="item in Brands" :key="item.id">
					<view class="brandimg">
						<image :src="item.logo" mode=""></image>
					</view>
					<view class="detail">
						<view class="title">
							{{item.name}}
						</view>
						<view class="desc">
							{{item.brandStory}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		findArticleByPage,
		findBrandsByPage,
		productArticle
	} from "@/api/find/find.js"
	import login from "@/pages/mixins/mixins.js"
	export default {
		data() {
			return {
				list:{},
				change: true,
				Article: [],
				Brands: [],
			}
		},
		mixins:[login],
		onLoad() {
			
			
			findArticleByPage(1, 20).then(res => {
				console.log(res);
				res.data.rows.forEach(ele=>{
					ele.color = false
				})
				
				var item = uni.getStorageSync("star")
				if(item){
					res.data.rows.forEach(ele=>{
						item.forEach(eles=>{
							if(eles.id==ele.id){
								ele.color = true
								
							}
						})
					})
				}
				this.Article = res.data.rows
			})

			findBrandsByPage(1, 20).then(res => {
				console.log(res);
				this.Brands = res.data.rows
			})
			
			

		},
		methods: {
			star(val,index){
				console.log(val,index);
				if(this.checkLogin()){
					//如果已经登录,看本本地是否有star
					var star = uni.getStorageSync("star")
					if(star){
						var item = star.find(ele=>ele.id==val.id)
						if(item){
							var index = star.findIndex(ele=>ele.id==val.id)
							this.Article.forEach(ele=>{
								if(ele.id==item.id){
									ele.color = false
									uni.showToast({
										icon:"none",
										title:"取消成功"
									})
								}
							})
							star.splice(index,1)
							uni.setStorageSync("star",star)
							
						}else{
							star.push(val)
							uni.setStorageSync("star",star)
							this.Article.forEach(ele=>{
								if(ele.id==val.id){
									ele.color = true
									uni.showToast({
										icon:"none",
										title:"收藏成功"
									})
								}
							})
						}
					}else{
						var arr=[]
						arr.push(val)
						uni.setStorageSync("star",arr)
						this.Article.forEach(ele=>{
							if(ele.id==val.id){
								ele.color = true
								uni.showToast({
									icon:"none",
									title:"收藏成功"
								})
							}
						})
					}
				}else{
					this.checkLogin()
				}
			},
			goDetail(val) {
				uni.navigateTo({
					url: `ArticleDetail/ArticleDetail?id=${val}`
				})
			},
			changeContent() {
				this.change = true
			},
			changeContent1() {
				this.change = false
			}

		}
	}
</script>

<style lang="scss" scoped>
	@import "./find.scss"
</style>
