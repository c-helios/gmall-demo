import requests from "./request"
import mockAjax from "./mockAjax"

//首页三级分类接口
// /api/product/getBaseCategoryList
export const reqCategoryList = () => requests({url:'/product/getBaseCategoryList',method:'get'});

//获取banner(首页轮播图)
export const reqBannerList = () => mockAjax('/banner')

//获取Floor
export const reqFloorList = () => mockAjax('/floor')

/*
搜索商品
{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/
export const reqSearchList = (params) => requests({url:'/list',method:'post',data:params});


//获取商品详情
export const reqSkuDetail = (skuId) => requests({url:`/item/${skuId}`,method:'get'});

//添加到购物车(对已有物品进行数量改动)
export const reqAddToCart = (skuId,skuNum) => requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'});

//获取购物车列表
export const reqCartList = () => requests({url:'/cart/cartList',method:'get'});

//切换商品选中状态
export const reqUpdateCheckCart = (skuId,isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'});

//删除购物车商品
export const reqDeleteCart = (skuId) => requests({url:`/cart/deleteCart/${skuId}`,method:'delete'});

//登录
export const reqLogin = (phone,password) => requests({url:'user/passport/login',method:'post',data:{'phone':phone,'password':password}});


// 获取验证码
export const reqCode = (phone) => requests.get(`/user/passport/sendCode/${phone}`)

// 用户注册
export const reqUserRegister = (userData) => requests.post(`/user/passport/register`, userData)

// 用户登录
export const reqUserLogin = (data) => requests.post(`/user/passport/login`, data)

// 自动登录
export const reqUserInfo = () => requests.get(`/user/passport/auth/getUserInfo`)

// 退出登录
export const reqLoginOut = () => requests.get(`/user/passport/logout`)

// 获取用户地址
export const reqUserAddress = () => requests.get(`user/userAddress/auth/findUserAddressList`)

// 获取商品清单
export const reqTradeGoodsList = () => requests.get('/order/auth/trade')

// 提交订单
export const reqSubmitTrade = (tradeNo, data) => requests.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`, data)

// 获取支付订单信息
export const reqCreateNative = (orderId) => requests.get(`/payment/weixin/createNative/${orderId}`)

// 获取订单支付状态
export const reqPayStatus = (orderId) => requests.get(`/payment/weixin/queryPayStatus/${orderId}`)

// 获取我的订单
export const reqMyorder = (page, limit) => requests.get(`/order/auth/${page}/${limit}`)


