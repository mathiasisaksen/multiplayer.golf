import { webSocketConfig } from './config';

function WebSocketClient(onlineGame) {
    const connectionString = `ws://${webSocketConfig.host}:${webSocketConfig.port}`;
    const webSocket = new WebSocket(connectionString);

    webSocket.addEventListener('open', () => console.log("open"));
    webSocket.addEventListener('message', message => onlineGame.handleIncomingMessage(JSON.parse(message.data)));
    //setInterval(() => webSocket.send('test'), 1000);
}

export default WebSocketClient;