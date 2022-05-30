import { reqUserAddress, reqTradeGoodsList, reqSubmitTrade } from '@/api'
const state = {
  userAddressList: [],
  orderInfo: {},
  orderId: null
}
const mutations = {
  GETUSERADDRESS (state, userAddressList) {
    state.userAddressList = userAddressList
  },
  GETTRADEGOODSLIST (state, orderInfo) {
    state.orderInfo = orderInfo
  },
  SUBMITTRADE (state, orderId) {
    state.orderId = orderId
  }
}
const actions = {
  // 获取用户信息
  async getUserAddress ({ commit }) {
    let result = await reqUserAddress()
    if (result.code == 200) {
      commit('GETUSERADDRESS', result.data)
    }
  },
  // 获取订单信息
  async getTradeGoodsList ({ commit }) {
    let result = await reqTradeGoodsList()
    if (result.code == 200) {
      commit('GETTRADEGOODSLIST', result.data)
    }
  },
  // 提交订单
  async submitTrade ({ commit }, { tradeNo, data }) {
    let result = await reqSubmitTrade(tradeNo, data)
    if (result.code == 200) {
      commit('SUBMITTRADE', result.data)
    } else {
      alert(result.message);
    }
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}