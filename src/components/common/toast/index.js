import Toast from './Toast'

const obj = {}

obj.install = function (Vue) {
  // 插件方式封装的思路
  // 1.在dom上挂载组件的$el
  // document.body.appendChild(Toast)
  // 2.在Vue实例上继承组件的属性和方法
  // Vue.prototype.$toast = Toast

  // 插件方式封装的步骤


  // 1.创建组件构造器
  //   var author = Vue.extend({
  //     template: "<p><a :href='url'>{{author}}</a></p>",
  //     data: function () {
  //       return {
  //         author: 'vamous',
  //         url: 'http://blog.csdn.net/Dear_Mr/article/details/72614370'
  //       }
  //     }
  //   });
  const toastConstructor = Vue.extend(Toast)

  // 2.new的方式，根据组件构造器，可以创建出来一个组件对象
  const toast = new toastConstructor()

  // 3.将组件对象手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))

  // 4.将toast.$el加载到dom上，toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  // 5.在Vue实例上继承组件组件对象的属性和方法
  Vue.prototype.$toast = toast
}

export default obj
