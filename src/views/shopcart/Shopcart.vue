<template>
  <div class="shopcart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <shopcart-list></shopcart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'common/navbar/NavBar'
import ShopcartList from "./childComps/ShopcartList"
import CartBottomBar from "./childComps/CartBottomBar"

// 【注】将vuex的store对象的getters映射到组件的计算属性computed
//  处理不同组件之间使用同一个方法(该方法要用到store)
import {mapGetters} from 'vuex'

export default {
    name: "Shopcart",
    components: {
      NavBar,
      ShopcartList,
      CartBottomBar
    },
    computed: {
      // 1.mapgetters用法一
      ...mapGetters(['cartLength'])

      // 2.mapgetters用法二
      // ...mapGetters({
      //   length: 'cartLength',
      //   list: 'cartList'
      // })
    }
}
</script>

<style scoped>
  .shopcart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>