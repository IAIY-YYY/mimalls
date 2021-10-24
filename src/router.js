import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

// 导入组件
import Home from './pages/home.vue'

import Index from './pages/index.vue'
import Product from './pages/product.vue'
import Detail from './pages/detail.vue'

import Cart from './pages/cart.vue'

// Order子路由
import Order from './pages/order.vue'
import OrderConfirm from './pages/orderConfirm.vue'
import OrderList from './pages/orderList.vue'
import OrderPay from './pages/orderPay.vue'


export default new Router({
    // mode:history,
    routes:[
        {
            path:'/',
            name:'home',
            component:Home,//公共的顶部底部导航栏
            redirect:'/index',//默认重定向
            children:[//子路由
                {
                    path:'/index',//首页加载
                    name:'index',
                    component:Index,
                },
                {
                    path:'/product/:id',//产品详情
                    name:'product',
                    component:Product,
                },
                {
                    path:'/detail/:id',//购物详情
                    name:'detail',
                    component:Detail,
                },
            ]
        },
        {
            path:'/cart',
            name:'cart',
            component:Cart,
        },
        {
            path:'/order',
            name:'order',
            component:Order,
            children:[
                {
                    path:'list',
                    name:'order-list',
                    component:OrderList
                },
                {
                    path:'pay',
                    name:'order-pay',
                    component:OrderPay
                },
                {
                    path:'confirm',
                    name:'order-confirm',
                    component:OrderConfirm
                }
                
            ]
        }
    ]
});