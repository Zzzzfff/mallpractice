<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shopinfo="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @goodsItemLoad="goodsImageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :commentInfo="userComment" ref="comment"></detail-comment-info>
      <goods-list :cgoods="recommends" ref="recommend"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";
import Scroll from "common/scroll/Scroll";
import GoodsList from "content/good/GoodsList";

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
  UserComment
} from "network/detail.js";
import { itemListenerMixin, backTopMixin } from "@/common/mixin";
import { debounce } from "@/common/utils";
//【注意】将vuex的actions映射到组件的methods
import { mapActions } from "vuex";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      userComment: {},
      recommends: [],
      themeTopY: [],
      newRefresh: null,
      getThemeTopY: null,
      flag: false
    };
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;

    // 2.通过iid请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result;
      // console.log(data);

      // 1.获取轮播图数据
      this.topImages = data.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3.获取商家信息
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6.获取用户评价
      if (data.rate.cRate !== 0) {
        this.userComment = new UserComment(data.rate);
      }
    });

    // 3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
      // console.log(this.recommends);
    });
  },
  mounted() {
    // 4.给getThemeTopY赋值
    this.newRefresh = debounce(() => {
      this.$refs.scroll.refresh();
      // console.log('aaa');
    }, 500);

    this.getThemeTopY = debounce(() => {
      this.themeTopY = [];
      this.themeTopY.push(0);
      this.themeTopY.push(this.$refs.params.$el.offsetTop);
      //【注意】有些没有评论信息，评论信息高度为undefined。
      this.themeTopY.push(
        this.$refs.comment.$el.offsetTop ||
          this.$refs.recommend.$el.offsetTop - 100
      );
      this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopY.push(Number.MAX_VALUE);
      // console.log(this.themeTopY);
    }, 500);
  },
  destroyed() {
    this.$bus.$off("imageLoad", this.imageListener);
  },
  methods: {
    ...mapActions(["addCart"]),
    goodsImageLoad() {
      // 【注意】：不能像下面这样直接调用防抖函数，这样会调用多个debounce函数，防抖函数只能调用一个。
      // debounce(this.$refs.scroll.refresh, 500)
      this.newRefresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      // console.log(this.themeTopY);
      // this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 200);

      // 节流阀
      this.flag = true;
      const Pro = new Promise((resolve, reject) => {
        this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 200);
        resolve();
      }).then(() => {
        this.flag = false;
      });
    },
    contentScroll(position) {
      const positionY = -position.y;

      this.themeTopY.push();
      let length = this.themeTopY.length;

      // 要考虑themeTopy的长度，有些themeTopY中没有评价comment信息。不应该在此处更改undefined，
      // 在获取this.$refs.comment.$el.offsetTop时，就更改。
      // if (this.themeTopY[2] === undefined) {
      //   const recommendTop = this.themeTopY[3];
      //   this.themeTopY.splice(2, 1, recommendTop - 10);
      // }

      if (this.flag == false) {
        for (let i = 0; i < length - 1; i++) {
          if (
            this.currentIndex != i &&
            positionY >= this.themeTopY[i]
            // themeTopY从小到大排序，遍历数组直到不满足条件，因此下面可以省略
            // && positionY < this.themeTopY[i + 1]
          ) {
            this.$refs.nav.currentIndex = i;
          }
        }
      }

      // 2.backTop返回顶部
      this.isShowBackTop = position.y < -2500;
    },
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.【注意】将商品添加到购物车(1.Actions可以返回Promise  2.使用mapActions将Actions映射到methods)，土司用Actions实现。
      // 错误形式：this.$store.commit('addCart', product)

      // this.$store.dispatch('addCart', product).then(res => console.log(res))
      this.addCart(product).then(res => this.$toast.show(res, 2000));
    }
  }
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
</style>