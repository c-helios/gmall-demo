
//引入路由
import Home from '@/views/Home'
import Search from '@/views/Search'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Detail from '@/views/Detail'
import AddCartSuccess from '@/views/AddCartSuccess'
import ShopCart from '@/views/ShopCart'
import Trade from '@/views/Trade'
import Pay from '@/views/Pay'
import PaySuccess from '@/views/PaySuccess'
import Center from '@/views/Center'
import MyOrder from '@/views/Center/MyOrder'
import GroupOrder from '@/views/Center/GroupOrder'

export default [
    // 重定向，在项目跑起来的时候，访问/立马让他定向到首页
    {
        path: "/",
        redirect: "/home"
    },
    {
        name: "home",
        path: "/home",
        // component: Home,
        //路由懒加载，用到才加载，效率较高
        component:() => import('@/views/Home'),
        meta: {showFooter:true},
    },
    {
        name: "search",
        path: "/search/:keyword?",
        component: Search,
        meta: {showFooter:true},
        props: true
    },
    {
        name: "login",
        path: "/login",
        component: Login,
        meta: {showFooter:false}
    },
    {
        name: "register",
        path: "/register",
        component: Register,
        meta: {showFooter:false}
    },
    {
        name: "detail",
        path: "/detail/:skuId",
        component: Detail,
    },
    {
        name: "addCartSuccess",
        path: "/addCartSuccess",
        component: AddCartSuccess,
        meta: {showFooter:true},
    },
    {
        name: "shopCart",
        path: "/shopCart",
        component: ShopCart,
        meta: {showFooter:true},
    },
    {
        path: '/trade',
        component: Trade,
        meta: {showFooter:true, isAuth: true},
        beforeEnter: (to, from, next) => {
            // ...去交易页面，必须从购物车且购物车列表不能为空
            if (from.path == '/shopCart') {
                next()
            } else {
                // 其他路由组建来，必须回到原路组件
                next(false)
            }
        }
    }, 
    {
        path: '/pay',
        component: Pay,
        meta: {showFooter:true, isAuth: true},
        beforeEnter:(to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                next(false)
            }
        }
    }, 
    {
        path: '/paySuccess',
        component: PaySuccess,
        meta: {showFooter:true, isAuth: true},
    }, 
    {
        path: '/center',
        component: Center,
        meta: {showFooter:true, isAuth: true},
        children: [
            {
                path: 'myOrder',
                component: MyOrder,
                meta: {showFooter:true, isAuth: true},
            }, 
            {
                path: 'groupOrder',
                component: GroupOrder,
                meta: {showFooter:true, isAuth: true},
            }, 
            {
                path: '/center',
                redirect: '/center/myOrder'
            }
        ]
    }
]