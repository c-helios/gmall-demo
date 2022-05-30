import {reqSkuDetail,reqAddToCart,reqCartList} from '@/api'
// 封装游客身份模块，生成一个随机字符串（不能改变）
import { getUUID } from '@/utils/uuid_token'
const state = {
    skuDetail:{},
    // 临时游客身份证
    uuid_token: getUUID()
}
const actions = {
    async skuDetail({commit},skuId) {
        let result = await reqSkuDetail(skuId)
        if (result.code == 200) {
            commit('SKUDETAIL', result.data)
        }
    },
    async addToCart({commit}, {skuId, skuNum}) {
        let result = await reqAddToCart(skuId,skuNum)
        if (result.code == 200) {
            return 'success'
        }
        return 'fail'
    },
}
const mutations = {
    SKUDETAIL(state,skuDetail) {
        state.skuDetail = skuDetail
    },
}
const getters = {
    categoryView(state) {
        return state.skuDetail.categoryView||{}
    },
    skuInfo(state) {
        return state.skuDetail.skuInfo||{}
    },
    spuSaleAttrList(state) {
        return state.skuDetail.spuSaleAttrList||[]
    },
    valuesSkuJson(state) {
        return state.skuDetail.valuesSkuJson
    },
}

export default {
    state,
    actions,
    mutations,
    getters
}
