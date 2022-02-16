import Vue from 'vue'
import App from './App'

/* 全局组件 - 自定义页面容器 */
import HomePage from 'components/HomePage/HomePage.vue'
Vue.component('HomePage', HomePage)

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()