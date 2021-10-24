/* 
    定义mock文件
*/
import Mock from 'mockjs'

// 定义参数地址和返回值
Mock.mock('/api/user/login',{
    "status": 0,
    "data": {
      "id": 12,
      "username": "admin",
      "email": "admin@51purse.com",
      "phone": null,
      "role": 0,
      "createTime": 1479048325000,
      "updateTime": 1479048325000
    }
})