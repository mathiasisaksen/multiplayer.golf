import Game from './game';

function OnlineGame(rootSVGElement) {
    const game = Game(rootSVGElement);
    
    game.playerFinished = function() {
        console.log("finished");
    }

    return(game);
}

export default OnlineGame;