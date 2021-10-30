<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
   
  },
  data () {
    return {
      res:{}
    }
  },
  mounted () {
    this.getUser();
    this.getCartCount();
  },
  methods: {
    getUser(){/* 获取用户信息 */
      /* 后台已经创建接口。
        登录信息已经保存在服务器中。
        可以直接利用接口获取用户信息了
      */
      this.axios.get('/user').then((res)=>{
        // to-do 保存在Vuex中
        console.log(res)
      })
    },
    getCartCount(){/* 获取购物车数量 */
      /* 
        和获取用户信息相同
      */
      this.axios.get('/carts/products/sum').then(()=>{
        // to-do 保存在Vuex中
      })
    }
  }
}
</script>

<style lang="scss">
@import "./assets/scss/config.scss";/* 变量要放在最前面 */
@import "./assets/scss/reset.scss";
@import "./assets/scss/button.scss";
</style>
