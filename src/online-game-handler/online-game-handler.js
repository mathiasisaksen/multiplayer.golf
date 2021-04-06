import { webSocketConfig } from "../config";
import OnlineGame from "../game-resources/online-game";
import rootSVGElement from '../svg-setup';
import handleGameCreationSuccessful from './handle-game-creation-successful';
import handlePlayerJoined from "./handle-player-joined";
import handlePlayerLeft from "./handle-player-left";

const eventHandlers = {handleGameCreationSuccessful, handlePlayerJoined, handlePlayerLeft};

const  OnlineGameHandler = (() => {
    let onlineGame;
    let webSocket;
    let gameId;
    let playerId;
    
    function createGame() {
        onlineGame = OnlineGame(rootSVGElement);
        return(onlineGame);
    }

    function createWSClient() {
        const connectionString = `ws://${webSocketConfig.host}:${webSocketConfig.port}`;
        webSocket = new WebSocket(connectionString);
        onlineGame.setWSClient(webSocket);
        webSocket.addEventListener('message', handleIncomingMessage);
        return(webSocket);
    }

    function setGameId(_gameId) {
        gameId = _gameId;
    }

    function getGameId() {
        return(gameId);
    }

    function setPlayerId(_playerId) {
        playerId = _playerId;
    }

    function getPlayerId() {
        return(playerId);
    }

    function handleIncomingMessage(event) {
        console.log(JSON.parse(event.data));
        //return;
        const outerData = JSON.parse(event.data);
        let eventName = outerData.eventName;
        let data = outerData.data;
        
        eventName = eventName[0].toUpperCase() + eventName.slice(1);
        const handlerName = 'handle' + eventName;
        eventHandlers[handlerName](onlineGame, data);
    }

    function sendMessage(message) {
        webSocket.send(message);
    }

    return({createGame, createWSClient, sendMessage,
        setGameId, getGameId, setPlayerId, getPlayerId})
})();

export default OnlineGameHandler;