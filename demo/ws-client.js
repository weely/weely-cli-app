(function WebSocketTest() {
    if ("WebSocket" in window) {
      console.log("您的浏览器支持 WebSocket!")
  
      // 打开一个 web socket
      var wss = new WebSocket("wss://weely.cc:3008")
  
      wss.onopen = function () {
        // Web Socket 已连接上，使用 send() 方法发送数据
        // 用户下单，推送给师傅
        // const msg = {
        //     type: 'toRevicer',
        //     data: {
        //         orderId: 'OD12345678901234',

        //     }
        // }

        // // 师傅确认接收订单，推送给用户
        // const msg2 = {
        //     type: 'toUser',
        //     data: {
        //         orderId: 'OD12345678901234'
        //     }
        // }

        // wss.send(JSON.stringify(msg))
        wss.send('Test')
        console.log("数据发送中...")
      }
  
      wss.onmessage = function (evt) {
        var received_msg = evt.data;
        console.log("数据已接收..." + evt.data)
      }
  
      wss.onclose = function () {
        // 关闭 websocket
        console.log("连接已关闭...")
      }
    } else {
      // 浏览器不支持 WebSocket
      console.log("您的浏览器不支持 WebSocket!")
    }
  })()