<template>
	<view class="homepage" :style="'width:' + systemInfo.windowWidth + 'px;height:' + systemInfo.windowHeight + 'px;'">
		<!-- 状态栏 -->
		<!-- #ifdef APP-PLUS || MP-WEIXIN -->
		<view class="statusbar" v-if="showStatusBar" :style="'background-color:' + statusBackground + ';height:' + systemInfo.statusBarHeight + 'px;'"></view>
		<!-- #endif -->
		<!-- 导航栏 -->
		<view class="navbar" v-if="showNavBar" :style="'background-color:' + navBackground + ';height:44px;'">
		    <!-- 左侧 -->
			<view class="nav-lt" @click="navHander('left')">
				<slot v-if="diyLeft" name="diyLeft"></slot>
				<image v-else-if="!diyLeft && showNavBack" class="lt-icon" mode="aspectFit" src="@/static/images/common/back.png"></image>
			</view>
			<!-- 中间 -->
			<view class="nav-ct">
				<slot v-if="diyCenter" name="diyCenter"></slot>
				<text v-else class="ct-title">{{navTitle}}</text>
			</view>
			<!-- 右侧 -->
			<view class="nav-rt" @click="navHander('right')">
				<slot name="diyRight"></slot>
			</view>
		</view>
		<!-- 页面容器 -->
		<view class="content" @touchstart="touchEvent($event,'start')" @touchmove="touchEvent($event,'move')" @touchend="touchEvent($event,'end')" :style="'background-color:' + contentBackground + ';height:' + (systemInfo.windowHeight-(showStatusBar?systemInfo.statusBarHeight:0)-(showNavBar?44:0)) + 'px;'">
			<scroll-view :scroll-y="pulldown.scrollStatus" class="content-scroll" @scrolltoupper="scrollEvent($event,'scrolltoupper')" @scrolltolower="scrollEvent($event, 'scrolltolower')" @scroll="scrollEvent($event,'scroll')">
				<!-- 下拉刷新块 -->
				<view class="pull" :style="'height:' + Math.ceil(pulldown.distance*0.5) + 'px'">
					<text class="pull-msg">{{pulldown.msg}}</text>
				</view>
				<!-- 内容插槽 -->
				<slot name="diyContent"></slot>
				<!-- 底部安全区域 -->
				<view class="safearea" v-if="showSafeArea" :style="'height:' + systemInfo.safeArea.top + 'px;background-color:' + contentBackground +';'"></view>
			</scroll-view>
		</view>
		<!-- fixed元素插槽 -->
		<slot name="diyFixed"></slot>
		<!-- 弹出层等请使用子窗体 -->
	</view>
</template>

<script>
	export default {
		props:{
			/* ***************** 状态栏 - 配置 ***************** */
			/* 状态栏 - 是否需要 */
			showStatusBar: {type:Boolean, default:true},
			/* 状态栏 - 背景色 */
			statusBackground: {type:String, default:'#ffffff'},
			/* ***************** 导航栏 - 配置 ***************** */
			/* 导航栏 - 是否需要 */
			showNavBar: {type:Boolean, default:true},
			/* 导航栏 - 背景色 */
			navBackground: {type:String, default:'#ffffff'},
			/* 导航栏 - 是否需要返回按钮 */
			showNavBack: {type:Boolean, default:true},
			/* 导航栏 - 是否自定义左侧 */
			diyLeft: {type:Boolean, default:false},
			/* 导航栏 - 是否自定义标题 */
			diyCenter: {type:Boolean, default:false},
			/* 导航栏 - 标题 */
			navTitle: {type:String, default:'App Template'},
			/* 导航栏 - 是否自定义右侧 */
			diyRight: {type:Boolean, default:false},
			/* ***************** 页面容器 - 配置 ***************** */
			/* 页面容器 - 背景色 */
			contentBackground: {type:String, default:'#f8f8f8'},
			/* 页面容器 - 下拉刷新 是否开启 */
			showRefresh: {type:Boolean, default:false},
			/* 页面容器 - 下拉刷新 刷新完成时间 */
			refreshTime: {type:Number, default:0},
			/* 页面容器 - 上滑加载 */
			showUpLower: {type:Boolean, default:false},
			/* 底部安全区域 */
			showSafeArea: {type:Boolean, default:false},
		},
		data() {
			return {
				/* 页面容器 - 下拉刷新 */
				pulldown: {
					// 是否开启滚动
					scrollStatus: true,
					// 是否置顶
					flag: 1,
					// 初始手指高度
					startY: 0,
					// 手指滑动距离
					distance: 0,
					// 下拉刷新文本
					msg: '下拉刷新',
				},
			};
		},
		computed:{
			/* 系统属性 */
			systemInfo(){
				const systemInfo = uni.getSystemInfoSync();
				return systemInfo;
			}
		},
		watch:{
			/* 下拉刷新结束 */
			refreshTime(val,old){
				if(val != 0){
					this.touchEvent({},'redo')
				}
			},
		},
		methods: {
			/* 导航栏事件 */
			navHander(ty){
				switch (ty){
					case 'left':
						this.$emit('leftClick')
					break;
					case 'right':
						this.$emit('rightClick')
					break;
					default:
					break;
				}
			},
			/* 手指事件 */
			touchEvent(e, ty){
				if(!this.showRefresh){
					return;
				}
				switch (ty){
					case 'start':
						this.pulldown.startY = e.changedTouches[0].pageY
					break;
					case 'move':
						if(e.changedTouches[0].pageY > this.pulldown.startY && this.pulldown.flag == 1){
							this.pulldown.scrollStatus = false
							if(e.changedTouches[0].pageY - this.pulldown.startY <= 300){
								this.pulldown.distance = (e.changedTouches[0].pageY-this.pulldown.startY)
								if(e.changedTouches[0].pageY-this.pulldown.startY >= 200){
									this.pulldown.msg = '松开刷新'
								}else{
									this.pulldown.msg = '下拉刷新'
								}
							}
						}
					break;
					case 'end':
						if(this.pulldown.flag == 0 || this.pulldown.msg == '下拉刷新'){
							this.touchEvent('none','redo');
							return;
						}else if(this.pulldown.msg == '松开刷新'){
							this.pulldown.distance = 200
							this.pulldown.msg = '正在刷新...'
							this.refreshData();
						}
					break;
					case 'redo':
						this.pulldown.scrollStatus = true
						var interval = setInterval(()=>{
							if(this.pulldown.distance > 0){
								if(this.pulldown.distance - 10 < 0){
									this.pulldown.distance = 0
								}else{
									this.pulldown.distance -= 10
								}
							}else{
								clearInterval(interval);
							}
						},5)
					break;
				}
			},
			/* 滚动事件 */
			scrollEvent(e, ty){
				switch (ty){
					case 'scrolltoupper':
						this.pulldown.flag = 1
					break;
					case 'scrolltolower':
						this.$emit('loadingMore');
					break;
					case 'scroll':
						if(e.detail.scrollTop > 0){
							this.pulldown.flag = 0
						}
					break;
					default:
					break;
				}
			},
			/* 下拉刷新 */
			refreshData(){
				this.$emit('pullRefresh')
			}
		},
	}
</script>

<style>
	scroll-view ::-webkit-scrollbar {
		display: none;
		width: 0;
		height: 0;
		background-color: transparent;
	}
</style>
<style lang="less" scoped>
	.homepage{
		position: relative;
		.statusbar{
			width: 100%;
		}
		.navbar{
			width: 100%;
			position: relative;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			&::before{
				position: absolute;
				content: '';
				bottom: 0px;
				background: rgba(0,0,0,0.3);
				width: 100%;
				height: 1px;
				transform: scaleY(0.5);
				transform-origin: 0 0;
				-webkit-transform: scaleY(0.5);
				-webkit-transform-origin: 0 0;
			}
			.nav-lt{
				height: 80%;
				padding: 0px 10px 0px 10px;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: flex-start;
				position: absolute;
				left: 0;
				.lt-icon{
					width: 16px;
					height: 16px;
				}
			}
			.nav-ct{
				width: 60%;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				.ct-title{
					font-size: 15px;
					color: #000000;
					white-space: nowrap;
					word-break: break-all;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
			.nav-rt{
				height: 80%;
				padding: 0px 10px 0px 10px;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: flex-start;
				position: absolute;
				right: 0;
			}
		}
		.content{
			width: 100%;
			.content-scroll{
				width: 100%;
				height: 100%;
				.pull{
					width: 100%;
					height: 200px;
					display: flex;
					align-items: center;
					justify-content: center;
					overflow: hidden;
					.pull-msg{
						font-size: 14px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						overflow: hidden;
						color: #666666;
					}
				}
				.up{
					width: 100%;
					height: 44px;
					display: flex;
					align-items: center;
					justify-content: center;
					.up-msg{
						font-size: 14px;
						font-family: PingFangSC-Regular, PingFang SC;
						font-weight: 400;
						overflow: hidden;
						color: #666666;
					}
				}
				.safearea{
					width: 100%;
				}
			}
		}
	}
</style>
