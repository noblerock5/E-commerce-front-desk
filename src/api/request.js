//对axios二次封装
import axios from 'axios'
//引入进度条
import nprogress from 'nprogress'
//在当前模块中引入store
import store from '@/store'

//引入进度条的样式
import "nprogress/nprogress.css"
import { options } from 'less'

//1.利用axios方法create，去创建一个axios实例
//2.request就是axios，只不过稍微配置一下
const requests = axios.create({
    //配置对象
    //基础路径。发送请求时，路径当中会出现api
    baseURL: "/api",
    //代表请求超时的时间5s
    timeout: 5000,
})
//请求拦截器，再发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
    if(store.state.detail.uuid_token) {
        //给请求头添加一个字段（userTempId）:和后台商量好
        config.headers.userTempId = store.state.detail.uuid_token
    }
    //需要携带token带给服务器
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }
    nprogress.start()
    return config;
})

//响应拦截器
requests.interceptors.response.use((res) => {
    //成功回调
    //进度条开始
    nprogress.done()
    return res.data
}, (error) => {
    //失败回调
    return Promise.reject(new Error('faile'))
})




//对外暴露
export default requests