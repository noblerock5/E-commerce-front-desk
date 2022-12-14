import { v4 as uuidv4 } from 'uuid';
//普通暴露写法
//要随机生成字符串，且每次执行不能发生变化，游客身份永久存储
export const getUUID = () => {
    //先从本地存储获取uuid（看下本地存储是否有）
    let uuid_token = localStorage.getItem('UUIDTOKEN')
    //如果没有我生成
    if(!uuid_token) {
        //我生成游客临时身份
        uuid_token = uuidv4()
        //本地存储一次
        localStorage.setItem('UUIDTOKEN', uuid_token)
    }
    //切记有返回值，没有返回值返回的是undefined
    return uuid_token
}