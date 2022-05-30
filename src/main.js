import Vue from 'vue'
import App from './App.vue'
import store from '@/store'

//引入路由
import router from '@/router'
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'

import '@/mock/mockServer'
import 'swiper/css/swiper.min.css'
import * as API from "@/api";

import VueLazyload from 'vue-lazyload'
import DefaultLoading from '@/assets/images/loading.gif'
//引入自定义插件
import MyPlugins from '@/plugins/MyPlugins'

import '@/plugins/VeeValidate'

// 引入elementui组件
import { Button, MessageBox } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.component(Button.name, Button)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert


Vue.config.productionTip = false

Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)

Vue.use(VueLazyload,{
  //懒加载默认图片
  loading: DefaultLoading
})

Vue.use(MyPlugins, {
  name: 'upper'
})
 
new Vue({
  beforeCreate(){
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  render: h => h(App),
  router,
  store,
}).$mount('#app')
