// 配置环境
/* 
    根据不同的环境。配置不同的URL地址
*/
let baseURL;
// process.env.NODE_ENV   node中可以获取环境变量中的一些参数信息
// 主要讲的是CORS跨域配置和JSONP跨域的更改
//process.env.NODE_ENV  ->  package.json中的运行环境  --mode=XXXXX  
switch (process.env.NODE_ENV) {
    case 'development'://开发环境
        baseURL = 'http://dev-mall-pre.springboot.cn/api'
        break;
    case 'test'://测试
        baseURL = 'http://test-mall-pre.springboot.cn/api'
        break;
    case 'production'://线上
        baseURL = 'http://mall-pre.springboot.cn/api'
        break;
    default:
        baseURL = 'http://mall-pre.springboot.cn/api'
        break;
}


export default {
    baseURL
}