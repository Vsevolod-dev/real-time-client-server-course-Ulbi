const events = require('events')
const express = require('express')
const cors = require('cors')
const PORT = 5000

const app = express()
const emitter = new events.EventEmitter()

app.use(cors())
app.use(express.json())

app.get('/get-messages', (req, res) => {
    emitter.once('newMessage', (message) => {
        res.json(message).end()
    })
})

app.post('/new-message', ((req, res) => {
    const message = req.body
    emitter.emit('newMessage', message)
    return res.status(200).end()
}))

app.listen(PORT, () => console.log('Server has started'))