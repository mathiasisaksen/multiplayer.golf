import Game from './game';
import WebSocketClient from './websocket-client';

function OnlineGame(rootSVGElement) {
    const game = Game(rootSVGElement);
    
    game.playerFinished = function() {
        console.log("finished");
    }

    game.handleIncomingMessage = function(message) {
        console.log(message);
    }

    const wsClient = WebSocketClient(game);
    return(game);
}

export default OnlineGame;