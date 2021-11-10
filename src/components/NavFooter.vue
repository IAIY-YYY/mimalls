<template>
    <div class="footer">
        <div class="footer-logo">
            <img v-lazy="'/imgs/logo-footer.png'" alt="">
            <p>小米商城</p>
        </div>
        <div class="footer-link">
            <a href="javascript:;" target="_blank">赵百通———</a><span>|</span>
            <a href="javascript:;" target="_blank">——————</a><span>|</span>
            <a href="javascript:;" target="_blank">——————</a><span>|</span>
            <a href="javascript:;" target="_blank">——————</a><span>|</span>
            <a href="javascript:;" target="_blank">————————————</a>
        </div>
        <div class="copyright">
            Copyright ©2020 
            <span class="domain">mi.futurefe.com</span>
             All Rights Reserved.
        </div>
    </div>
</template>

<script>
export default {
    name:'nav-footer'
}
</script>

<style lang="scss" scoped>
.footer{
    color: #999999;
    font-size: 16px;
    height: 234px;
    text-align: center;
    border-top:4px solid #ff6600;
    background-color: #333333;
    .footer-logo{
        margin-top: 46px;
        margin-bottom: 31px;
        img{
            width: 53px;
            height: 36px;
            margin-bottom: 13px;
        }
    }
    .footer-link{
        margin-bottom: 13px;
        a{
            color: #999999;
            display: inline-block;
        }
        span{
            margin: 0 10px;
        }
    }
    .copyright{
        .domain{
            color:#ff6600
        }
    }
}
</style>