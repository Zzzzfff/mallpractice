<template>
  <div class="main-tabbar">
    <tabbar>
      <tabbar-item
        v-for="(item, index) in list"
        :key="index"
        :path="item.path"
        :activeColor="item.activeColor"
      >
        <img :src="item.imgPath" alt slot="item-icon" />
        <img :src="item.activeImgPath" alt slot="item-icon-active" />
        <span slot="item-text">{{item.name}}</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import Tabbar from "common/tabbar/TabBar";
import TabbarItem from "common/tabbar/TabBarItem";

// 动态绑定图片路径方式（webpack打包时，会对图片路径进行特殊处理）
import homeImgPath from "@/assets/images/tabbar/home.svg";
import homeActiveImgPath from "@/assets/images/tabbar/home_active.svg";

import categoryImgPath from "@/assets/images/tabbar/category.svg";
import categoryActiveImgPath from "@/assets/images/tabbar/category_active.svg";

import shopcartImgPath from "@/assets/images/tabbar/shopcart.svg";
import shopcartActiveImgPath from "@/assets/images/tabbar/shopcart_active.svg";

import profileImgPath from "@/assets/images/tabbar/profile.svg";
import profileActiveImgPath from "@/assets/images/tabbar/profile_active.svg";

export default {
  name: "MainTabbar",
  components: {
    Tabbar,
    TabbarItem
  },
  data() {
    return {
      list: [
        {
          name: "首页",
          path: "/home",
          activeColor: "red",
          imgPath: homeImgPath,
          activeImgPath: homeActiveImgPath
        },
        {
          name: "分类",
          path: "/category",
          activeColor: "red",
          imgPath: categoryImgPath,
          activeImgPath: categoryActiveImgPath
        },
        {
          name: "购物车",
          path: "/shopcart",
          activeColor: "red",
          imgPath: shopcartImgPath,
          activeImgPath: shopcartActiveImgPath
        },
        {
          name: "我的",
          path: "/profile",
          activeColor: "red",
          imgPath: profileImgPath,
          activeImgPath: profileActiveImgPath
        }
      ]
    };
  }
};
</script>

<style scoped>
</style>