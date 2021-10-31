<template>
    <div class="nav-bar" :class="{'is_fixed':isFixed}"><!-- 详情页顶部导航 -->
        <div class="container">
            <div class="pro-title"><!-- 标题 -->
                {{title}}
            </div>
            <div class="pro-param"><!-- 参数介绍 -->
                <a href="javascript:;">概述</a><span>|</span>
                <a href="javascript:;">参数</a><span>|</span>
                <a href="javascript:;">用户评价</a>
                <slot name="buy"></slot><!-- 定义插槽灵活使用 可以是立即购买。也可以是加入购物车。可以自己定义 -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'nav-bar',
    props: {
        title:{
            type:String,
        }
    },
    data () {
        return {
            isFixed:false,
        }
    },
    mounted () {
        /* 
            组件吸顶。
            定义滚动事件。获取滚动的高度
        */
        window.addEventListener('scroll',this.initHeight);
    },
    methods: {
        initHeight(){
            // 兼容性问题  三个方法都可以获取到
            let scrollTop = window.pageXOffset || document.documentElement.scrollTop || document.body.scrollTop;
            //判断是否需要定位吸顶。
            this.isFixed = scrollTop > 152 ? true:false;
        }
    },
    destroyed () {
        // 销毁事件 优化性能
        /* 
            true 捕获
            false 冒泡
        */
        window.removeEventListener('scroll',this.initHeight,false);
    }
}
</script>

<style lang="scss">
@import '../assets/scss/mixin.scss';
@import '../assets/scss/config.scss';
.nav-bar{
    height: 70px;
    line-height: 70px;
    border-top: 1px solid $colorH;
    background-color: $colorG;
    &.is_fixed{
        position:fixed;//固定定位  脱离正常文档流
        top:0;
        width: 100%;
        box-shadow: 0 5px 5px $colorE;
    }
    .container{
        @include flex();/* 引入左右布局 */
        .pro-title{
            font-size: $fontH;
            color: $colorB;
            font-weight: bold;/* 加粗 */
        }
        .pro-param{
            font-size: $fontJ;
            span{
                margin: 0 10px;
            }
            a{
                color: $colorC;
            }
        }
    }
}
</style>