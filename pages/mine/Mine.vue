<template>
	<mason-homepage :navTitle="'个人中心'" :showStatusBar="false" :showNavBar="false" :showSafeArea="true">
		<!-- 页面内容插槽 -->
		<view slot="diyContent">
			<image class="user-bg" mode="aspectFill" src="../../static/images/common/test.jpeg"></image>
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
			
		}
	}
</script>

<style lang="less" scoped>
	.user-bg{
		width: 750upx;
		height: 400upx;
	}
</style>
