<template>
    <transition name="slide">
        <div class="modal" v-show="showModal"><!-- showModal弹窗是否出现 -->
            <div class="mask"><!-- 整个页面框架 -->

            </div>
            <div class="modal-dialog"><!-- 对话框 -->
                <div class="modal-header"><!-- 头部 -->
                    <span>{{title}}</span>
                    <a href="javascript:;" class="icon-close" @click="$emit('cancel')"></a><!-- 关闭按钮 -->
                </div>
                <div class="modal-body"><!-- 内容  定义插槽 输入不同的内容-->
                    <slot name="body"></slot>
                </div>
                <div class="modal-footer"><!-- 底部 -->
                    <a href="javascript:;" class="btn" v-if="btnType==1" @click="$emit('submit')">{{sureText}}</a>
                    <a href="javascript:;" class="btn" v-if="btnType==2" @click="$emit('cancel')">{{cancelText}}</a>
                    <div class="btn-group" v-if="btnType==3">
                        <a href="javascript:;" class="btn" @click="$emit('submit')">{{sureText}}</a><!-- 提交或取消按钮 -->
                        <a href="javascript:;" class="btn btn-default" @click="$emit('cancel')">{{cancelText}}</a><!-- 提交或取消按钮 -->
                    </div>
                </div>
            </div>
        </div>
    </transition>
    
</template>

<script>
export default {
    name:'modal',
    props: {
        modalType:{/* 自定义属性。弹窗类型：小small、中middle、大large 表单form*/
            type:String,
            default:'form'
        },
        title:String,/* 弹框标题 */
        btnType:String,/* 按钮类型：1:确定按钮 2:取消按钮 3:确定取消 */
        sureText:{/* 按钮的文本 */
            type:String,
            default:'确定'
        },
        cancelText:{/* 按钮的文本 */
            type:String,
            default:'取消'
        },
        showModal:Boolean,/* 判断弹窗是否显示 */
    },
}
</script>

<style lang="scss">
@import "../assets/scss/mixin.scss";/* 要放在最前面。否则出错 */
@import "../assets/scss/config.scss";
@import "../assets/scss/modal.scss";/* 可以引用上述变量的值 */
</style>