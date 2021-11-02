<template>
    <div class="order-header">
        <div class="container clearfix">
            <!-- 左边图片logo -->
            <div class="header-logo">
                <a href="/#/index"></a>
            </div>
            <div class="title">
                <h2>{{title}}<slot name="tip"></slot></h2>
            </div>
            <div class="username">
                <a href="javascript:;">{{username}}</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'order-header',
    props: {
        title:{
            type:String,
        }
    },
    computed:{
        username(){
            return this.$store.state.username;
        },
        cartCount(){
            return this.$store.state.cartCount;
        }
    }
}
</script>

<style lang="scss">
.order-header{
    border-bottom: 2px solid #ff6600;
    .container{
        padding: 15px 0;
        .header-logo{
            float: left;/* 用到浮动。会使元素的样式塌陷  需要清除浮动 */
        }
        .title,.username{
            display: inline-block;
            height: 55px;
            line-height: 55px;
            
        }
        .title{
            font-size: 18px;
            float: left;
            color: #333333;
            margin-left: 54px;
            span{
                font-size: 14px;
                margin-left: 17px;
                color: #999999;
                font-weight: bold;
            }
        }
        .username{
            float: right;
            a{
                color: #666666;
                font-size: 16px;
            }
        }
    }
}
</style>