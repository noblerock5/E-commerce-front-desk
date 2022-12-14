import { reqGetSearchInfo } from "@/api";
//search模块的小仓库
const state = {
    //仓库初始状态
    searchList: {}
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}
const actions = {
    //获取Search模块的数据
    async getSearchList({commit}, params = {}) {
        //当前这个reqGetSearchInfo这个函数在调用服务器数据的时候，那至少传递一个参数（空对象）
        //params形参是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
       const result = await reqGetSearchInfo(params)
       if(result.code == 200) {
        commit('GETSEARCHLIST', result.data)
       }
    }
}
//计算属性：getters在项目当中，为了简化仓库中数据而生
//把我们将来在组件当中需要的数据简化一下，将来用数据就方便了
const getters = {
    //当前形参state，当前仓库中的state，并非仓库中大的那个state
    goodsList(state) {
        //这样书写是有问题的
        //return state.searchList.goodsList如果服务器数据回来了是没问题的
        //假如网络不好、没有网return state.searchList.goodsList应该返回的是undefined
        //计算新的属性的属性值至少给人家来一个数组
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList
    },
    attrsList(state) {
        return state.searchList.attrsList
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
}