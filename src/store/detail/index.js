import { reqGoodsInfo, reqAddUpdateShopCart } from "@/api";
//封装的临时游客身份模块uiid-->生成一个随机的字符串（不能再变了）
import {getUUID} from "@/utils/uuid_token"
const state = {
    goodInfo: {},
    //游客的临时身份
    uuid_token: getUUID()
}

const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
}

const actions = {
    //获取产品的action
    async getGoodInfo({commit},skuId) {
        const result = await reqGoodsInfo(skuId)
        if(result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    //将产品添加到购物车中
    async addOrUpdateShopCart({commit}, {skuId, skuNum}) {
        //加入购物车返回的结果
        //加入购物车以后（发请求），前台将参数带给服务器
        //服务器写入数据成功，并没有返回其他的数据。只是返回code==200，代表这次操作成功
        //因为服务器没有返回其余数据，所以仓库中不需要三连环存储数据
        const result = await reqAddUpdateShopCart(skuId,skuNum)
        //代表服务器加入购物车成功
        if(result.code == 200) {
            return "ok"
        } else {
            //代表加入购物车失败
            return Promise.reject(new Error('faile'))
        }
    }
}

//简化数据而生
const getters = {
    //路径导航简化的数据
    categoryView(state) {
        //比如state.gooodInfo初始是空对象，空对象的categoryView返回的是undefined
        //当计算出来的属性值至少是一个空对象，所以加上 || {} 来处理刷新标红
        return state.goodInfo.categoryView || {}
    },
    //简化产品的信息的数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    //此产品售卖属性的计划
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
}