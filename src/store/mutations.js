/* 
    商品Vuex-mutations
*/
export default {
    saveUserName(state,username){/* 保存用户信息名称 */
        state.username = username;/* 存储变量到Vuex中保存 */
    },
    saveCartCount(state,count){/* 保存购物车信息 */
        state.cartCount = count;/* 存储变量到Vuex中保存 */
    }
}