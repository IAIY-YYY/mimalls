<template>
    <div class="service">
        <div class="container">
            <ul class="">
                <li><span class="icon-setting"></span>预约维修服务</li>
                <li><span class="icon-7day"></span>7天无理由</li>
                <li><span class="icon-15day"></span>15天免费</li>
                <li><span class="icon-post"></span>满150元包邮</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name:'service-bar',
}
</script>

<style scoped lang="scss">
@import '../assets/scss/mixin.scss';
.service{
    padding:33px 0;/* 内边距 */
    color:#666666;
    font-size: 16px;
    li{
        display: inline-block;/* 行内块元素。不换行，但是可以设置宽高 */
        width: 24.9%;
        text-align: center;/* 文字居中 */
        border-right: 1px solid #e5e5e5;
        span{
            display: inline-block;
            width: 20px;
            height: 20px;
            vertical-align: middle;/*vertical-align:设置图片与文字的对齐方式。middle:把此元素放置在父元素的中部。 */
            margin-right: 8px;
        }
        .icon-setting{/* 设置图片的各种属性 */
            @include bgImg(20px,20px,'/imgs/icon-setting.png',contain)
        }
        .icon-7day{
            @include bgImg(20px,20px,'/imgs/icon-7day.png',contain)
        }
        .icon-15day{
            @include bgImg(20px,20px,'/imgs/icon-15day.png',contain)
        }
        .icon-post{
            @include bgImg(20px,20px,'/imgs/icon-post.png',contain)
        }
    }
}
</style>