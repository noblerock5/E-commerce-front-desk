import Vue from 'vue'
import App from './App.vue'
//三级联动组件---祖册为全局组件 
import TypeNav from './components/TypeNav/index.vue'
//第一个参数：全局组件的名字 第二个名字：那一个组件
Vue.component(TypeNav.name. TypeNav)


import {Button, MessageBox, Form, FormItem, Input,} from 'element-ui';
//elementUI注册全局组件
Vue.component(Button.name, Button);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input)
//ElementUI注册组件的时候，还有一种写法，挂载在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;



//引入路由
import router from './router'
//引入仓库
import store from './store/index.js'

//定义全局组件：在入口文件注册一次之后，在任何组件当中都可以使用
import Carousel from '@/components/Carousel/index.vue'
import Pagination from '@/components/Pagination/index.vue'
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

//引入mockSer.js---mock数据
import '@/mock/mockServe'

//引swiper样式
import 'swiper/css/swiper.css'

//统一接口api文件夹里面的请求函数
//统一引入 * as
import * as API from '@/api'

import fengjing from '@/assets/1.gif'

//引入懒加载插件
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  //懒加载默认的图片
  loading:fengjing
})

//引入自定义插件
import myPlugins from '@/plugins/myPlugins'
Vue.use(myPlugins, {
  name: 'upper',
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  //注册路由，底下的写法是KV一致，省略V【router的r小写】
  //注册路由信息：当这里书写router的时候，组建身上有$route,$router属性
  router,
  //注册仓库:组件实例的身上会多一个属性$store属性
  store,
}).$mount('#app')
