<template>
	<HomePage :navTitle="'App Template'" :showNavBack="false" :showSafeArea="true" :showRefresh="true" :refreshTime="refreshTime" @pullRefresh="pullRefresh" @loadingMore="loadingMore" @rightClick="rightClick">
		<!-- 导航右侧插槽 -->
		<image slot="diyRight" class="location-icon" mode="aspectFit" src="../../static/images/common/location.png"></image>
		<!-- 页面内容插槽 -->
		<view slot="diyContent">
			<view class="list" v-for="(item,index) in dataList" :key="index">
				<image class="list-img" mode="aspectFill" src="../../static/images/common/test.jpeg"></image>
				<text class="list-no">第{{index}}张</text>
			</view>
		</view>
		<view slot="diyFixed" class="fixed-btn" @click="goSecondPage"></view>
	</HomePage>
</template>

<script>
	export default {
		data() {
			return {
				/* 下拉刷新完成时间 */
				refreshTime: 0,
				/* 列表模拟数据 */
				dataList: [{},{},{},{},{},{},{},{},{},{},{}],
				/* 子窗体 */
				subPopup: null,
			}
		},
		onLoad() {
			/* 捕获子窗体事件 */
			uni.$on('cityPopupClick', (val) => {
				if(val != 'cancel'){
					uni.showToast({
						icon: 'none',
						title: '您选择了' + val
					})
				}
				this.subPopup.hide('slide-out-bottom', 300);
			})
		},
		onUnload(){
			// 卸载子窗体事件
			uni.$off('cityPopupClick');
		},
		methods: {
			/* 导航 - 右侧按钮 */
			rightClick(){
				this.subPopup = uni.getSubNVueById('CityPopup')
				this.subPopup.show("slide-in-bottom",300)
			},
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
			/* 二级页面 */
			goSecondPage(){
				uni.navigateTo({
					url: '../test/Test'
				})
			},
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
