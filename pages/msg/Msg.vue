<template>
	<mason-homepage :navTitle="''" :showNavBack="false" :diyLeft="true" :showSafeArea="true">
		<!-- 导航左侧插槽 -->
		<text slot="diyLeft" class="left-text">消息中心</text>
		<!-- 导航右侧插槽 -->
		<view slot="diyRight" class="right-group">
			<image class="group-item" @click="checkUserGroup" mode="aspectFit" src="../../static/images/common/group.png"></image>
			<image class="group-item" @click="checkMsg" mode="aspectFit" src="../../static/images/common/msg.png"></image>
		</view>
		<!-- 页面内容插槽 -->
		<view slot="diyContent">
			
		</view>
	</mason-homepage>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			
		},
		methods: {
			/* 右侧按钮一 */
			checkUserGroup(){
				uni.showToast({
					icon: 'none',
					title: '您点击了用户群组'
				})
			},
			/* 右侧按钮二 */
			checkMsg(){
				uni.showToast({
					icon: 'none',
					title: '您点击了消息'
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.left-text{
		font-size: 14px;
		color: #000000;
	}
	.group-item{
		width: 18px;
		height: 18px;
		margin-left: 20px;
	}
</style>
