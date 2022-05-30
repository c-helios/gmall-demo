import {reqCartList,reqUpdateCheckCart,reqDeleteCart} from '@/api'

const state = {
    cartList:[]
}
const actions = {
    async getCartList({commit}) {
        let result = await reqCartList()
        if (result.code == 200) {
            commit('CARTLIST', result.data)
        }
    },
    async updateCheckCart({commit},{skuId,isChecked}) {
        let result = await reqUpdateCheckCart(skuId,isChecked)
        if (result.code == 200) {
            return 'success'
        }
        return 'fail'
    },
    async deleteCart({commit}, skuId) {
        let result = await reqDeleteCart(skuId)
        if (result.code == 200) {
            return 'success'
        }
        return 'fail'
    },
    deleteAllCheckedCartByContext ({ dispatch, getters }) {
        let PromiseAll = []
        // context:小仓库，commit【提交mutations修改state】，getters【计算属性】 dispatch【派发action】 state【当前数据库】
        getters.cartInfoList.forEach(element => {
          let promise = element.isChecked == 1 ? dispatch('deleteCart', element.skuId) : ''
          PromiseAll.push(promise)
        });
        console.log(getters.cartInfoList);
        return Promise.all(PromiseAll)
    },
    // 全选状态修改
    updateAllChecked ({ dispatch, state }, isChecked) {
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach(element => {
            let promise = dispatch('updateCheckCart', { skuId: element.skuId, isChecked })
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
}
const mutations = {
    CARTLIST(state,cartList) {
        state.cartList = cartList
    },
}
const getters = {
    cartInfoList(state) {
        return (state.cartList[0] || []).cartInfoList||[]
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}
