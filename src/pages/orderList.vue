<template>
    <div class="order-list">
      <order-header  title="订单列表">
        <template v-slot:tip>
          <span>请谨防钓鱼链接或诈骗电话，了解更多</span>
        </template>
      </order-header>
      <div class="wrapper">
        <div class="container">
          <div class="order-box">
            <loading v-if="loading"></loading><!-- 等待——组件 -->
            <div class="order" v-for="(order,index) in list" :key="index">
              <div class="order-title">
                <div class="item-info fl">
                  {{order.createTime}}
                  <span>|</span>
                  {{order.receiverName}}
                  <span>|</span>
                  订单号：{{order.orderNo}}
                  <span>|</span>
                  {{order.paymentTypeDesc}}
                </div>
                <div class="item-money fr">
                  <span>应付金额：</span>
                  <span class="money">{{order.payment}}</span>
                  <span>元</span>
                </div>
              </div>
              <div class="order-content clearfix">
                <div class="good-box fl">
                  <div class="good-list" v-for="(item,i) in order.orderItemVoList" :key="i">
                    <div class="good-img">
                      <img v-lazy="item.productImage" alt="">
                    </div>
                    <div class="good-name">
                      <div class="p-name">{{item.productName}}</div>
                      <div class="p-money">{{item.totalPrice + 'X' + item.quantity}}元</div>
                    </div>
                  </div>
                </div>
                <div class="good-state fr" v-if="order.status == 20"><!-- 已付款 -->
                  <a href="javascript:;">{{order.statusDesc}}</a>
                </div>
                <div class="good-state fr" v-else><!-- 已付款 -->
                  <a href="javascript:;" @click="goPay(order.orderNo)">{{order.statusDesc}}</a>
                </div>
              </div>
            </div>
            <el-pagination
              v-if="false"
              class="pagination"
              background
              layout='prev,pager,next'
              :page-size="pageSize"
              :total='total'
              @current-change ="handleChang"
            ><!-- 分页器的内置方法属性 -->
            </el-pagination><!-- 第一种方法实现分页 -->
            <div class="load-more"><!-- 第二种方法实现加载更多 -->
              <el-button type="primary" :loading="loading" @click="loadMore">加载更多</el-button>
            </div>
            <no-data v-if="!loading && list.length==0"></no-data>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import Loading from '../components/Loading.vue'
import OrderHeader from '../components/OrderHeader.vue'
import NoData from '../components/NoData'


import {pagination,Button} from 'element-ui'/* 分页器的导入 */

export default {
    name:'order-list',
    components:{
      Loading,
      OrderHeader,
      NoData,
      [pagination.name]:pagination,
      [Button.name]:Button
    },
    data () {
      return {
        list:[],//订单的列表
        loading:false,//等待的状态显示


        pageSize:10,//分页器的数量
        pageNum:1,
        total:0,
      }
    },
    mounted () {
      this.getOrderList();
    },
    methods: {
      getOrderList(){//获取订单列表
        this.loading = true;
        this.axios.get('/orders',{
          params:{
            pageSize:1,/* 一页两条 */
            pageNum:this.pageNum
          }
        }).then((res)=>{
          this.loading = false;
          this.list = this.list.concat(res.list);/* 对数组进行累加  点击加载更多时可以不覆盖  使用第一种方法时不用累加*/
          this.total = res.total;/* 多少条的数据。分页器中的内容 */
        }).catch(()=>{
          this.loading = false
        })
      },
      goPay(orderNo){
        /* 
          三种跳转路由的方式
        */
        // this.$router.push('/order/pay');  第一种
        this.$router.push({ //第二种
          path:'/order/pay', 
          query:{
            orderNo
          }
        })
        /* this.$router.push({  第三种
          name:'',//路由设置的名称name
          params:{
            //参数
            orderNo
          }
        }) */
      },
      handleChang(pageNum){/* 点击分页(存在一个当前页回调参数)  分页器中的自定义事件 */
        this.pageNum = pageNum;
        this.getOrderList()
      },
      loadMore(){//点击加载更多
        this.pageNum++;
        this.getOrderList();
      }
    }
}
</script>

<style lang="scss">
  @import '../assets/scss/config.scss';
  @import '../assets/scss/mixin.scss';
  .order-list{
    .wrapper{
      background-color:$colorJ;
      padding-top:33px;
      padding-bottom:110px;
      .order-box{
        .order{
          @include border();
          background-color:$colorG;
          margin-bottom:31px;
          &:last-child{
            margin-bottom:0;
          }
          .order-title{
            @include height(74px);
            background-color:$colorK;
            padding:0 43px;
            font-size:16px;
            color:$colorC;
            .item-info{
              span{
                margin:0 9px;
              }
            }
            .money{
              font-size:26px;
              color:$colorB;
            }
          }
          .order-content{
            padding:0 43px;
            .good-box{
              width:88%;
              .good-list{
                display: flex;
                align-items: center;
                height:145px;
                .good-img{
                  width:112px;
                  img{
                    width:100%;
                  }
                }
                .good-name{
                  font-size:20px;
                  color:$colorB;
                }
              }
            }
            .good-state{
              @include height(145px);
              font-size: 20px;
              color:$colorA;
              a{
                color:$colorA;
              }
            }
          }
        }
        .pagination{
          text-align:right;
        }
        .el-pagination.is-background .el-pager li:not(.disabled).active{
          background-color: #FF6600;
        }
        .el-button--primary{
          background-color: #FF6600;
          border-color: #FF6600;
        }
        .load-more,.scroll-more{
          text-align:center;
        }
      }
      .pagination{
        text-align: right;
      }
    }
  }
</style>