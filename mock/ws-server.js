const WebSocket = require('ws')

const ws = new WebSocket.Server({port: 30001}, () => {
    console.log("socket start")
})

let clients = []

ws.on('connection', (client) => {
    console.log("client:", client)
    clients.push(client)
    client.send("欢迎光临")

    client.on('message',(msg)=>{
        const params = msg.toString()
        console.log("来自服务器的数据", params)
        const response = {
            id: Math.ceil(Math.random() * 1000),
            time: new Date().getTime(),
        }
        try{
            const { id } = JSON.parse(params)
            console.log(id)
            response.data = {
                id: id,
                number: 100
            } 
        } catch(err) {
            response.data = '客户端发送信息：' + msg.toString()
        }

        client.send(JSON.stringify(response)) // 通过send方法来给前端发送消息
    })
    client.on('close', ()=>{
        console.log("关闭服务器连接")
    })
})
