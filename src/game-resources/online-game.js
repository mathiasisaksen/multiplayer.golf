import Game from './game';
import OnlineGameHandler from '../online-game-handler/online-game-handler';
import * as mUtils from '../utilities/math-utilities';
import Sidebar from '../sidebar/sidebar';
import showAnnouncement from '../sidebar/show-announcement';

function OnlineGame(rootSVGElement) {
    Game.call(this, rootSVGElement);
}

OnlineGame.prototype = Object.create(Game.prototype);

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
    if (this.currentPlayer === OnlineGameHandler.getPlayerName()) {
        this.golfBall.setUserClickable();
    } else {
        this.golfBall.setNotUserClickable();
    }
};

OnlineGame.prototype.setCurrentCourseName = function(courseName) {
    this.currentCourseName = courseName;
}

OnlineGame.prototype.getCurrentCourseName = function() {
    return(this.currentCourseName);
}

OnlineGame.prototype.getGolfBallVelocity = function() {
    const golfBallSpeed = this.golfBall.getSpeed();
    const golfBallDirection = this.golfBall.getDirection();
    return({golfBallSpeed, golfBallDirection});
};

OnlineGame.prototype.setFinalPosition = function(finalPosition) {
    this.finalPosition = mUtils.Vector(finalPosition);
}

OnlineGame.prototype.storeNextPlayer = function(nextPlayerName) {
    this.hasNextPlayer = true;
    this.nextPlayer = nextPlayerName;
}

OnlineGame.prototype.storeNewCourseData = function(newCourseData, newCourseName) {
    this.newCourseName = newCourseName;
    this.hasNewCourse = true;
    this.newCourseData = newCourseData;
}

OnlineGame.prototype.setGameFinished = function() {
    this.isGameFinished = true;
}

OnlineGame.prototype.golfBallStoppedMoving = function() {
    this.golfBall.setPosition(this.finalPosition);
    
    if (this.isGameFinished) {
        this.golfBall.destroy();
        this.announceWinner();
    } else if (this.hasNewCourse) {
        showAnnouncement(`NEW HOLE, NEXT PLAYER: ${this.nextPlayer}!`, () => {
            this.switchToNewCourse();
            this.switchToNextPlayer();
            Sidebar.incrementCurrentCourse();
            this.checkGolfBallClickable();
        });
    } else if (this.hasNextPlayer) {
        showAnnouncement(`NEXT PLAYER: ${this.nextPlayer}!`, () => {
            this.switchToNextPlayer();
            this.golfBall.moveToInitialPosition();
            this.checkGolfBallClickable();
        });
    } else {
        this.checkGolfBallClickable();
    }   
}

OnlineGame.prototype.checkGolfBallClickable = function() {
    if (this.currentPlayer === OnlineGameHandler.getPlayerName()) {
        this.golfBall.setUserClickable();
    }
}

OnlineGame.prototype.switchToNextPlayer = function() {
    this.setCurrentPlayer(this.nextPlayer);
    this.hasNextPlayer = false;
    this.nextPlayer = null;
}

OnlineGame.prototype.switchToNewCourse = function() {
    this.setGameContent(this.newCourseData);
    this.currentCourseName = this.newCourseName;

    this.hasNewCourse = false;
    this.newCourseData = null;
    this.newCourseName = null;
}

OnlineGame.prototype.resetGolfBall = function() {
    this.golfBall.reset();
    // TODO: Temporary fix, so that gameMechanics moves golfball to start
    this.finalPosition = this.golfBall.getInitialPosition();
}

export default OnlineGame;