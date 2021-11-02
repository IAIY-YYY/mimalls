import Vue from 'vue'
import router from './router'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import store from './store'

// 使用elementUI
import {Message} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.use(VueLazyload,{/* 可以进行全局配置 */
  loading:'/imgs/loading-svg/loading-bars.svg',/* 会有一个指定的动画图片 */
});
Vue.use(VueCookie);
// 将elementUI导入原型
Vue.prototype.$message = Message;

// import env from './env'
import axios from 'axios'
// 生产环境的提示
Vue.config.productionTip = false
// 将axios设置到原型中，这样我们就可以this.axios调用了
Vue.prototype.axios = axios;

//定义mockjs插件开关  mockjs 模式获取axios数据
// const mock = false;
// if (mock) {
//   require('./mock/api')
// }


//根据前端的跨域方式做调整
axios.defaults.baseURL = '/api';//代理方式  vue.config.js中进行拦截  想要访问URL可以在vue.config.js中进行修改
//环境变量获取不同的请求地址
// axios.defaults.baseURL = env.baseURL;//CORS跨域和JSONP跨域的方法
axios.defaults.timeout = 8000;//超时时间
//响应 接口错误拦截
axios.interceptors.response.use((response)=>{
  // 获取值
  let res = response.data;

  // 做出限制。只有在index页面才可以看。其他页面未登录则会跳转到login中
  let path = location.hash;

  /* 
  内部固定意思
    data:[] 数据返回
    status:0 //表示成功
    msg：//错误信息
  */
  if(res.status == 0 ){
    return res.data;
  }else if(res.status == 10 ){//自定义状态码 此处10 为未登录状态码
    if(path!='/#/index'){/* 不等于index。则跳转到login */
      // 在这里取不到router，所以用window
      window.location.href = '/#/login';
    }
    return Promise.reject(res);/* 对错误信息进行抛出 */
  }else{
    this.$message.warning(res.msg);/* element.ui 错误报告 */
    return Promise.reject(res);/* 对错误信息进行抛出 */
  }
});


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
