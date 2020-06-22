<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      ref="tabControl1"
      :titles="['流行', '新款', '精选']"
      @tabClick="tabCtrlClick"
      class="tab-control"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="home-scroll"
      ref="scroll"
      :probeType="3"
      :pullUpLoad="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control ref="tabControl2" :titles="['流行', '新款', '精选']" @tabClick="tabCtrlClick"></tab-control>
      <goods-list :cgoods="goods[currentType].list"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "common/navbar/NavBar";
import Scroll from "common/scroll/Scroll";
import TabControl from "content/tabcontrol/TabControl";
import GoodsList from "content/good/GoodsList";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import { getHomeMultidata, getHomeGood } from "network/home";
import { itemListenerMixin, backTopMixin } from "@/common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    HomeSwiper,
    RecommendView,
    FeatureView
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    };
  },

  mixins: [itemListenerMixin, backTopMixin],

  created() {
    this.getHomeMultidatas();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 涉及scroll的内容都放在mounted里面
  },

  destroyed() {
    console.log("destroyed");
  },
  activated() {
    // 【注意】别忘记了刷新，否则scroll可能会回到顶部
    this.$refs.scroll.refresh();
    // console.log(this.saveY);
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
    // console.log(this.saveY);
    // 离开主页时关闭bus事件监听
    this.$bus.$off("imageLoad", this.imageListener);
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  methods: {
    getHomeMultidatas() {
      getHomeMultidata().then(res => {
        // console.log(res.data.recommend);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },

    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGood(type, page).then(res => {
        // console.log(res)
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 上拉动作完成后要结束动作，否则只能实现一次上拉动作
        this.$refs.scroll.finishPullUp();
      });
    },

    tabCtrlClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }

      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    // 获取scroll的position
    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.isShowBackTop = position.y < -1000;

      // 2.判断tabControl1是否吸顶
      // console.log(this.tabOffsetTop);
      this.isTabFixed = position.y < -this.tabOffsetTop;
      // console.log(this.isTabFixed);
    },

    loadMore() {
      this.getHomeGoods(this.currentType);

      this.$refs.scroll.scroll.refresh();
    },

    debounce(func, delay) {
      return function(...args) {
        let timer = null;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },

    swiperImageLoad() {
      //  获取tabControl2的offsetTop
      // 【注意】所有的组件都有一个属性$el,获取组件中的元素

      // console.log(this.$refs.tabControl2.$el.offsetTop);
      // 【注意】this.tabOffsetTop是正值
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    }
  }
};
</script>

<style>
#home {
  padding-top: 0px;
  height: 100vh;
  position: relative;
}

.home-nav-bar {
  background-color: var(--color-tint);
  color: #fff;

  /* position: fixed;
    left: 0;
    right:0;
    top: 0;
    z-index: 9; */
}

.tab-control {
  position: relative;
  z-index: 9;
}

.home-scroll {
  /* height: calc(100% - 93px); */

  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  position: absolute;

  overflow: hidden;
}
</style>