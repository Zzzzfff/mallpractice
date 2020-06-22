<template>
  <div class="cart-bottom-bar">
    <div class="check-buttons">
      <check-button :isChecked="isAllChecked" @click.native="checkClick" class="checked"></check-button>
      <span class="button-text">全选</span>
    </div>
    <div class="total-price">合计：{{totalPrice}}</div>
    <div class="calculate" @click="calClick">去计算：{{checkLength}}</div>
  </div>
</template>

<script>
import CheckButton from "content/checkButton/CheckButton";
import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    ...mapGetters(["cartList"]),

    isAllChecked() {
      // return !this.cartList.find(item => item.checked == false)
      // 条件不能改为this.cartList，如果购物车没有添加商品，console.log(this.cartList)返回的不是空数组
      if (this.cartList.length) {
        // 也可以用find()
        return !this.cartList.filter(item => item.checked == false).length;
      }
      return false;
    },
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter(item => item.checked)
          .reduce((prev, item) => prev + item.price * item.count, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.cartList.filter(item => item.checked == true).length;
    }
  },
  methods: {
    checkClick() {
      if (this.isAllChecked) {
        // 【思考】：此处改变state的值需不需通过mutations。props单向数据流中使用计算属性用子组件改变父组件的值是可以的，这里只能mutations。
        // forEach()方法改变数组中每一个元素的值
        // this.cartList.forEach(item => (item.checked = false));

        // 改变state中的数据要通过mutations
        this.$store.commit("allCheckFalse");
      } else {
        // this.cartList.forEach(item => (item.checked = true));

        this.$store.commit("allCheckTrue");
      }

      // 【注意】不能写成下面形式，会与上面计算属性中的isAllChecked冲突
      // this.cartList.forEach(item => item.checked = !this.isAllChecked)
    },
    calClick() {
      if (
        this.cartList.filter(item => item.checked == false).length ===
        this.cartList.length
      ) {
        this.$toast.show("请选择购物商品", 2000);
      }
    }
  }
};
</script>

<style scoped>
.cart-bottom-bar {
  height: 40px;
  background-color: #eee;
  position: relative;
  line-height: 40px;
  display: flex;
}

.check-buttons {
  display: flex;
  width: 90px;
  align-items: center;
  margin-left: 7px;
}

.checked {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
  margin-left: 7px;
}

.total-price {
  flex: 1;
}

.calculate {
  width: 90px;
  background-color: red;
  color: #fff;
  text-align: center;
}
</style>