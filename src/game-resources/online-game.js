import Game from './game';
import OnlineGameHandler from '../online-game-handler/online-game-handler';
import * as mUtils from '../utilities/math-utilities';

function OnlineGame(rootSVGElement) {
    Game.call(this, rootSVGElement);
}

OnlineGame.prototype = Object.create(Game.prototype);

    // Method called by gameMechanics when the player finishes
    /*game.playerFinished = function() {
        console.log("finished");
    }*/

OnlineGame.prototype._handleGolfBallMouseUp = function() {
    window.removeEventListener('mousemove', this._handleGolfBallMouseMove);
    window.removeEventListener('mouseup', this._handleGolfBallMouseUp);
    window.removeEventListener('keydown', this._handleEscapePutt);
    this.directionLineElement.remove();
    this.directionLineElement = null;

    // If directionLineVector is null, then the mouse has not been moved
    if (!this.directionLineVector) return;

    this.computeGolfBallVelocity();
    this.golfBall.setNotUserClickable();
    this.directionLineVector = null;
    
    OnlineGameHandler.sendPuttMessage();
};

OnlineGame.prototype.setCurrentPlayer = function(currentPlayer) {
    this.currentPlayer = currentPlayer;
};

OnlineGame.prototype.getGolfBallVelocity = function() {
    const golfBallSpeed = this.golfBall.getSpeed();
    const golfBallDirection = this.golfBall.getDirection();
    return({golfBallSpeed, golfBallDirection});
};

OnlineGame.prototype.setFinalPosition = function(finalPosition) {
    this.finalPosition = mUtils.Vector(finalPosition);
}

OnlineGame.prototype.playerFinished = function() {
    this.golfBall.setPosition(this.finalPosition);
}

OnlineGame.prototype.golfBallStoppedMoving = function() {
    this.golfBall.setUserClickable();
    this.golfBall.setPosition(this.finalPosition);
}

export default OnlineGame;