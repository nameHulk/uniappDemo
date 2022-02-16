# uniapp 页面模版

仅作为方便大家快速开发的页面通用模版，无偿使用，有问题请指出，我一样需要不断进步。

---

## 模版内容

- 自定义状态栏
- 自定义导航栏
- 自定义页面
- 自定义安全距离
- 自定义下拉刷新
- 自定义上滑加载
- 自定义Fixed插槽
- 子窗体使用范例

## 优势

- 组件引入，全局使用快速开发。配置是否需要状态栏、导航栏等参数，或通过已有slot插槽，直接插入头部导航栏等区域，即可完成页面布局，直接编写内容即可。

## 如何使用

### 1. 导入组件至components
### 2. main.js注册全局组件
```js
	/* 全局组件 - 自定义页面容器 */
	import HomePage from 'components/HomePage/HomePage.vue'
	Vue.component('HomePage', HomePage)
```
### 3. 页面内直接使用模版
```html
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
			<!-- Fixed插槽 -->
			<view slot="diyFixed" class="fixed-btn" @click="goSecondPage"></view>
		</HomePage>
	</template>
```



## HomePage参数说明

| 参数               | 说明                    |  类型   |
| -------------     | ------------------------| -----  |
| showStatusBar     | 是否需要状态栏            |  Boolen |
| statusBackground  | 状态栏背景色              |  String |
| showNavBar        | 是否需要导航栏            |  Boolean |
| navBackground     | 导航栏背景色              |  String |
| showNavBack       | 是否需要导航返回按钮       |  Boolean |
| diyLeft           | 是否开启自定义导航左侧按钮  |  Boolean |
| diyCenter         | 是否开启自定义导航中间内容  |  Boolean |
| navTitle          | 导航栏页面标题            |  String |
| diyRight          | 是否开启自定义导航右侧按钮  |  Boolean |
| contentBackground | 页面容器背景色            |  String |
| showRefresh       | 是否开启下拉刷新           |  Boolean |
| refreshTime       | 下拉刷新完成时间(提交即回弹) |  Number |
| showUpLower       | 是否开启上滑加载           |  Boolean |
| showSafeArea      | 是否开启底部安全区域       |  Boolean |

## HomePage函数说明

| 函数               | 说明                    |
| -------------     | ------------------------|
| @leftClick        | 导航栏左侧按钮点击事件      |
| @rightClick       | 导航栏右侧按钮点击事件      |
| @pullRefresh      | 下拉刷新触发事件           |
| @loadingMore      | 上滑加载触发事件           |

