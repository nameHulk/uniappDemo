# mason-homepage uniapp-页面模版

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

- uni_modules导入，全局使用。状态栏、导航栏、下拉刷新、上滑加载等一次配置，或通过已有slot插槽，直接插入头部导航栏等区域，即可完成页面布局，无需手动编写设计布局，快速开发。

## 如何使用

### 1. uni_modules导入

- 确认uni_modules目录中是否存在mason-homepage插件，并更新至最新版本

### 2. 页面属性配置

- pages.json中注册页面时请配置app-plus下属性："bounce": "none", "titleNView": false
- 小程序请在pages.json中globalStyle增加配置："navigationStyle": "custom"

### 3. 直接使用模版编写内容
```html
	<template>
		<mason-homepage :navTitle="'App Template'" :showNavBack="false" :showSafeArea="true">
			<!-- 页面内容插槽 -->
			<view slot="diyContent">
				<!-- 编写你的页面内容 -->
			</view>
		</mason-homepage>
	</template>
```

### 附. 下拉刷新使用

- 组件绑定 刷新时间参数 :refreshTime="refreshTime" 刷新回调函数 @pullRefresh="pullRefresh"
```html
	<template>
		<mason-homepage :navTitle="'App Template'" :refreshTime="refreshTime" @pullRefresh="pullRefresh" :showNavBack="false" :showSafeArea="true">
			<!-- 页面内容插槽 -->
			<view slot="diyContent">
				<!-- 编写你的页面内容 -->
			</view>
		</mason-homepage>
	</template>
```

- 刷新函数执行
```js
	pullRefresh(){
		// 你的刷新过程
		// ......
		// 刷新结束 - 更新refreshTime 即触发下拉刷新回弹 建议参考示例工程配合uni.showLoading使用
		this.refreshTime = Date.parse(new Date()) // refreshTime已在data声明
	}
```

## 参数说明 - 详细请对比示例工程

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
| refreshTime       | 下拉刷新完成时间(更新此值即回弹) |  Number |
| showUpLower       | 是否开启上滑加载           |  Boolean |
| showSafeArea      | 是否开启底部安全区域       |  Boolean |

## 函数说明 - 详细请对比示例工程

| 函数               | 说明                    |
| -------------     | ------------------------|
| @leftClick        | 导航栏左侧按钮点击事件      |
| @rightClick       | 导航栏右侧按钮点击事件      |
| @pullRefresh      | 下拉刷新触发事件           |
| @loadingMore      | 上滑加载触发事件           |

## 插槽说明 - 详细请对比示例工程

| 插槽               | 说明                    |
| -------------     | ------------------------|
| slot="diyLeft"    | 导航栏左侧插槽，需将参数中diyLeft绑定为true |
| slot="diyCenter"  | 导航栏中间插槽，需将参数中diyCenter绑定为true |
| slot="diyRight"   | 导航栏右侧插槽，槽默认为空直接使用 |
| slot="diyContent" | 页面容器插槽，槽默认为空直接使用，所有页面元素写在此槽中 |
| slot="diyFixed"   | 页面绝对布局元素插槽，槽默认为空直接使用，完整插入，需手动编写fixed属性且z-index大于9 |
| slot="diyPopup"   | 页面弹出层元素插槽，槽默认为空直接使用，完整插入，App端建议直接使用子窗体，其它建议此插槽配合uni-popup使用 |

