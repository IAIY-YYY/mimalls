<template>
    <div class="cart">
        <order-header title="我的购物车">
            <template v-slot:tip>
                <span>温馨提示:产品是否购买成功，以最终下单为准哦，请尽快结算</span>
            </template>
        </order-header>
        <div class="wrapper">
            <div class="container">
                <div class="cart-box">
                    <ul class="cart-item-head">
                        <li class="col-1"><span class="checkbox" :class="{'checked':allChecked}" @click="toggleAll"></span>全选</li><!-- allChecked 后台已经进行判断是否全选 -->
                        <li class="col-3">商品名称</li>
                        <li class="col-1">单价</li>
                        <li class="col-2">数量</li>
                        <li class="col-1">小计</li>
                        <li class="col-1">操作</li>
                    </ul>
                    <ul class="cart-item-list">
                        <li class="cart-item" v-for="(item,index) in list" :key="index">
                            <div class="item-check">
                                <span class="checkbox" :class="{'checked':item.productSelected}"  @click="updateCart(item)" ></span>
                            </div>
                            <div class="item-name">
                                <img v-lazy="item.productMainImage" alt="">
                                <span>{{item.productName+','+item.productSubtitle}}</span>
                            </div>
                            <div class="item-price">{{item.productPrice}}</div>
                            <div class="item-num">
                                <div class="num-box">
                                    <a href="javascript:;" @click="updateCart(item,'-')" >-</a>
                                    <span>{{item.quantity}}</span>
                                    <a href="javascript:;" @click="updateCart(item,'+')" >+</a>
                                </div>
                            </div>
                            <div class="item-total">{{item.productTotalPrice}}</div>
                            <div class="item-del" @click="delProduct(item)" ></div>
                        </li>
                    </ul>
                </div>
                <div class="order-wrap clearfix">
                    <div class="cart-tip fl">
                        <a href="/#/index">继续购物</a>
                        共<span>{{list.length}}</span>件商品，已选择<span>{{checkedNum}}</span>件
                    </div>
                    <div class="total fr">
                        合计：<span>{{cartTotalPrice}}</span>元<!-- 金额数量等都是后台已经进行计算 -->
                        <a href="javascript:;" class="btn" @click="order">去结算</a>
                    </div>
                </div>
            </div>
        </div>
        <service-bar></service-bar>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
import OrderHeader from '../components/OrderHeader.vue'
import NavFooter from '../components/NavFooter.vue'
import ServiceBar from '../components/Service-bar.vue'
export default {
    name:'cart',
    components:{
        OrderHeader,
        NavFooter,
        ServiceBar,
    },
    data () {
        return {
            showModal:false,
            list:[],//商品列表
            allChecked:false,//是否全选
            cartTotalPrice:0,//商品总金额
            checkedNum:0,//选中商品的数量
        }
    },
    mounted () {
        this.getCartList();
    },
    methods: {
        //获取购物车列表信息
        getCartList(){
            this.axios.get('/carts').then((res)=>{
                //对商品信息存储
                this.renderData(res);
            })
        },
        //更新购物车数量和购物车单选状态
        updateCart(item,type){/* 控制商品的加减 */
            let quantity = item.quantity;/* 获取商品的数量 */
            let selected = item.productSelected;//商品是否选中
            if (type == '-') {//商品增加时
                if (quantity==1) {
                    alert('商品至少保留一件');
                    return;
                }
                --quantity;
            }else if(type == '+'){//商品减少时
                // 判断数量是否大于库存(后台有库存)
                if (quantity>=item.productStock) {
                    alert('商品不能超过库存数量');
                    return;
                }
                ++quantity
            }else{//单列商品选中
                selected = !item.productSelected;/* 选中取反 */
            }
            // 更新商品的状态地址
            //调用选中商品的接口进行更改。 
            this.axios.put('/carts/'+item.productId,{
                quantity,
                selected,
            }).then(res=>{
                this.renderData(res);//再次对商品信息进行更改
            })
        },
        //删除商品
        delProduct(item){
                //调用删除商品接口
                this.axios.delete('/carts/'+item.productId).then(res=>{
                    this.renderData(res);//再次对商品信息进行更改
                })
        },
        //控制全选功能
        toggleAll(){
            let url = this.allChecked?'/carts/unSelectAll':'/carts/selectAll';/* 后台给出商品选中判断。直接判断状态即可 */
            this.axios.put(url).then(res=>{
                //对商品的信息重新赋值计算一次 
                this.renderData(res);
            })
        },
        //对商品信息进行抽取  简化代码
        renderData(res){
            this.list = res.cartProductVoList || [];/* 将添加的商品添加  后台已经做好程序 */
            this.allChecked = res.selectedAll;/* 获取选中信息 后台已经做好相应程序  selectedAll默认为true*/
            this.cartTotalPrice = res.cartTotalPrice;/* 总金额 */
            this.checkedNum = this.list.filter(item=>item.productSelected).length;/* 过滤出选中的商品数量 */
        },
        //购物车下单
        order(){
            //判断商品选中
            //返回的是一个boolean值
            //判断每一件是否选中。如果每一件都没有选中的话，则ischeck=true 。反之 isCheck=false
            let isCheck = this.list.every(item=>!item.productSelected);
            if(isCheck){
                alert('请选择一件商品')
            }else{
                this.$router.push('/order/confirm');
            }
        }
    }
}
</script>

<style lang="scss">
.cart{
    .wrapper{
      background-color:#F5F5F5;
      padding-top:30px;
      padding-bottom:114px;
      .cart-box{
        background-color:#fff;
        font-size:14px;
        color:#999999;
        text-align:center;
        .checkbox{
          display: inline-block;
          width: 22px;
          height: 22px;
          border: 1px solid #E5E5E5;
          vertical-align: middle;
          margin-right: 17px;
          cursor:pointer;
          &.checked{
            background:url('/imgs/icon-gou.png') #FF6600 no-repeat center;
            background-size:16px 12px;
            border:none;
          }
        }
        .cart-item-head{
          display:flex;
          height: 79px;
          line-height: 79px;
          .col-1{
            flex:1;
          }
          .col-2{
            flex:2;
          }
          .col-3{
            flex:3;
          }
        }
        .cart-item-list{
          .cart-item{
            display:flex;
            align-items:center;
            height:125px;
            border-top:1px solid #E5E5E5;
            font-size:16px;
            .item-check{
              flex:1;
            }
            .item-name{
              flex:3;
              font-size: 18px;
              color: #333333;
              display: flex;
              align-items: center;
              img{
                width:80px;
                height:80px;
                vertical-align:middle;/* 图文居中 */
              }
              span{
                margin-left: 30px;
              }
            }
            .item-price{
              flex:1;
              color:#333333;
            }
            .item-num{
              flex:2;
              .num-box{
                display:inline-block;
                width:150px;
                height:40px;
                line-height:40px;
                border:1px solid #E5E5E5;
                font-size:14px;
                a{
                  display:inline-block;
                  width:50px;
                  color:#333333;
                }
                span{
                  display:inline-block;
                  width:50px;
                  color:#333333;
                }
              }
            }
            .item-total{
              flex:1;
              color:#FF6600;
            }
            .item-del{
              flex:1;
              width:14px;
              height:12px;
              background:url('/imgs/icon-close.png') no-repeat center;
              background-size:contain;
              cursor:pointer;
            }
          }
        }
      }
      .order-wrap{
        font-size:14px;
        color: #666666;
        margin-top: 20px;
        height: 50px;
        line-height: 50px;
        .cart-tip{
          margin-left: 29px;
          a{
            color: #666666;
            margin-right:37px;
          }
          span{
            color:#FF6600;
            margin:0 5px;
          }
        }
        .total{
          font-size:14px;
          color:#FF6600;
          span{
            font-size:24px;
          }
          a{
            width:202px;
            height:50px;
            line-height:50px;
            font-size:18px;
            margin-left:37px;
          }
        }
      }
    }
  }
</style>