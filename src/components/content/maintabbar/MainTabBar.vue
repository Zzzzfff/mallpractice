<template>
  <tab-bar>
      <tab-bar-item path='/home' activeColor='red'>
        <img src="~assets/images/tabbar/home.svg" alt="" slot="item-icon">
        <img src="~assets/images/tabbar/home_active.svg" alt="" slot="item-icon-active">
        <span slot="item-text">首页</span>
      </tab-bar-item>
      <tab-bar-item path='/category' activeColor='red'>
        <img src="~assets/images/tabbar/category.svg" alt="" slot="item-icon">
        <img src="~assets/images/tabbar/category_active.svg" alt="" slot="item-icon-active">
        <span slot="item-text">分类</span>
      </tab-bar-item>
      <tab-bar-item path='/shopcart' activeColor='red'>
        <img src="~assets/images/tabbar/shopcart.svg" alt="" slot="item-icon">
        <img src="~assets/images/tabbar/shopcart_active.svg" alt="" slot="item-icon-active">
        <span slot="item-text">购物车</span>
      </tab-bar-item>
      <tab-bar-item path='/profile' activeColor='red'>
        <img src="~assets/images/tabbar/profile.svg" alt="" slot="item-icon">
        <img src="~assets/images/tabbar/profile_active.svg" alt="" slot="item-icon-active">
        <span slot="item-text">我的</span>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from 'common/tabbar/TabBar'
import TabBarItem from 'common/tabbar/TabBarItem'

export default {
    name: "MainTbBar",
    components: {
        TabBar,
        TabBarItem,
    }
}
</script>

<style>

</style>