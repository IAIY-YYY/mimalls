/* 
    商品Vuex-actions
*/
export default {
    saveUserName(context,username){/* 保存用户信息名称 */
        context.commit('saveUserName',username);/* 触发mutation的方法 */
    },
    saveCartCount(context,count){/* 保存购物车信息 */
        context.commit('saveCartCount',count);/* 触发mutation的方法 */
    }
}