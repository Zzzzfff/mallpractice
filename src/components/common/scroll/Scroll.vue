<template>
  <div class="wrapper" ref="wrapper">
    <div class="content" ref="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    // 与scroll有关的内容都放在mounted里面

    // vue中通过document.querySelector('.wrapper')拿到的是dom中第一个wrapper对象
    // this.scroll = new BScroll(document.querySelector('.wrapper'))

    // ref如果绑定在组件中，那么通过this.$refs.refname获取到的是一个组件对象
    // ref如果绑定在普通的元素中，那么通过this.$refs.refname获取到的是一个元素对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });

    // 查询scrollerHeitht
    // console.log(this.scroll);

    // 监听滚动的位置
    if (this.probeType === 3 || this.probeType === 2) {
      this.scroll.on("scroll", position => {
        // console.log(position);
        this.$emit("scroll", position);
      });
    }

    // 监听滚动到底部
    if (this.pullUpLoad === true) {
      this.scroll.on("pullingUp", () => {
        // console.log('提示上拉加载');
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    scrollTo(x, y, time) {
      // 短路运算
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    getPosition() {
      return this.scroll ? this.scroll.position.y : 0;
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    }
  }
};
</script>

<style scoped>
</style>