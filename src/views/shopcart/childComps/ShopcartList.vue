<template>
  <div class="shopcart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :item-info="item" :key="index"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from "common/scroll/Scroll";
import CartListItem from "views/shopcart/childComps/CartListItem";
import { mapGetters } from "vuex";

export default {
  name: "ShopcartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(["cartList"])
  },
  activated() {
    // 【注意】页面改变要刷新scroll
    this.$refs.scroll.refresh();
  }
};
</script>

<style scoped>
.shopcart-list {
  height: calc(100% - 44px - 49px - 40px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>