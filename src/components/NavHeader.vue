<template>
    <div class="header">
        <div class="nav-topbar"><!-- 顶部导航栏 -->
            <div class="container"><!-- 第二级导航 -->
                <div class="topbar-menu"><!-- 顶部导航栏菜单 -->
                    <!-- javascript:  可以防止页面刷新 -->
                    <a href="javascript:">小米商城</a>
                    <a href="javascript:">MUI</a>
                    <a href="javascript:">云服务</a>
                    <a href="javascript:">协议规则</a>
                </div>
                <div class="topbar-user">
                    <a href="javascript:">登录</a>
                    <a href="javascript:">注册</a>
                    <a href="javascript:" class="my-cart"><span class="icon-cart"></span>购物车</a>
                </div>
            </div>
        </div>
        <div class="nav-header">
            <div class="container">
                <div class="header-logo">
                    <a href="/#/index"></a>
                </div>
                <div class="header-menu">
                    <div class="item-menu"><!-- 有下拉菜单，不适合用a标签 -->
                        <span>小米手机</span>
                        <div class="children"></div>
                    </div>
                    <div class="item-menu"><!-- 有下拉菜单，不适合用a标签 -->
                        <span>RedMi红米</span>
                        <div class="children"></div>
                    </div>
                    <div class="item-menu"><!-- 有下拉菜单，不适合用a标签 -->
                        <span>电视</span>
                        <div class="children"></div>
                    </div>
                </div>
                <div class="header-search"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'nav-header'
}
</script>

<style lang="scss">/* 定义模板是scss规则  需要安装scss-loader插件*/
@import url("../assets/scss/base.scss");/* 导入container属性的公共样式 */
.header{/* scss语法嵌套使用方法 */
    .nav-topbar{
        height: 39px;
        line-height: 39px;/* 行高 */
        background-color: #333333;
        color: #b0b0b0;
        .container{
            display: flex;/* 清除块元素浮动 */
            justify-content: space-between;/* 均匀排列每个元素   首个元素放置于起点，末尾元素放置于终点 */ 
            align-items: center;/* 元素在侧轴居中。如果元素在侧轴上的高度高于其容器，那么在两个方向上溢出距离相同 */
            a{
                display: inline-block;/* 设置为行内块元素 */
                color: #b0b0b0;
                margin-right: 17px;
            }
            .my-cart{
                width: 110px;
                background-color: #FF6600;
                text-align: center;
                color: #ffffff;
                .icon-cart{
                    display: inline-block;
                    width: 16px;
                    height: 12px;
                    background: url("/imgs/icon-cart-checked.png") no-repeat center;
                    background-size: contain;
                    margin-right: 4px;
                }
            }

    }
    }
    .nav-header{
        .container{
            height: 112px;
            display: flex;/* 通过flex进行布局 */
            justify-content: space-between;/* 首个元素放置于起点，末尾元素放置于终点 */
            align-items: center;/* 使元素在块内居中 */
            .header-logo{
                display: inline-block;/* 行内块元素 */
                width: 55px;
                height: 55px;
                background-color: #FF6600;
                a{/* 两张logo的长度width */
                    display: inline-block;
                    width: 110px;
                    height: 55px;
                    /* 通过伪类 (设置两张图片)  */
                    &:before{
                        content:'';/* 内容为空 */
                        display: inline-block;
                        width: 55px;
                        height: 55px;
                        background:url('/imgs/mi-logo.png') no-repeat center;
                        background-size: 55px;
                        transition: margin .2s;/* 指定哪一个元素需要进行过渡  */
                    }
                    &:after{
                        content:'';/* 内容为空  不加的话伪类生成不了。必须加content*/
                        display: inline-block;
                        width: 55px;
                        height: 55px;
                        background:url('/imgs/mi-home.png') no-repeat center;
                        background-size: 55px;
                    }
                    &:hover:before{
                        margin-left: -55px;
                        transition: margin .2;/* 过渡元素 指定元素margin  2s过渡 */
                    }
                }
            }
        }
    }
}
</style>