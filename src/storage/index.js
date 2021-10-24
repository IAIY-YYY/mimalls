//封装sessionStorage
/* 
    Storage封装

    对浏览器中：应用程序-> 会话存储(sessionStorage) ->(key,value)  进行设置或存储
*/
const STORAGE_KEY = 'mall';
export default {
    //存储值
    setItem(key,value,module_name){
        if (module_name) {
            let val = this.getItem(module_name);
            val[key] = value;
            this.setItem(module_name,val)
        }else{
            // 首先获取sessionStorage中的值
            let val = this.getStorage();
            // 然后存储值
            val[key] = value;
            //重新写入到window.sessionStorage
            window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(val));
        }
    },
    //获取某一个模块下面的属性  例user下面的userName
    getItem(key,module_name){
        if (module_name) {
            let val = this.getItem(module_name);
            if(val) return val[key]
        }
        // 获取数据中key的值
        return this.getStorage()[key];

    },
    //获取整个数据
    getStorage(){
        return JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '{}');
    },
    // 清空某一个值
    clear(key,module_name){
        // 获取值
        let val = this.getStorage();
        if(module_name){//判断是否有模块名称
            if(!val[module_name]) return;
            delete val[module_name][key];
        }else{
            delete val[key]
        }
        window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(val));
    }
}