import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types'

export default {
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.count = 1
    payload.checked = true
    state.cartList.push(payload)
  },
  checkChange(state, payload) {
    const checkItem = state.cartList.find(item => item.iid === payload.iid)
    checkItem.checked = !checkItem.checked
  },
  allCheckFalse(state) {
    state.cartList.forEach(item => (item.checked = false));
  },
  allCheckTrue(state) {
    state.cartList.forEach(item => (item.checked = true));
  }
}
