import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

// 导入组件  按需加载
import Home from './pages/home.vue'
import Index from './pages/index.vue'

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
                    component:() => import('./pages/product.vue'),
                },
                {
                    path:'/detail/:id',//购物详情
                    name:'detail',
                    component:() => import('./pages/detail.vue'),
                },
            ]
        },
        {
            path:'/cart',
            name:'cart',
            component:() => import('./pages/cart.vue'),
        },
        {
            path:'/login',
            name:'login',
            component:() => import('./pages/login.vue'),
        },
        {
            path:'/order',
            name:'order',
            component:() => import('./pages/order.vue'),
            children:[
                {
                    path:'list',
                    name:'order-list',
                    component:() => import('./pages/orderList.vue')
                },
                {
                    path:'pay',
                    name:'order-pay',
                    component:() => import('./pages/orderPay.vue')
                },
                {
                    path:'confirm',
                    name:'order-confirm',
                    component:() => import('./pages/orderConfirm.vue')
                },
                {
                    path:'alipay',
                    name:'alipay',
                    component:() => import('./pages/alipay.vue')
                }
                
            ]
        }
    ]
});