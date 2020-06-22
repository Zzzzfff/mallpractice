import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false


// 使用土司
// 1.安装toast
// 2.导入
// 3.在vue实例上安装toast
Vue.use(toast)

// 使用图片懒加载插件
// 1.安装vue-lazyload
// 2.导入
// 3.在vue实例上安装VueLazyLoad
// 4.需要将<img :src=""/>中的:src改为v-lazy
Vue.use(VueLazyLoad, {
  loading: require('./assets/images/common/placeholder.png')
})

// 解决移动端300ms延迟步骤
// 1.安装fastclick
// 2.导入
// 3.调用attach函数
FastClick.attach(document.body)

// 在Vue原型上定义事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
