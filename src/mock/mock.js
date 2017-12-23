import Mock from 'mockjs'
//最新消息
Mock.mock(/getNewsList/, {
    'list|5': [{
        'url': '@url',
        'title': '@ctitle(5, 20)',
        'string|1-5':'❤'
    }]
})
//登陆
Mock.mock(/login/, {
    "username":"admin",
     "userId": 123123
})
//总价
Mock.mock(/getPrice/, {
	'number|1-500': 100 
})

Mock.mock(/createOrder/, {
    'orderId|1-100':100
})
//订单列表页面数据
Mock.mock(/getOrderList/, {
    "total": 25,
    "list|25": [
      {
        "orderId": "@id",
        "product": "@ctitle(4)",
        "version": "@ctitle(3)",
        "period": "@integer(1,5)年",
        "buyNum": "@integer(1,8)",
        "date": "@date()",
        "amount": "@integer(100, 500)元"
      }
    ]
})

