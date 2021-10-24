module.exports = {
    devServer:{
        host:'localhost',
        port:8080,
        proxy:{
            // 拦截URL  有/activity的地址，就会跳转到target目标
            '/api':{
                target:'https://www.imooc.com',//跳转目标
                changeOrigin:true,//是否将主机头的主机头更改为目标的URL地址
                pathRewrite:{
                    '/api':''
                }
            }
        }
    }
}