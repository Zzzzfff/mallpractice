const product = {};
product.image = this.topImages[0];
product.title = this.goods.title;
product.desc = this.goods.desc;
product.price = this.goods.realPrice;
product.iid = this.iid;

// this.$store.state
// this.$store.commit("addToCart", product)
this.$store.dispatch("addToCart", product)

import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const state = {
  cartList: []
}

const store = new Vuex.Store({
  state,
  mutations: {
    addCount(state, payload) {
      payload.count++
    },
    addCart(state, payload) {
      payload.count = 1
      state.cartList.push(payload)
    }
  },
  actions: {
    addToCart(context, payload) {
      const oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) {
        // oldProduct.count++
        context.commit("addCount", oldProduct)
      } else {
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit("addCart", payload)
      }
    }
  },
  getters: {

  }
})

import {
  mapGetters
} from "vuex"
import {
  mapActions
} from "vuex"

// computed: {
//   ...mapGetters[]
// },
// methods: {
//   ...mapActions[]
// }


const Pro = new Promise((resolve, reject) => {
  this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 200);
  resolve()
}).then(() => console.log(1))
