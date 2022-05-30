//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from '@/router/routes'
import store from '@/store'

//使用插件
Vue.use(VueRouter)

let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

//重写push｜replace
//第一个参数：告诉原来push方法，你往哪里跳转（传递哪些参数）
VueRouter.prototype.push = function(location,resolve,reject) {
    if(resolve && reject) {
        // call|apply区别
        //相同点：都可以调用函数，都可以篡改函数的上下文
        //不同点：call与apply传递参数，call传递参数用逗号隔开，appley方法执行，传递数组
        originPush.call(this,location,resolve,reject)
    } else {
        originPush.call(this,location,() => {},() => {})
    }
}

VueRouter.prototype.replace = function(location,resolve,reject) {
    if(resolve && reject) {
        // call|apply区别
        //相同点：都可以调用函数，都可以篡改函数的上下文
        //不同点：call与apply传递参数，call传递参数用逗号隔开，appley方法执行，传递数组
        originReplace.call(this,location,resolve,reject)
    }else{
        originReplace.call(this,location,() => {},() => {})
    }
}

//配置路由
const router = new VueRouter({
    //配置路由
    routes,
    // 路由切换滚动行为
    scrollBehavior (to, from, savedPosition) {
      return { y: 0 }
    }
})

// 全局路由，路由器前置
router.beforeEach(async (to, from, next) => {
    // next ()
    // 用户登录了才有token，
    let token = store.state.user.token
    // 用户信息
    let name = store.state.user.userInfo.name
    // 用户已经登录
    if (token) {
      // 用户已经登录不能前往login,跳转至首页 
      if (to.path == '/login') {
        next('/')
      } else {
        // 登陆了去的不是login【home|search|detail|shopcart】
        if (name) {
          next()
        } else {
          // 没有用户信息派发action让仓库存储用户信息再跳转
          try {
            await store.dispatch('getUserInfo')
            next()
          } catch (error) {
            // token失效
            // 清除token
            await store.dispatch('loginOut')
            next('/login')
          }
        }
      }
    } else {
      // 未登录不能前往支付页面
      // if (to.path.indexOf('/trade') != -1 || to.path.indexOf('/pay') != -1 || to.path.indexOf('/paySuccess') != -1 || to.path.indexOf('/center') != -1) {
      if (to.meta.isAuth) {
        // 登录后返回到点击登录的页面
        next('/login?redirect=' + to.path)
      } else {
        next()
      }
    }
  })

  export default router