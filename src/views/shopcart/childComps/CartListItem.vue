<template>
  <div class="shop-item">
    <div class="item-selector">
      <CheckButton :isChecked="itemInfo.checked" @click.native="checkClick"></CheckButton>
    </div>
    <div class="item-img">
      <img :src="itemInfo.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>

      <div class="info-bottom">
        <div class="item-price left">￥{{itemInfo.price}}</div>
        <div class="item-count right">x{{itemInfo.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "content/checkButton/CheckButton";

export default {
  name: "CartListItem",
  components: {
    CheckButton
  },
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    checkClick() {
      // itemInfo是组件内部的属性，可以直接改变；store对象中的state不可直接改变
      // 【注意】1.如果 prop 是一个对象或数组，在子组件内部改变它会影响父组件的状态。在 JavaScript 中对象和数组是引用类型，指向同一个内存空间，
      //        2.如果prop不是一个对象或数组，但子组件想把它当成局部数据使用，应对方式：定义一个data变量，并用prop的值初始化它。
      //        3.如果prop不是一个对象或数组，由子组件处理成其他数据输出给父组件，应对方式：定义一个计算属性，处理prop的值返回。
      // 【注意】此处button要绑定在ShopcartList中的每一个CartListItem中，固应在CartListItem中的itemInfo对象里面给button绑定一个checked属性。
      //        即button的点击要在CartListItem的商品信息中记录，不能在组件中单独定义一个属性监听。
      // this.itemInfo.checked = !this.itemInfo.checked;

      // 【注意】改变state数据要通过mutations
      // checkButton通过state传过来的checked属性来渲染
      this.$store.commit("checkChange", this.itemInfo);
    }
  }
};
</script>

<style scoped>
.shop-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
  /* 将区域内的元素脱离标准流 */
  display: flex;
}

.item-selector {
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-img {
  widows: 80px;
  padding: 5px;
}

.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}

.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}

.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.info-bottom .item-price {
  color: orangered;
}
</style>