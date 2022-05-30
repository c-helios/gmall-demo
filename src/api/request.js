//对axios进行二次封装
import axios from 'axios'
//进度条
import nprogress from 'nprogress'
//进度条样式
import 'nprogress/nprogress.css'
// 在当前模块引入uuid
import store from '@/store'
import {getToken} from '@/utils/token'

const requests = axios.create({
    // 接口前缀
    baseURL:'/api',
    //请求超时时间5s
    timeout:5000
})

requests.interceptors.request.use((config)=> {
    //config：配置对象，对象里面有个属性很重要，headers请求头
    // 检查token
    if (store.state.detail.uuid_token) {
        // 请求头添加通关令牌
        config.headers.userTempId = store.state.detail.uuid_token

    }
    // 需要携带token给服务器
    if (localStorage.getItem('TOKEN')) {
        config.headers.token = getToken()
    }
    nprogress.start()
    return config
})

requests.interceptors.response.use((res)=> {
    //成功的回调函数，返回服务器相应的数据
    nprogress.done()
    return res.data
},(error)=>{
    //服务器响应失败
    return Promise.reject(new Error('faile'))
})

export default requests