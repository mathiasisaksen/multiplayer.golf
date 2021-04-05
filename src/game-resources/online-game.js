import Game from './game';
import WebSocketClient from '../websocket/websocket-client';

function OnlineGame(rootSVGElement) {
    const game = Game(rootSVGElement);

    // Method called by gameMechanics when the player finishes
    /*game.playerFinished = function() {
        console.log("finished");
    }*/

    function handleIncomingMessage(message) {
        console.log(message);
        console.log(golfBall.getPosition());
    }

    function handleNewCourse(courseData) {
        const golfBall = game.getGolfBall();
        const course = game.getCourse();
    }

    function setWSClient(wsClient) {
        game.wsClient = wsClient;
    }

    function setPlayerId(playerId) {
        game.playerId = playerId;
    }

    function getPlayerId() {
        return(game.playerId);
    }

    function setGameId(gameId) {
        game.gameId = gameId;
    }

    function getGameId() {
        return(game.gameId);
    }

    Object.assign(game, {handleIncomingMessage, setWSClient, handleNewCourse,
        setPlayerId, getPlayerId, setGameId, getGameId });
    return(game);
}

export default OnlineGame;