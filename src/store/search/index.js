import {reqSearchList} from '@/api'
const state = {
    searchList:{},
}

const actions = {
    async searchList({commit}, params={}){
        let result = await reqSearchList(params)
        if(result.code == 200) {
            commit('SEARCHLIST', result.data)
        }
    },

}
const mutations = {
    SEARCHLIST(state, searchList){
        state.searchList = searchList
    }
}
const getters = {
    attrsList (state) {
      // 后面代码防止没网的情况,防止遍历undefinde
      return state.searchList.attrsList || []
    },
    goodsList (state) {
      return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
    
}

export default {
    // ...
    state,
    actions,
    mutations,
    getters
}