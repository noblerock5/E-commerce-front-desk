//配置路由的地方
import Vue from 'vue'

import VueRouter from 'vue-router'
//使用插件
Vue.use(VueRouter)
//引入路由组件
import routes from './routes.js'

//引入store
import store from '@/store'

//先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push
//先把VueRouter原型对象的push，先保存一份
let originReplace = VueRouter.prototype.replace

//重写push|replace
//第一个参数：告诉push方法，你往哪里跳转传递哪些参数
//第二个参数：成功回调
//第三个参数：失败的回调
VueRouter.prototype.push = function(location, resolve, reject) {
    if(resolve && reject) {
        //call|apply区别：相同点：都可以调用函数一次，都可以篡改函数上下文一次
        //不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => {}, () => {})
    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        //call|apply区别：相同点：都可以调用函数一次，都可以篡改函数上下文一次
        //不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}

//配置路由
let router = new VueRouter({
    //配置路由
    routes,
    //滚动行为
    scrollBehavior(to, from, savedPosition) {
        //返回的y代表的是滚动条在最上方
        return {y: 0}
    }
})

//全局守卫：前置守卫(在路由跳转之前进行判断)
router.beforeEach(async(to, from, next) => {
    //to：获取到你要跳转到那个路由的信息
    //from:获取到你从哪里而来的信息
    //next：放行函数next() next(path)放行到指定路由
    //为了测试先全部放行
    // next()
    //用户登录了，才会有token，未登录一定不会有token
    let token = store.state.user.token
    //用户信息
    let name = store.state.user.userInfo.name
    // console.log(userInfo);
    if(token) {
        //用户已经登录了，用户还想去login休想,不能去【停留在首页】
        if(to.path=="/login") {
            next('/home')
        } else {
            //登陆了，用户去的不是login[home/detail/shopcart]
            //如果用户名已有
            if(name) {
                next()
            }else {
                //没有用户信息，派发action让仓库存储用户信息再跳转
                try {
                    //获取用户信息成功
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    //走到这里是因为token失效了获取不到用户的信息，就需要清除所有token，并返回home页面
                    //清除token
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    }else {
        //未登录不能去交易相关、不能去支付相关、不能去个人中心
        //未登录上面的的这些，跳到登录页面
        let toPath = to.path
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            //把未登录想去而未去成的信息用querry参数带进去
            next('/login?redirect=' + toPath)
        } else {
            //去的不是上面的路由，应该放行
            next()
        }
        
    }
})


export default router