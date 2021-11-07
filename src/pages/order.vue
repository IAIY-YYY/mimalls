<template>
    <div>
        <router-view/>
        <service-bar></service-bar>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
// import OrderHeader from '../components/OrderHeader.vue'
import NavFooter from '../components/NavFooter.vue'
import ServiceBar from '../components/Service-bar.vue'

export default {
    name:'order',
    components: { 
        NavFooter,
        ServiceBar
    },
    data () {
        return {
            
        }
    },
}
</script>

<style scoped>

</style>