import './App.css';
import LongPolling from "./LongPolling";
import EventSourcing from "./EventSourceing";
import WebSock from "./WebSocket";

function App() {
    return (
        <div>
            {/*<LongPolling/>*/}
            {/*<EventSourcing/>*/}
            <WebSock/>
        </div>
    );
}

export default App;
