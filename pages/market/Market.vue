<template>
	<mason-homepage :navTitle="'商城'" :showNavBar="false" :statusBackground="'#006c7f'" :contentBackground="'#006c7f'" :showSafeArea="true">
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
