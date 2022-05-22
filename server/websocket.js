const ws = require('ws')

const wss = new ws.Server({
    port: 5000
}, () => console.log('Server has started'))

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log(message)
        message = JSON.parse(message)
        switch (message.event) {
            case 'message':
                broadcastMessage(message)
                break
            case 'connection':
                broadcastMessage(message)
                break
        }
    })
})

const broadcastMessage = (message) => {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}