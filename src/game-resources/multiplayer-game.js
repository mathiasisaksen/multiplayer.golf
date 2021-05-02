import ScoreBoard from "../sidebar/score-board";
import showAnnouncement from "../sidebar/show-announcement";
import Sidebar from "../sidebar/sidebar";
import Game from "./game";

function MultiplayerGame(rootSVGElement) {
    Game.call(this, rootSVGElement);
}

MultiplayerGame.prototype = Object.create(Game.prototype);

MultiplayerGame.prototype.setPlayerList = function(playerList) {
    this.playerList = playerList;
    this.currentPlayerNumber = 0;
}

MultiplayerGame.prototype.golfBallStoppedMoving = function() {
    if (this.isPlayerFinished) {
        this.goToNextPlayer();
    }
    this.golfBall.setUserClickable();
}

MultiplayerGame.prototype.goToNextPlayer = function() {
    this.currentPlayerNumber++;
    if (this.currentPlayerNumber === this.playerList.length) {
        this.currentPlayerNumber = 0;
        if (this.currentCourseNumber === this.numberOfCourses) {
            this.golfBall.destroy(); 
            this.announceWinner();
        } else {
            showAnnouncement(`New hole, next player: ${this.getCurrentPlayer()}`, 
            () => this.generateNewCourse());
        Sidebar.incrementCurrentCourse();
        }
    } else {
        showAnnouncement(`Next player: ${this.getCurrentPlayer()}`,
            () => this.golfBall.moveToInitialPosition());
    }
}

MultiplayerGame.prototype.getCurrentPlayer = function() {
    return(this.playerList[this.currentPlayerNumber]);
}

MultiplayerGame.prototype.executePutt = function() {
    ScoreBoard.incrementPlayerScore(this.currentCourseNumber, this.getCurrentPlayer());
    this.gameMechanics.executePutt();
}


export default MultiplayerGame;