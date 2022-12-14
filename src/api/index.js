//当前的模块;API进行统一管理
import requests from './request'
import mockRequests from './mockRequest'

//三级联动的接口
// /api/product / getBaseCategoryList get 无参数
//发请求:axios发请求返回的结果时Promise函数
export const reqCategoryList = () => requests({ url:'/product/getBaseCategoryList', method: 'get'})
//切记：当前函数执行需要把服务器返回结果返回

//获取banner(Home首页轮播图接口)
export const reqGetBannerList = () => mockRequests.get('/banner')

//获取floor组件的数据
export const reqFloorList = () => mockRequests.get('/floor')

//获取搜索模块的数据 地址：/api/list 方式：post 参数：需要带参数
// {
//     "category3Id": "61",
//      "categoryName": "手机",
//     "keyword": "小米",
//     "order": "1:desc",
//     "pageNo": 1,
//     "pageSize": 10,
//     "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//     "trademark": "4:小米"
// }
//当前这个接口(获取搜索模块的数据)，给服务器传递参数params，至少是一个空对象
export const reqGetSearchInfo = (params) => requests({url:'/list', method: 'post', data: params})

//获取产品详情信息的接口URL：api/item/{skuId} 请求的方式 get

export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })

//将产品添加到购物车中(获取更新某一个产品的个数))
export const reqAddUpdateShopCart = (skuId, skuNum) => requests({url:`/cart/addToCart/${skuId}/${skuNum}`, method:'post'})

//获取购物车列表数据的接口
export const reqCartList = () => requests({url:`/cart/cartList`, method:'get'})

//删除购物车产品的接口
export const reqDeleteCartById = (skuId) => requests({url:`/cart/deleteCart/${skuId}`, method:'delete'})

//修改商品选中状态
export const reqUpdateCheckedById = (skuId, isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`, method:'get'})

//获取验证码
export const reqGetCode = (phone) => requests({ url:`/user/passport/sendCode/${phone}`, method:'get'})

//注册接口
export const reqUserRegister = (data) => requests({url:`/user/passport/register/`, data, method:'post'})

//登录接口
export const reqUserLogin = (data) => requests({url:`/user/passport/login`, data, method:'post'})

//获取用户信息【需要带着用户的token想服务器要用户信息】
export const reqUserInfo = () => requests({url:`/user/passport/auth/getUserInfo`, method:'get'})

//退出登录
export const reqLogout = () => requests({url:`/user/passport/logout`, method:'get'})

//获取用户地址信息
export const reqAddressInfo = () => requests({ url:`user/userAddress/auth/findUserAddressList`, method:'get'})

//获取商品清单
export const reqOrderInfo = () => requests({ url:`/order/auth/trade`, method:'get'})

//提交订单接口
export const reqSubmitOrder = (tradeNo, data) => requests({ url:`/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method:'post'})

//获取支付信息
export const reqPayInfo = (orderId) => requests({ url:`/payment/weixin/createNative/${orderId}`, method:'get'})

//获取支付订单状况
export const reqPayStatus = (orderId) => requests({ url:`/payment/weixin/queryPayStatus/${orderId}`, method:'get'})

//获取个人中心的数据
export const reqMyOrderList = (page, limit) => requests({ url:`/order/auth/${page}/${limit}`, method:'get'})
