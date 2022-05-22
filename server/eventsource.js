const events = require('events')
const express = require('express')
const cors = require('cors')
const PORT = 5000

const app = express()
const emitter = new events.EventEmitter()

app.use(cors())
app.use(express.json())

app.get('/connect', (req, res) => {
    res.writeHead(200, {
        'Connection': 'keep-alive',
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache'
    })
    emitter.on('newMessage', message =>  {
        res.write(`data: ${JSON.stringify(message)}\n\n`)
    })
})

app.post('/new-message', ((req, res) => {
    const message = req.body
    emitter.emit('newMessage', message)
    return res.status(200).end()
}))

app.listen(PORT, () => console.log('Server has started'))