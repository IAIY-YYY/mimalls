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
    // 第一种方式 MOck设置 —— 本地加载请求静态JSON文件的形式
    // this.axios.get('/mock/user/login.json').then(res=>{
    //   this.res = res
    // })

    // 通过easy-mock平台实现mock
    // 将baseURL换成easy-mock中提供的baseURL  然后更改get中的url即可
    // this.axios.get('/user/login').then(res=>{
    //   this.res = res
    // })

    // 本地集成mockjs 实现数据mock
    this.axios.get('/user/login').then(res=>{
      this.res = res;
    })
  }
}
</script>

<style>

</style>
