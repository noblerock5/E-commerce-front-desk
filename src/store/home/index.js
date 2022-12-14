import { reqCategoryList, reqGetBannerList,reqFloorList } from '@/api'
//home模块的小仓库
const state = {
    //state数据默认初始值别瞎写，服务器返回的是对象，服务器返回数组【根据返回值定义】
    categoryList: [],
    //轮播图的数组
    bannerList: [],
    //floor组件的数组
    floorList: []
}
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }
}
const actions = {
    //通过API里面的接口函数调用，想服务器法请求，获取服务器数据
    async categoryList({commit}) {
        const result = await reqCategoryList()
        if(result.code == 200) {
            commit("CATEGORYLIST", result.data)
        }
    },
    //获取首页轮播图的数据
    async getBannerList({ commit }) {
        const result = await reqGetBannerList()
        if (result.code == 200) {
            commit("GETBANNERLIST", result.data)
        }
    },
    //获取floor数据
    async getFloorList({commit}) {
        const result = await reqFloorList()
        if (result.code == 200) {
            //提交mutation
            commit("GETFLOORLIST", result.data)
        }
    }
}
//计算属性
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters,
}