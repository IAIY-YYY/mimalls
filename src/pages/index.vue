<template>
    <div class="index">
        <div class="container">
            <div class="swiper-box">
                <div class="nav-menu"><!-- 轮播图旁的导航 -->
                    <ul class="menu-wrap">
                        <li class="menu-item">
                            <a href="javascript:;">手机 电话卡 </a>
                            <div class="children"><!-- 导航出的内容 -->
                                <ul v-for="(item,index) in menuList" :key="index">
                                    <li v-for="(sub,index) in item" :key="index">
                                        <a :href="sub?'#/poduct/'+sub.id:''"><!-- 判断sub是否为true。判断取值 -->
                                            <img :src="sub?sub.img:'/imgs/item-box-1.png'" alt="">
                                            {{sub?sub.name:'小米9'}}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">电视 盒子 </a>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">笔记本 平板 </a>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">家电 插线板 </a>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">出行 穿戴 </a>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">智能 路由器 </a>
                        </li>
                        <li class="menu-item">
                            <a href="javascript:;">电源 配件 </a>
                        </li>
                        <li class="menu-item">
                        <a href="javascript:;">生活 香包 </a>
                        </li>
                    </ul>
                </div>
                <!-- swiper插件内容。可以去查找文档 -->
                <swiper :options="swiperOption">
                    <!-- 图片轮播 -->
                    <swiper-slide v-for="(item,index) in slideList" :key="index">
                        <a :href="'/#/product/'+item.id"><img :src="item.img" alt=""></a>
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div><!-- 分页器 -->
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
                </swiper>
            </div>
            <div class="ads-box"></div>
            <div class="banner"></div>
            <div class="product-box"></div>
        </div>
        <service-bar></service-bar>
    </div>
</template>

<script>
import ServiceBar from '../components/Service-bar.vue'

/* 导入轮播图插件中的组件 */
import {Swiper,SwiperSlide} from 'vue-awesome-swiper'  
import 'swiper/css/swiper.css'/* 需要导入样式，否则不会生效 */


export default {
    name:'index',
    components:{
        ServiceBar,
        Swiper,
        SwiperSlide
    },
    data () {
        return {
            // swiperOption 内的参数都是插件文档中定义好的  可以看文档
            swiperOption:{/* options的属性 */
                autoplay:true,/* 自动播放 */
                loop:true,/* 自动循环 */
                effect:'cube',/* 切换效果 */
                cubeEffect: {/* 查看swiper文档有具体介绍 */
                    shadowOffset: 100,
                    shadowScale: 0.6
                },
                pagination: {/* 分页器 */
                    el: '.swiper-pagination',
                    clickable :true,/* 此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。 */
                },
                navigation: {/* 前进后退导航 */
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },    
            },
            slideList:[/* 图片的循环列表数组 */
                {
                    id:'42',
                    img:'/imgs/slider/slide-1.jpg'
                },
                {
                    id:'45',
                    img:'/imgs/slider/slide-2.jpg'
                },
                {
                    id:'46',
                    img:'/imgs/slider/slide-3.jpg'
                },
                {
                    id:'',
                    img:'/imgs/slider/slide-4.jpg'
                },
                {
                    id:'',
                    img:'/imgs/slider/slide-5.jpg'
                }
            ],
            menuList:[/* 设置一个二位数组。存放菜单 */
                [
                    {
                        id:30,/* 可以从数据中获取数据 */
                        img:'/imgs/item-box-1.png',
                        name:'小米CC9',
                    },
                    {
                        id:31,/* 可以从数据中获取数据 */
                        img:'/imgs/item-box-2.png',
                        name:'小米8 青春版',
                    },
                    {
                        id:32,/* 可以从数据中获取数据 */
                        img:'/imgs/item-box-3.jpg',
                        name:'RedMi K20 Pro',
                    },
                    {
                        id:33,/* 可以从数据中获取数据 */
                        img:'/imgs/item-box-4.jpg',
                        name:'移动4G专区',
                    }
                ],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
            ]
        }
    }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/mixin.scss";/* 对布局的复用 */
.index{
    .swiper-box{
        .nav-menu{
            position: absolute;
            width: 264px;
            height: 459px;
            z-index: 9;
            padding: 26px 0;/* 内边距上下26  左右0 */
            background-color: #55585a7a;
            box-sizing: border-box;/* 设置为W3C模型。不包括padding */
            .menu-wrap{
                .menu-item{
                    height: 50px;
                    line-height: 50px;
                    a{
                        display: block;
                        position: relative;
                        font-size:16px;
                        color: #ffffff;
                        padding-left: 30px;
                        &:after{
                            position: absolute;/* 相对于a(块级元素)定位 */
                            right: 30px;
                            top: 17.5px;
                            content:'';
                            @include bgImg(10px,15px,'/imgs/icon-arrow.png');
                        }
                    }
                    &:hover{
                        background-color: #ff6600;
                        .children{
                                width: 962px;
                                opacity: 0.9;/* 透明度 */
                            }
                    }
                    .children{
                        overflow: hidden;
                        width: 0px;
                        height: 459px;
                        background-color: #FFFFFF;
                        position: absolute;
                        top: 0;
                        left: 264px;
                        // border: 1px solid #55585a7a;
                        transition: width .5s;
                        ul{
                            display: flex;
                            justify-content: space-between;/* 两边对齐 */
                            height: 75px;
                            li{
                                height: 75px;
                                line-height: 75px;
                                flex: 1;
                                padding-left: 23px;
                                a{
                                    color: #333333;
                                    font-size: 14px;
                                    img{
                                        width: 42px;
                                        height: 35px;
                                        margin-right: 15px;
                                        vertical-align: middle;/* 图片文字居中 */
                                    }
                                }
                            
                            }
                            
                        }
                    }
                }
            }
        }
        .swiper-container{/* 覆盖插件内的样式 */
            height: 451px;
            .swiper-button-prev{
                left: 274px;
            }
            img{
                width: 100%;
            }
        }
    }
}
</style>