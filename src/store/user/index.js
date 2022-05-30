import { reqCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLoginOut } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token.js'
const state = {
  code: '',
  token: getToken(),
  userInfo: {}
}
const mutations = {
  GETCODE (state, code) {
    state.code = code
  },
  USERLOGIN (state, token) {
    state.token = token
  },
  GETUSERINFO (state, userInfo) {
    state.userInfo = userInfo
  },
  LOGINOUT (state) {
    state.token = ''
    state.userInfo = {}
    removeToken()
  }
}
const actions = {
  // 获取验证码
  async getCode ({ commit }, phone) {
    let result = await reqCode(phone)
    if (result.code == 200) {
      commit('GETCODE', result.data)
    } else {
      alert(error)
    }
  },
  // 注册用户
  async userRegister ({ commit }, userData) {
    let result = await reqUserRegister(userData)
    if (result.code == 200) {
      return true
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 用户登录
  async userLogin ({ commit }, userData) {
    let result = await reqUserLogin(userData)
    if (result.code == 200) {
      commit('USERLOGIN', result.data.token)
      // 持久化存储token
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 获取用户信息
  async getUserInfo ({ commit }) {
    let result = await reqUserInfo()
    if (result.code == 200) {
      commit('GETUSERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('getUserInfoFaile'))
    }
  },
  // 退出登录
  async loginOut ({ commit }) {
    let result = await reqLoginOut()
    if (result.code == 200) {
      commit('LOGINOUT')
      return 'ok'
    } else {
      return Promise.reject(new Error('reqLoginOutFaile'))
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