import { webSocketConfig } from "../config";
import OnlineGame from "../game-resources/online-game";
import dialogBox from "../menu-system/dialog-box";
import MenuController from "../menu-system/menu-controller";
import Sidebar from "../sidebar/sidebar";
import rootSVGElement from '../svg-setup';
import handleExecutePutt from "./handle-execute-putt";
import handleGameCreationSuccessful from './handle-game-creation-successful';
import handleJoinRequestSuccessful from "./handle-join-request-successful";
import handleMessageReceived from "./handle-message-received";
import handlePlayerJoined from "./handle-player-joined";
import handlePlayerLeft from "./handle-player-left";
import handleGeneralError from "./handle-general-error";

const eventHandlers = {handleGameCreationSuccessful, handlePlayerJoined, 
    handlePlayerLeft, handleMessageReceived, handleJoinRequestSuccessful, 
    handleExecutePutt, handleGeneralError};

const OnlineGameHandler = (() => {
    let onlineGame;
    let webSocket;
    let gameId;
    let playerId;
    let playerName;
    
    function createGame() {
        onlineGame = new OnlineGame(rootSVGElement);
        return(onlineGame);
    }

    function getGame() {
        return(onlineGame);
    }

    function createWSClient() {
        const connectionString = `ws://${webSocketConfig.host}:${webSocketConfig.port}`;
        webSocket = new WebSocket(connectionString);
        webSocket.addEventListener('message', handleIncomingMessage);
        webSocket.addEventListener('error', handleConnectionError);
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

    function setPlayerName(_playerName) {
        playerName = _playerName;
    }

    function getPlayerName() {
        return(playerName);
    }

    function handleIncomingMessage(event) {
        console.log(JSON.parse(event.data));
        //return;
        const outerData = JSON.parse(event.data);
        let eventName = outerData.eventName;
        let data = outerData.data;
        
        eventName = eventName[0].toUpperCase() + eventName.slice(1);
        const handlerName = 'handle' + eventName;
        if (handlerName in eventHandlers) {
        eventHandlers[handlerName](data);
        } else {
            handleGeneralError(data);
        }
    }

    function sendMessage(message) {
        webSocket.send(message);
    }

    function handleConnectionError() {
        dialogBox('Could not connect to server. Please try again later', [{text: 'Ok'}]);
    }

    function showGame() {
        onlineGame.show();
        Sidebar.show();
        MenuController.hide();    
    }

    function hideGame() {
        onlineGame.hide();
        Sidebar.hide();
        MenuController.show();    
    }

    function sendPuttMessage() {
        const {golfBallSpeed, golfBallDirection} = onlineGame.getGolfBallVelocity();

        const message = {};
        message.eventName = 'executePutt';
        message.data = {playerId, gameId,
            golfBallSpeed, golfBallDirection}
        sendMessage(JSON.stringify(message));
    }

    function exit() {
        webSocket.close();
        webSocket = null;
        onlineGame = null;
        gameId = null;
        playerId = null;
        playerName = null;
    }

    return({createGame, getGame, createWSClient, sendMessage,
        setGameId, getGameId, setPlayerId, getPlayerId,
        setPlayerName, getPlayerName, sendPuttMessage,
        exit, showGame, hideGame})
})();

export default OnlineGameHandler;