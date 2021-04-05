import { webSocketConfig } from "../config";
import OnlineGame from "../game-resources/online-game";
import rootSVGElement from '../svg-setup';
import handleGameCreationSuccessful from './handle-game-creation-successful';

const eventHandlers = {handleGameCreationSuccessful}

const  OnlineGameHandler = (() => {
    let onlineGame;
    
    function createGame() {
        onlineGame = OnlineGame(rootSVGElement);
        return(onlineGame);
    }

    function createWSClient() {
        const connectionString = `ws://${webSocketConfig.host}:${webSocketConfig.port}`;
        const webSocket = new WebSocket(connectionString);
        onlineGame.setWSClient(webSocket);
        webSocket.addEventListener('message', event => handleIncomingMessage);
        return(webSocket);
    }

    function handleIncomingMessage(event) {
        console.log(JSON.parse(event.data));
        return;
        const outerData = JSON.parse(event.data);
        let eventName = outerData.eventName;
        let data = outerData.data;
        
        eventName = eventName[0].toUpperCase() + eventName.slice(1);
        const handlerName = 'handle' + eventName;
        eventHandlers[handlerName](data);
    }

    return({createGame, createWSClient})
})();

export default OnlineGameHandler;