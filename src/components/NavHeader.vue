<template>
    <div class="header">
        <div class="nav-topbar"><!-- 顶部导航栏 -->
            <div class="container"><!-- 第二级导航 -->
                <div class="topbar-menu"><!-- 顶部导航栏菜单 -->
                    <!-- javascript:  可以防止页面刷新 -->
                    <a href="javascript:;">小米商城</a>
                    <a href="javascript:;">MUI</a>
                    <a href="javascript:;">云服务</a>
                    <a href="javascript:;">协议规则</a>
                </div>
                <div class="topbar-user">
                    <a href="javascript:;" v-if="username">{{username}}</a>
                    <a href="javascript:;" v-if="!username" @click="login">登录</a>
                    <a href="javascript:;" v-if="username">我的订单</a>
                    <a href="javascript:;" class="my-cart" @click="goToCart"><span class="icon-cart"></span>购物车({{cartCount}})</a>
                </div>
            </div>
        </div>
        <div class="nav-header">
            <div class="container">
                <!-- 左边图片logo -->
                <div class="header-logo">
                    <a href="/#/index"></a>
                </div>
                <!-- 中间文字 -->
                <div class="header-menu">
                    <div class="item-menu"><!-- 有下拉菜单，不适合用a标签 -->
                        <span>小米手机</span>
                        <div class="children">
                            <ul>
                                <li class="product" v-for="(item,index) in phoneList" :key="index">
                                    <!-- target 在新窗口打开链接 -->
                                    <a :href="'/#/product/'+item.id" target="_blank">
                                        <div class="pro-img">
                                            <img v-lazy="item.mainImage" :alt="item.subtitle">
                                        </div>
                                        <div class="pro-name">{{item.name}}</div>
                                        <div class="pro-price">{{item.price|currency}}</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="item-menu"><!-- 有下拉菜单，不适合用a标签 -->
                        <span>RedMi红米</span>
                    </div>
                    <div class="item-menu"><!-- 有下拉菜单，不适合用a标签 -->
                        <span>电视</span>
                        <div class="children">
                            <ul>
                                <li class="product">
                                    <!-- target 在新窗口打开链接 -->
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img v-lazy="'/imgs/nav-img/nav-3-1.jpg'" alt="">
                                        </div>
                                        <div class="pro-name">小米壁画电视 65英寸</div>
                                        <div class="pro-price">6999元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <!-- target 在新窗口打开链接 -->
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img v-lazy="'/imgs/nav-img/nav-3-2.jpg'" alt="">
                                        </div>
                                        <div class="pro-name">小米全面屏电视E55A</div>
                                        <div class="pro-price">1999元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <!-- target 在新窗口打开链接 -->
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img v-lazy="'/imgs/nav-img/nav-3-3.png'" alt="">
                                        </div>
                                        <div class="pro-name">小米电视4A 32英寸</div>
                                        <div class="pro-price">699元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <!-- target 在新窗口打开链接 -->
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img v-lazy="'/imgs/nav-img/nav-3-4.jpg'" alt="">
                                        </div>
                                        <div class="pro-name">小米电视4A 55英寸</div>
                                        <div class="pro-price">1799元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <!-- target 在新窗口打开链接 -->
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img v-lazy="'/imgs/nav-img/nav-3-5.jpg'" alt="">
                                        </div>
                                        <div class="pro-name">小米电视4A 65英寸</div>
                                        <div class="pro-price">2699元</div>
                                    </a>
                                </li>
                                <li class="product">
                                    <!-- target 在新窗口打开链接 -->
                                    <a href="" target="_blank">
                                        <div class="pro-img">
                                            <img v-lazy="'/imgs/nav-img/nav-3-6.png'" alt="">
                                        </div>
                                        <div class="pro-name">查看全部</div>
                                        <div class="pro-price">查看全部</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- 右边搜索框 -->
                <div class="header-search">
                    <div class="wapper">
                        <input type="text" name="keyword">
                        <a href="javascript:;"></a><!-- 用于定义搜索按钮 -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'nav-header',
    data () {/* 局部data。只服务于当前组件 */
        return {
            phoneList:[],/* 用于存储异步返回数据内容 */
        }
    },
    computed:{
        username(){
            return this.$store.state.username;
        },
        cartCount(){
            return this.$store.state.cartCount;
        }
    },
    filters:{/* 局部过滤器  给价格过滤。防止价格单位  元。分啥的  后台设置好的话这个过滤器可有可无*/
        currency(val){
            if(!val) return '0.00';
            return '￥'+ val.toFixed(2)+'元'
        }
    },
    mounted(){
        this.getProductList();/* 组件创建后执行方法 */
    },
    methods:{
        getProductList(){/* 获取手机商品列表 */
            //访问数据。 
            this.axios.get('/products',{
                params:{/* get的请求参数 */
                    categoryId:'100012'/* 请求 /products?categoryId=100012 中的数据*/,
                    pageSize:6,
                }
            }).then(res=>{/* 获取数据 */
                    this.phoneList = res.list;/* 将数据进行存储 */
            });
        },
        goToCart(){
            this.$router.push('/cart');/* 跳转到购物车 */
        },
        login(){
            this.$router.push('/login');/* 登录跳转 */
        }
    }

}
</script>

<style lang="scss">/* 定义模板是scss规则  需要安装scss-loader插件*/
@import "../assets/scss/base.scss";/* 导入container属性的公共样式  全局的 如果加上scoped会出错*/
@import "../assets/scss/mixin.scss";/* 对flex布局的复用 */
@import "../assets/scss/config.scss";/* 引用配置变量 */
.header{/* scss语法嵌套使用方法 */
    .nav-topbar{
        height: 39px;
        line-height: 39px;/* 行高 */
        background-color: #333333;
        color: #b0b0b0;
        .container{
            @include flex();/* 对重复的代码进行总结复用简化 */
            // display: flex;/* 清除块元素浮动 */
            // justify-content: space-between;/* 均匀排列每个元素   首个元素放置于起点，末尾元素放置于终点 */ 
            // align-items: center;/* 元素在侧轴居中。如果元素在侧轴上的高度高于其容器，那么在两个方向上溢出距离相同 */
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
                margin-right:0;
                .icon-cart{
                    @include bgImg(16px,12px,"/imgs/icon-cart-checked.png",contain);/* 利用mixin简化下面的代码 */
                    // display: inline-block;
                    // width: 16px;
                    // height: 12px;
                    // background: url("/imgs/icon-cart-checked.png") no-repeat center;
                    // background-size: contain;
                    margin-right: 4px;
                }
            }

    }
    }
    .nav-header{
        .container{
            @include flex(); 
            position: relative;/* 给下拉标签进行相对定位 */
            height: 112px;
            .header-logo{
                display: inline-block;/* 行内块元素 */
                width: 60px;
                height: 60px;
                border-radius: 40%;
                background-color: #FF6600;
                a{/* 两张logo的长度width */
                    display: inline-block;
                    width: 120px;
                    height: 60px;
                    /* 通过伪类 (设置两张图片)  */
                    &:before{
                        content:'';/* 内容为空 */
                        @include bgImg(60px,60px,'/imgs/mi-logo.png',55px);/* 利用mixin简化代码 */
                        transition: margin .2s;/* 指定哪一个元素需要进行过渡  */
                    }
                    &:after{
                        content:'';/* 内容为空  不加的话伪类生成不了。必须加content*/
                        @include bgImg(60px,60px,'/imgs/mi-home.png',55px);/* 利用mixin简化代码 */
                    }
                    &:hover:before{
                        margin-left: -60px;
                        transition: margin .2;/* 过渡元素 指定元素margin  2s过渡 */
                    }
                }

            }
            .header-menu{
                display: inline-block;
                width: 643px;
                padding-left: 209px;
                .item-menu{
                    display:inline-block;
                    color: #333333;
                    font-weight: bold;
                    font-size: 16px;
                    line-height: 112px;
                    margin-right: 20px;/* 文字间隔 */
                    span{
                        cursor: pointer;/* 定义鼠标触碰边小手形状 */
                    }
                    &:hover{/* 用于控制item-menu下拉表单 */
                        color: $colorA;
                        .children{
                            height: 220px;
                            opacity:1;
                        }
                    }
                    .children{
                        position: absolute;/* 绝对定位  脱离文档流*/
                        top: 112px;
                        left: 0;
                        width: 1226px;
                        height: 0;/* 默认为零。下拉hover触发时设置高度 */
                        opacity: 0;/* 透明度 */
                        overflow: hidden;/* 将元素隐藏。不触发 hover 条件*/
                        border-top: 1xp solid #e5e5e5;
                        box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);/* 阴影 */
                        background-color: #ffffff;
                        z-index: 10;
                        transition: height .5s;
                        .product{
                            float: left;
                            width: 16.6%;
                            height: 220px;
                            font-size: 12px;
                            line-height: 12px;
                            text-align: center;
                            position: relative;/* 给竖线定位 */
                            a{
                                display: inline-block;
                            }
                            img{/* 对图片进行设置 */
                                widows: auto;/* 定义高度之后自己撑开。比较合理 */
                                height: 111px;
                                margin-top:26px;
                            }
                            .pro-img{
                                height: 137px;
                            }
                            .pro-name{
                                font-weight: bold;/* 加粗 */
                                margin-top: 19px;
                                margin-bottom: 8px;
                                color: $colorB;
                            }
                            .pro-price{
                                color: $colorA;
                            }
                            &:before{/* 创建伪类。设置下拉表单右边的竖线 */
                                content:'';/* 伪类不占位。需要设置内容。可以设置为空 */
                                width: 1px;
                                height: 100px;
                                position: absolute;/* 给父元素设置相对定位才可以 */
                                top: 28px;
                                right: 0;
                                border-left: 1px solid $colorF;
                            }
                            &:last-child:before{/* 将列表中的最后一条竖线进行删除 */
                                display: none;
                            }
                        }

                    }
                }
            } 
            .header-search{
                width: 319px;
                .wapper{
                    height: 50px;
                    border: 1px solid #e0e0e0;
                    display: flex;
                    align-items: center;/* 垂直居中 */
                    input{
                        border: none;/* 边框消失 */
                        box-sizing: border-box;/* 设置为W3C盒模型。这样width就不包括padding值了。IE和模型包括 */
                        border-right:1px solid #e0e0e0;
                        width: 264px;
                        height: 50px;
                        padding-left: 14px;
                    }
                    a{/* 用于控制背景图片 */
                         @include bgImg(18px,18px,'/imgs/icon-search.png',contain);/* 利用mixin简化代码 */
                        margin-left:17px ;
                    }
                }
            }
        }
    }
}
</style>