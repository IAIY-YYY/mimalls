<template>
    <div class="product">
       <product-param :title='product.name' class="product-param">
           <template v-slot:buy><!-- 插槽的新语法 -->
               <button class="btn" @click="buy">立即购买</button><!-- class样式已经全局定义 -->
           </template>
       </product-param>
       <div class="content">
            <div class="item-bg">
                <h2>{{product.name}}</h2>
                <h3>{{product.subtitle}}</h3>
                <p>
                    <a href="" id="">全球首款双频 GP</a>
                    <span>|</span>
                    <a href="" id="">骁龙845</a>
                    <span>|</span>
                    <a href="" id="">AI 变焦双摄</a>
                    <span>|</span>
                    <a href="" id="">红外人脸识别</a>
                </p>
                <div class="price">
                    <span>￥<em>{{product.price}}</em></span>
                </div>
            </div>
            <div class="item-bg-2"></div>
            <div class="item-bg-3"></div>
            <div class="item-swiper">
                <swiper :options="swiperOption">
                    <swiper-slide><img src="/imgs/product/gallery-2.png" alt=""></swiper-slide>
                    <swiper-slide><img src="/imgs/product/gallery-3.png" alt=""></swiper-slide>
                    <swiper-slide><img src="/imgs/product/gallery-4.png" alt=""></swiper-slide>
                    <swiper-slide><img src="/imgs/product/gallery-5.jpg" alt=""></swiper-slide>
                    <swiper-slide><img src="/imgs/product/gallery-6.jpg" alt=""></swiper-slide>
                    <!-- Optional controls -->
                    <div class="swiper-pagination"  slot="pagination"></div>
                </swiper>
                    <p class="desc">小米8 AI变焦双摄拍摄</p>
            </div>
            <div class="item-video">
                <h2>60帧超慢动作摄影<br/>慢慢回味每一瞬间的精彩</h2>
                <p>后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！<br/>更能AI 精准分析视频内容，15个场景智能匹配背景音效。</p>
                <div class="video-bg" @click="showSlide='slideDown'"></div><!-- 点击背景图片弹出动画 -->
                <div class="video-box"><!-- 视频盒子 -->
                    <div class="overlay" v-if="showSlide=='slideDown'"></div>><!-- 视频的制造 -->
                    <div class="video" :class="showSlide"><!-- 视频 -->
                        <span class="icon-close" @click="showSlide='slideUp'"></span><!-- 添加关闭按钮 -->
                        <!-- controls:视频播放控件 需要设置视频才可以播放 --> 
                        <!-- autoplay自动播放 -->
                        <!-- muted静音输出 -->
                        <video src="/imgs/product/video.mp4" muted autoplay controls="controls"></video>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import ProductParam from '../components/ProductParam.vue'
export default {
    name:'product',
    components: { 
      Swiper,
      SwiperSlide,
      ProductParam
    },
    data(){
      return {
        showSlide:'',/* 控制video的过渡动画 */
        product:{},/* 保存商品信息 */
        swiperOption:{//可以查看Swiper插件文档
          autoplay:true,
          slidesPerView:3,
          spaceBetween: 30,
          freeMode: true,
          pagination: {
            el: '.swiper-pagination',
            clickable :true,
          }
        }
      }
    },
    mounted(){
        this.getProductInfo();
    },
    methods:{
        getProductInfo(){
            let id = this.$route.params.id;//获取当前页面的商品id
            this.axios.get('/products/'+id).then(res=>{
                this.product = res;//保存信息
            })
        },
        buy(){/* 立即购买按钮 */
            let id = this.$route.params.id;
            this.$router.push('/detail/'+id);
        }
    }
}
</script>

<style lang="scss">
 @import './../assets/scss/mixin.scss';
.product{
    .product-param{
        z-index: 10;
    }
    .content{
      .item-bg{
        background:url('/imgs/product/product-bg-1.png') no-repeat center;
        height:718px;
        text-align:center;
        h2{
          font-size:80px;
          padding-top:55px;
        }
        h3{
          font-size:24px;
          letter-spacing: 10px;
        }
        p{
          margin-top:21px;
          margin-bottom:40px;
          a{
            font-size:16px;
            color:#333333;
          }
          span{
            margin:0 15px;
          }
        }
        .price{
          font-size:30px;
          color:#333333;
          em{
            font-style:normal;
            font-size:38px;
          }
        }
      }
      .item-bg-2{
        background:url(/imgs/product/product-bg-2.png) no-repeat center;
        height:480px;
        background-size:1226px 397px;
      }
      .item-bg-3{
        background:url(/imgs/product/product-bg-3.png) no-repeat center;
        height:638px;
        background-size:cover;
      }
      .item-swiper{
        margin:36px auto 52px;
        z-index: 9;
        .desc{
          font-size:18px;
          color:#333333;
          text-align:center;
        }
        img{
          width:100%;
        }
      }
      .item-video{
        height:1044px;
        background-color:#070708;
        margin-bottom:76px;
        color:#FFFFFF;
        text-align:center;
        h2{
          font-size:60px;
          padding-top:82px;
          margin-bottom:47px;
        }
        p{
          font-size:24px;
          margin-bottom:58px;
        }
        .video-bg{
          background:url('/imgs/product/gallery-1.png') no-repeat center;
          background-size:cover;
          width:1226px;
          height:540px;
          margin:0 auto 120px;
          cursor:pointer;
        }
        .video-box{
            .overlay{
                @include position(fixed);
                opacity: .4;//透明度
                background-color:#cccccc;
                z-index: 11;
            }
            /* 
                视频播放动画  方案二
            */
            @keyframes slideDown{
                from{
                    top:-50%;
                    opacity: 0;
                }
                to{
                    top:50%;
                    opacity: 1;
                }
            }
            @keyframes slideUp{
                from{
                    top:50%;
                    opacity: 1;
                }
                to{
                    top:-50%;
                    opacity: 0;
                }
            }
            .video{
                /* 
                    fiexd/absolute都会使元素脱离文档流
                    fixed是相对于整个窗口定位
                    absolute是相对于document文档定位
                */
                z-index: 12;
                position:fixed;//设置视频居中
                top: -50%;
                left: 50%;
                transform: translate(-50%,-50%);
                width: 1000px;//设置视频大小
                height: 536px;
                opacity: 0;
                &.slideDown{/* 调用动画  方案二*/
                    animation: slideDown .6s linear;
                    top: 50%;/* 动画只执行一次,会变回原样  使用top固定 */
                    opacity: 1;
                }
                &.slideUp{/* 调用动画 方案二*/
                    animation: slideUp .6s linear;
                }
                //opacity: 0;/* 隐藏播放框 */
                // transition: all .6s,;方案一
                // &.slide{/* 过渡动画 */
                //     top:50%;
                //     opacity: 1;/* 显示播放框 */
                // }/* 播放动画效果  方案一 */
                .icon-close{
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    cursor:pointer;
                    @include bgImg(20px,20px,'/imgs/icon-close.png');
                    z-index: 10;
                }
                video{
                    width: 100%;//填充整个父容器
                    height: 100%;
                    object-fit: cover;//将整个视频覆盖整个窗口
                    outline: none;//覆盖视频内置样式
                }
            }
        }
      }
    }
    button{
        margin-left: 10px;
    }
}
</style>