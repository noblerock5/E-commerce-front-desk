import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";

const state = {
    cartList: []
}

const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
}

const actions = {
    //获取购物车列表数据
    async getCartList({commit}) {
        const result = await reqCartList()
        if(result.code == 200) {
            commit("GETCARTLIST", result.data)
        }
    },
    //删除购物车某一个产品
    async deleteCartListBySkuId({commit}, skuId) {
        const result = await reqDeleteCartById(skuId)
        if(result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    //修改购物车某一个产品选中状态
    async upDateCheckedById({commit}, {skuId, isChecked}) {
        const result = await reqUpdateCheckedById(skuId, isChecked)
        if(result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //删除全部勾选的产品
    deleteAllCheckedCart({dispatch, getters}) {
        //context:可以理解为小仓库，commit【提交mutations修改state getters【计算属性】dispatch【派发action】 state【当前仓库数据】】
        //获取购物车中全部产品（是一个数组）
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
            //将每一个返回的Promise添加到数组当中
            PromiseAll.push(promise)
        })
        //只要全部的p1|p2...都成功，发挥成功
        //若果有一个失败，返回几位失败结果
        return Promise.all(PromiseAll)
    },
    //修改产品全部的状态
    updateAllCartIsChecked({dispatch, state}, isChecked) {
        //数组
        let PromiseAll = []
        state.cartList[0].cartInfoList.forEach((item) =>{
            let promise = dispatch("upDateCheckedById", {skuId:item.skuId, isChecked})
            PromiseAll.push(promise)
        })
        //最终返回结果
        return Promise.all(PromiseAll)
    },
}

const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },
}

export default {
    state,
    mutations,
    actions,
    getters,
}