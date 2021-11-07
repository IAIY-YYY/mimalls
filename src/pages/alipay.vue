<template>
    <div class="ali-pay"><!-- 支付宝支付功能组件 -->
        <loading v-if="loading"></loading>
        <div class="form" v-html="content"></div>
    </div>
</template>

<script>
import loading from '../components/Loading.vue'
export default {
    name:'alipay',
    data () {
        return {
            orderId:this.$route.query.orderId,//订单号
            content:'',//接口返回的源码
            loading:true
        }
    },
    components: {
        loading
    },
    mounted () {
        this.paySubmit()
    },
    methods: {
        paySubmit(){
            this.axios.post('/pay',{/* 后台已经弄好。不理解 */
                orderId:this.orderId,
                orderName:'Vue高仿小米商城',//扫码支付时订单的名称
                amount:0.01,//单位元
                payType:1//1 支付宝, 2 微信
            }).then(res=>{
                this.content = res.content;//支付的源码。接口内自动生成
                setTimeout(()=>{
                    /* submit() 方法把表单数据提交到 Web 服务器。 */
                    document.forms[0].submit();//forms是v-html中渲染出来的表单  
                },1000)
            })
        }
    }
}
</script>

<style scoped>

</style>