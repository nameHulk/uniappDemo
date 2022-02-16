<template>
	<mason-homepage :navTitle="'二级页面'" :showSafeArea="true" :showRefresh="true" :refreshTime="refreshTime" @pullRefresh="pullRefresh" @loadingMore="loadingMore" @leftClick="leftClick">
		<!-- 页面内容插槽 -->
		<view slot="diyContent">
			<view class="list" v-for="(item,index) in dataList" :key="index">
				<image class="list-img" mode="aspectFill" src="../../static/images/common/test.jpeg"></image>
				<text class="list-no">第{{index}}张</text>
			</view>
		</view>
	</mason-homepage>
</template>

<script>
	export default {
		data() {
			return {
				/* 下拉刷新完成时间 */
				refreshTime: 0,
				/* 列表模拟数据 */
				dataList: [{},{},{},{},{},{},{},{},{},{},{}]
			}
		},
		onLoad() {
			
		},
		methods: {
			/* 示例- 下拉刷新 */
			pullRefresh(){
				uni.showLoading({
					mask: true
				})
				setTimeout(() =>{
					this.refreshTime = Date.parse(new Date())
					this.dataList = [{},{},{},{},{},{},{},{},{},{},{}]
					uni.hideLoading()
				},1500)
			},
			/* 示例- 上滑加载 */
			loadingMore(){
				setTimeout(() =>{
					let arr = [{},{},{},{},{},{},{},{},{},{},{}]
					this.dataList.push(...arr)
				},200)
			},
			/* 导航 - 左侧按钮 */
			leftClick(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="less" scoped>
	.location-icon{
		width: 18px;
		height: 18px;
	}
	.list{
		width: 710upx;
		height: 240upx;
		border-radius: 8px;
		background-color: #ffffff;
		box-shadow: 0px 0px 8px rgba(0,0,0,0.1);
		margin: 10px auto;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		position: relative;
		.list-img{
			width: 710upx;
			height: 240upx;
			border-radius: 8px;
		}
		.list-no{
			position: absolute;
			z-index: 1;
			font-size: 16px;
			color: #004e00;
		}
	}
	.fixed-btn{
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
		background-color: #4cd964;
		position: fixed;
		bottom: 50px;
		right: 20upx;
		z-index: 2;
		box-shadow: 0px 0px 8px rgba(255,255,255,1);
	}
</style>
