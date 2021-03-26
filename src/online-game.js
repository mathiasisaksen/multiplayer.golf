import Game from './game';
import WebSocketClient from './websocket-client';

function OnlineGame(rootSVGElement) {
    const game = Game(rootSVGElement);
    let golfBall;
    let course;

    // Method called by gameMechanics when the player finishes
    game.playerFinished = function() {
        console.log("finished");
    }

    game.handleIncomingMessage = function(message) {
        console.log(message);
        console.log(golfBall.getPosition());
    }

    game.handleNewCourse = function(courseData) {
        const golfBall = game.getGolfBall();
        const course = game.getCourse();
    }

    const wsClient = WebSocketClient(game);
    return(game);
}

export default OnlineGame;