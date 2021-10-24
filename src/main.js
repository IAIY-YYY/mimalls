import Vue from 'vue'
import router from './router'
import App from './App.vue'

// import env from './env'
import axios from 'axios'
// 生产环境的提示
Vue.config.productionTip = false
// 将axios设置到原型中，这样我们就可以this.axios调用了
Vue.prototype.axios = axios;

//定义mockjs插件开关
const mock = true;
if (mock) {
  require('./mock/api')
}


//根据前端的跨域方式做调整
axios.defaults.baseURL = '/api';//代理方式  vue.config.js中进行拦截  想要访问URL可以在vue.config.js中进行修改
//环境变量获取不同的请求地址
// axios.defaults.baseURL = env.baseURL;//CORS跨域和JSONP跨域的方法
axios.defaults.timeout = 8000;//超时时间
//响应 接口错误拦截
axios.interceptors.response.use((response)=>{
  // 获取值
  let res = response.data;
  /* 
  内部固定意思
    data:[] 数据返回
    status:0 //表示成功
    msg：//错误信息
  */
  if(res.status == 0 ){
    return res.data;
  }else if(res.status == 10 ){//自定义状态码 此处10 为未登录状态码
    // 在这里取不到router，所以用window
    window.location.href = '/#/login';
  }else{
    alert(res.msg);
  }
});



new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
