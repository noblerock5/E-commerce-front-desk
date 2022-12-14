//引入路由组件
import Home from '../pages/Home/index.vue'
import Search from '../pages/Search/index.vue'
import Login from '../pages/Login/index.vue'
import Register from '../pages/Register/index.vue'
import Detail from '../pages/Detail/index.vue'
import AddCartSuccess from '../pages/AddCartSuccess/index.vue'
import ShopCart from '../pages/ShopCart/index.vue'
import Trade from '../pages/Trade/index.vue'
import Pay from '../pages/Pay/index.vue'
import PaySuccess from '../pages/PaySuccess/index.vue'
import Center from '../pages/Center/index.vue'
//引入二级路由组件
import MyOrder from '../pages/Center/myOrder'
import GroupOrder from '../pages/Center/groupOrder'

//配置路由信息
export default [
    {
        path: '/home',
        component: Home,
        meta: { show: true }
    },
    {
        path: '/search/:keyword?',
        component: Search,
        meta: { show: true },
        name: 'search',
        //路由组件能不能传递参数
        //布尔值写法
        // props: true,
        //对象写法：额外给路由组件传递一些props
        // props: {a: 1, b: 2}
        //函数写法：可以params参数、query参数，通过props传递给路由组件
        props: ($route) => {
            return { keyword: $route.params.keyword, k: $route.query.k }
        }
    },
    {
        path: '/login',
        component: Login,
        meta: { show: false }
    },
    {
        path: '/register',
        component: Register,
        meta: { show: false }
    },
    {
        path: '/detail/:skuid',
        component: Detail,
        meta: { show: true }
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        path: '/shopcart',
        component: ShopCart,
        meta: { show: true }
    },
    {
        path: '/trade',
        component: Trade,
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //去交易页面必须从购物车走，其他路由组件而来，停留在当前
            if(from.path == "/shopcart") {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/pay',
        component: Pay,
        meta: { show: true },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            //去提交页面必须从交易走，其他路由组件而来，停留在当前
            if (from.path == "/trade") {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        meta: { show: true }
    },
    {
        path: '/center',
        component: Center,
        meta: { show: true },
        //二级路由组件
        children:[
            {
                path:'myOrder',
                component: MyOrder,
            },
            {
                path: 'groupOrder',
                component: GroupOrder,
            },

            //重定向，在项目跑起来的时候，访问/立马让它定向到首页
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },

    //重定向，在项目跑起来的时候，访问/立马让它定向到首页
    {
        path: '*',
        redirect: '/home'
    }
]