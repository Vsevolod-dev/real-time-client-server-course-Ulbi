import React, {useRef, useState} from 'react';

const WebSock = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');
    const socket = useRef()
    const [connected, setConnected] = useState(false);
    const [username, setUsername] = useState('');

    const connect = () => {
        socket.current = new WebSocket('ws://localhost:5000')

        socket.current.onopen = () => {
            setConnected(true)
            const message = {
                event: 'connection',
                username,
                id: Date.now()
            }
            socket.current.send(JSON.stringify(message))
        }

        socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data)
            setMessages(prev => [message, ...prev])
        }

        socket.current.onclose = () => {
            console.log('closed')
        }

        socket.current.onerror = (e) => {
            console.log(e)
            console.log('error')
        }
    }

    const sendMessage = async () => {
        const message = {
            event: 'message',
            message: value,
            username,
            id: Date.now()
        }
        socket.current.send(JSON.stringify(message))
        setValue('')
    }

    if (!connected) {
        return (
            <div className='center'>
                <div>
                    <div className="form">
                        <input
                            value={username}
                            type="text"
                            placeholder={"Enter your name"}
                            onChange={e => setUsername(e.target.value)}
                        />
                        <button onClick={connect}>Enter</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='center'>
            <div>
                <div className="form">
                    <input
                        value={value}
                        type="text"
                        onChange={e => setValue(e.target.value)}
                    />
                    <button onClick={sendMessage}>Send</button>
                </div>
                <div className="messages">
                    {messages.map((message) =>
                        <div key={message.id}>
                            {message.event === 'connection'
                                ? <div className={"connection_message"}>
                                    User {message.username} has connected
                                </div>
                                : <div className={"message"}>
                                    {message.username}. {message.message}
                                </div>
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WebSock;