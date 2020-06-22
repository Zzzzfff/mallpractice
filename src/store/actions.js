import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  // {state, commit}是context的解构
  addCart({
    state,
    commit
  }, payload) {
    return new Promise((resolve, reject) => {
      // 1.查找之前数组中是否有该商品,数组find方法返回符合条件的每一项
      let oldProduct = state.cartList.find(item => item.iid === payload.iid)

      if (oldProduct) {
        commit(ADD_COUNTER, oldProduct)
        resolve('当前商品数量+1')
      } else {
        commit(ADD_TO_CART, payload)
        resolve('商品已添加到购物车')
      }

    })
  }
}
