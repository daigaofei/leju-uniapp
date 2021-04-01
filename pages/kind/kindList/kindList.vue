<template>
	<view class="kindList">

		
		
		<view class="navitem">
			<view @tap="color(index)" :class="{orange:index==currentTan}" v-for="(item,index) in list" :key="item.name" >
				<view class="items">
						<view class="title">
								{{item.name}}
						</view>
						<view class="icons" v-if="index==1 || index==2 ">
							<uni-icons class="icons1" :color="item.selectColor == 'up' ? 'orange' : '#fff'"  type="arrowup" size="15"></uni-icons>
							<uni-icons class="icons2" :color="item.selectColor == 'down' ? 'orange' : '#fff'"  type="arrowdown" size="15"></uni-icons>
						</view>
				</view>
				
			</view>
		</view>
		
		<view class="goods">
			<view class="content" v-for="item in goods" :key="item.id" @tap="goDetails(item.id)">
				<image :src="item.pic" mode=""></image>
				<view class="title">
					{{item.name}}
				</view>
				<view class="desc">
					<text>￥{{item.price}}元</text>
					<text>不凡</text>
				</view>
			</view>
			
		
		</view>
		
		
		<view class="footer">
			<view v-if="isShow">上拉加载更多...</view>
			<view v-else>没有更多了</view>
		</view>
	</view>
</template>

<script>
	import {
		findProductList
	} from "../../../api/kind/kindLIst/kindList.js"
	export default {
		data() {
			return {
				isShow:true,
				total:0,
				start:1,
				limit:5,
				id:"",
				goods:[],
				currentTan:0,
				isDesc:0, //升序1 降序0
				sortBy:"", //price sale
				list:[
					{
						name:"新品",
						selectColor:"default"
						
					},
					{
						name:"销量",
						selectColor:"default"
					},
					{
						name:"价格",
						selectColor:"default"
					},
					{
						name:"筛选",
						selectColor:"default"
					}
				]
			}
		},
		onLoad(opation){
			this.id=opation.id
			this.init()
		},
		//下拉刷新
		onPullDownRefresh(){
			this.goods = [];
			this.start = 1
			this.init()
		},
		//上拉加载
		onReachBottom(){
			if(this.total > this.goods.length){
				this.init()
			}else{
				this.isShow=false;
			}
			
		},
		methods: {
			goDetails(val){
				uni.navigateTo({
					url:`./details/details?id=${val}`
				})
			},
			color(val){
				this.currentTan = val
				this.start = 1;
				this.goods = [];
				var item = this.list.find((ele,index)=>index==val)
				console.log(item);
				this.list.forEach((ele,index)=>{
					if(index == val){
						
					}else{
						ele.selectColor="default"
					}
				})
				if(item.selectColor=="default"){
					item.selectColor="up"
					this.isDesc = 1
				}else if(item.selectColor=="up"){
					item.selectColor="down"
					this.isDesc = 0
				}else{
					item.selectColor="up"
					this.isDesc = 1
				}
				if(val==1){
					this.sortBy="sale"
				}else if(val==2){
					this.sortBy="price"
				}else{
					this.sortBy=""
				}
				
				this.init()
			},
			goback(){
				uni.switchTab({
					url:"../../kind/kind"
				})
			},
			init(val){
				var obj = {
					"categoryId":this.id,
					"isDesc":this.isDesc,
					"sortBy":this.sortBy
					}
				findProductList(this.start,this.limit,obj).then(res=>{
					console.log(res);
					// this.goods=res.data.rows
					this.goods.push(...res.data.rows)
					this.start++
					this.total = res.data.total
					uni.stopPullDownRefresh()
				})
				
			}
			
		}
	}
</script>

<style lang="scss" scoped>
@import  "./kindList.scss"
</style>
