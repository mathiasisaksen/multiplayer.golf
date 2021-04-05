import Game from './game';
import WebSocketClient from '../websocket/websocket-client';

function OnlineGame(rootSVGElement) {
    const game = Game(rootSVGElement);
    let wsClient;

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

    }

    Object.assign(game, {handleIncomingMessage, setWSClient, handleNewCourse });
    return(game);
}

export default OnlineGame;