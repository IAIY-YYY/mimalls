module.exports = {
    devServer:{
        host:'localhost',
        port:8080,
        proxy:{//代理模式，访问服务器信息
            // 拦截URL  有/activity的地址，就会跳转到target目标
            '/api':{
                target:'http://mall-pre.springboot.cn',//跳转目标
                changeOrigin:true,//是否将主机头的主机头更改为目标的URL地址
                pathRewrite:{
                    '/api':''
                }
            }
        }
    },
    // publicPath:'/app',//在根目录上加上/app子目录
    // outputDir:'dist',//修改打包名称  默认为dist
    // indexPath:'index2.html',//修改打包后原index文件名
    // lintOnSave:false,//ESLint，false后不报错
    productionSourceMap:false,//关闭后打包不再有.map文件。别人看不到源码
    chainWebpack:(config)=>{//删除预加载。完成真正的按需加载
        config.plugins.delete('prefetch');
    }
}